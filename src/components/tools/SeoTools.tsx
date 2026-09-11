import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  FileText, 
  Hash, 
  Eye, 
  Code, 
  ExternalLink 
} from 'lucide-react';
import { ToolItem } from '../../types';

interface SeoToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const SeoTools: React.FC<SeoToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // UTM Builder states
  const [utmUrl, setUtmUrl] = useState<string>('https://toolstack.dev');
  const [utmSource, setUtmSource] = useState<string>('twitter');
  const [utmMedium, setUtmMedium] = useState<string>('social');
  const [utmCampaign, setUtmCampaign] = useState<string>('launch_2026');
  const [utmTerm, setUtmTerm] = useState<string>('free_online_tools');
  const [utmContent, setUtmContent] = useState<string>('banner_cta');

  // Meta Tag Generator states
  const [metaTitle, setMetaTitle] = useState<string>('ToolStack — 50+ Free Production Online Tools');
  const [metaDesc, setMetaDesc] = useState<string>(
    'Fast, secure, and privacy-first web utilities for PDF conversion, image compression, developer workflows, and finance calculators.'
  );
  const [metaAuthor, setMetaAuthor] = useState<string>('ToolStack Team');
  const [metaImage, setMetaImage] = useState<string>('https://toolstack.dev/og-image.png');

  // Robots.txt Generator states
  const [robotsDisallow, setRobotsDisallow] = useState<string>('/admin/\n/api/\n/private/');
  const [robotsSitemap, setRobotsSitemap] = useState<string>('https://toolstack.dev/sitemap.xml');
  const [blockAiBots, setBlockAiBots] = useState<boolean>(false);

  // XML Sitemap states
  const [sitemapBaseUrl, setSitemapBaseUrl] = useState<string>('https://toolstack.dev');
  const [sitemapPages, setSitemapPages] = useState<string>(
    '/\n/tools/pdf-merge\n/tools/image-compressor\n/tools/json-formatter\n/calculators/emi-calculator'
  );

  // Hashtag Generator states
  const [hashtagTopic, setHashtagTopic] = useState<string>('web development');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. UTM BUILDER ---
  const finalUtmUrl = useMemo(() => {
    if (!utmUrl) return '';
    try {
      const url = new URL(utmUrl.startsWith('http') ? utmUrl : `https://${utmUrl}`);
      if (utmSource) url.searchParams.set('utm_source', utmSource);
      if (utmMedium) url.searchParams.set('utm_medium', utmMedium);
      if (utmCampaign) url.searchParams.set('utm_campaign', utmCampaign);
      if (utmTerm) url.searchParams.set('utm_term', utmTerm);
      if (utmContent) url.searchParams.set('utm_content', utmContent);
      return url.toString();
    } catch (e) {
      return `${utmUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
    }
  }, [utmUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]);

  // --- 2. META TAG GENERATOR ---
  const metaHtmlSnippet = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}">
<meta name="description" content="${metaDesc}">
<meta name="author" content="${metaAuthor}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:image" content="${metaImage}">

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${metaTitle}">
<meta property="twitter:description" content="${metaDesc}">
<meta property="twitter:image" content="${metaImage}">`;
  }, [metaTitle, metaDesc, metaAuthor, metaImage]);

  // --- 3. ROBOTS.TXT GENERATOR ---
  const robotsTxtContent = useMemo(() => {
    let out = `User-agent: *\n`;
    const paths = robotsDisallow.split('\n').filter(Boolean);
    paths.forEach(p => {
      out += `Disallow: ${p.trim()}\n`;
    });
    out += `Allow: /\n\n`;

    if (blockAiBots) {
      out += `User-agent: GPTBot\nDisallow: /\n\n`;
      out += `User-agent: CCBot\nDisallow: /\n\n`;
    }

    if (robotsSitemap) {
      out += `Sitemap: ${robotsSitemap}\n`;
    }
    return out;
  }, [robotsDisallow, robotsSitemap, blockAiBots]);

  // --- 4. SITEMAP XML GENERATOR ---
  const sitemapXml = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const pages = sitemapPages.split('\n').filter(Boolean);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach(p => {
      const cleanPath = p.trim().startsWith('/') ? p.trim() : `/${p.trim()}`;
      const url = `${sitemapBaseUrl.replace(/\/$/, '')}${cleanPath}`;
      const priority = cleanPath === '/' ? '1.0' : '0.8';
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }, [sitemapBaseUrl, sitemapPages]);

  // --- 5. HASHTAG GENERATOR ---
  const generatedHashtags = useMemo(() => {
    const clean = hashtagTopic.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!clean) return [];

    return [
      `#${clean}`,
      `#${clean}tips`,
      `#${clean}tools`,
      `#${clean}life`,
      `#${clean}community`,
      `#${clean}daily`,
      `#${clean}hacks`,
      `#${clean}trends`,
      `#tech`,
      `#productivity`,
      `#software`,
      `#developer`
    ];
  }, [hashtagTopic]);

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    onSuccess(`Downloaded ${filename}.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. UTM BUILDER */}
      {tool.id === 'utm-builder' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Destination Website URL *
            </label>
            <input
              type="text"
              value={utmUrl}
              onChange={(e) => setUtmUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Campaign Source * (utm_source)
              </label>
              <input
                type="text"
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="google, newsletter, twitter"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Campaign Medium (utm_medium)
              </label>
              <input
                type="text"
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder="cpc, banner, email, social"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Campaign Name (utm_campaign)
              </label>
              <input
                type="text"
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="spring_sale, product_launch"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Campaign Content (utm_content)
              </label>
              <input
                type="text"
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="logolink, textlink"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Tracked Campaign URL</span>
              <button
                onClick={() => {
                  copyToClipboard(finalUtmUrl);
                  onSuccess('Copied UTM tracking URL.');
                }}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy URL
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              {finalUtmUrl}
            </div>
          </div>
        </div>
      )}

      {/* 2. META TAG GENERATOR */}
      {tool.id === 'meta-tag-generator' && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              <span>Page Title</span>
              <span className={metaTitle.length > 60 ? 'text-amber-500 font-bold' : 'text-slate-400'}>
                {metaTitle.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              <span>Meta Description</span>
              <span className={metaDesc.length > 160 ? 'text-amber-500 font-bold' : 'text-slate-400'}>
                {metaDesc.length} / 160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Author / Site Name
              </label>
              <input
                type="text"
                value={metaAuthor}
                onChange={(e) => setMetaAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                OG Banner Image URL
              </label>
              <input
                type="text"
                value={metaImage}
                onChange={(e) => setMetaImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
              <span>Generated HTML Head Tags</span>
              <button
                onClick={() => {
                  copyToClipboard(metaHtmlSnippet);
                  onSuccess('Copied meta tags.');
                }}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy HTML
              </button>
            </div>
            <pre className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
              {metaHtmlSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* 3. ROBOTS.TXT GENERATOR */}
      {tool.id === 'robots-generator' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Disallowed URL Paths (one per line)
            </label>
            <textarea
              rows={3}
              value={robotsDisallow}
              onChange={(e) => setRobotsDisallow(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Sitemap Location URL
            </label>
            <input
              type="text"
              value={robotsSitemap}
              onChange={(e) => setRobotsSitemap(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={blockAiBots}
              onChange={(e) => setBlockAiBots(e.target.checked)}
              className="text-indigo-600 rounded"
            />
            Block AI Crawlers (GPTBot, CCBot)
          </label>

          <div className="p-4 bg-slate-900 rounded-xl text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Preview: robots.txt</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(robotsTxtContent)}
                  className="hover:text-white flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy
                </button>
                <button
                  onClick={() => downloadTextFile('robots.txt', robotsTxtContent)}
                  className="hover:text-white flex items-center gap-1 text-xs"
                >
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
            <pre className="font-mono text-xs text-emerald-400">{robotsTxtContent}</pre>
          </div>
        </div>
      )}

      {/* 4. SITEMAP GENERATOR */}
      {tool.id === 'sitemap-generator' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Domain Base URL
            </label>
            <input
              type="text"
              value={sitemapBaseUrl}
              onChange={(e) => setSitemapBaseUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Page Routes (one per line)
            </label>
            <textarea
              rows={5}
              value={sitemapPages}
              onChange={(e) => setSitemapPages(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300"
            />
          </div>

          <div className="p-4 bg-slate-900 rounded-xl text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Preview: sitemap.xml</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(sitemapXml)}
                  className="hover:text-white flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy
                </button>
                <button
                  onClick={() => downloadTextFile('sitemap.xml', sitemapXml)}
                  className="hover:text-white flex items-center gap-1 text-xs"
                >
                  <Download className="w-3 h-3" /> Download XML
                </button>
              </div>
            </div>
            <pre className="font-mono text-xs text-emerald-400 max-h-48 overflow-y-auto">{sitemapXml}</pre>
          </div>
        </div>
      )}

      {/* 5. OPEN GRAPH PREVIEW */}
      {tool.id === 'og-preview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Image URL</label>
              <input
                type="text"
                value={metaImage}
                onChange={(e) => setMetaImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          {/* Social Preview Simulation Card */}
          <div className="max-w-md mx-auto border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-800">
            <div className="h-44 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={metaImage}
                alt="Social preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback visual
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xs text-slate-400 font-mono">OG Image Preview (1200x630)</span>
            </div>
            <div className="p-4 space-y-1.5 border-t border-slate-100 dark:border-slate-700">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">toolstack.dev</span>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">{metaTitle}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{metaDesc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. HASHTAG GENERATOR */}
      {tool.id === 'hashtag-generator' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Enter Niche or Keyword
            </label>
            <input
              type="text"
              value={hashtagTopic}
              onChange={(e) => setHashtagTopic(e.target.value)}
              placeholder="e.g. artificial intelligence, fitness, photography"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Optimized Hashtag Batch ({generatedHashtags.length})
              </span>
              <button
                onClick={() => {
                  copyToClipboard(generatedHashtags.join(' '));
                  onSuccess('Copied hashtag set.');
                }}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy All
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {generatedHashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => copyToClipboard(tag)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
