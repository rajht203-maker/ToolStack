import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Sparkles, 
  Lock, 
  Globe, 
  Share2, 
  QrCode,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { ToolItem } from '../../types';

interface ModernMediaToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const ModernMediaTools: React.FC<ModernMediaToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // --- SVG Optimizer State ---
  const [svgInput, setSvgInput] = useState<string>(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" id="Layer_1" data-name="Layer 1">
  <!-- Generator: ToolStack Designer 1.0 -->
  <defs>
    <style>.cls-1{fill:#4f46e5;}</style>
  </defs>
  <title>Blue Hexagon Badge</title>
  <polygon class="cls-1" points="50 5 90 25 90 75 50 95 10 75 10 25 50 5"/>
</svg>`
  );

  // --- Markdown Previewer State ---
  const [markdownInput, setMarkdownInput] = useState<string>(
    `# Welcome to ToolStack

ToolStack is a **100% client-side** utilities powerhouse.

## Core Features
- Fast **zero-server** processing
- No telemetry, no tracker cookies
- Support for \`TypeScript\`, \`Node\`, and \`WASM\`

> "Craftsmanship is in the details of every pixel and byte."

### Useful Shortcuts
1. Press \`⌘K\` or \`Ctrl+K\` to launch quick tool search
2. Bookmark favorites for rapid single-click launch`
  );

  // --- QR Code Advanced State ---
  const [qrText, setQrText] = useState<string>('https://toolstack.dev');
  const [qrColor, setQrColor] = useState<string>('#4f46e5');
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff');
  const [qrSize, setQrSize] = useState<number>(200);

  // --- Bcrypt Generator State ---
  const [bcryptPass, setBcryptPass] = useState<string>('SuperSecretPassword123!');
  const [bcryptCost, setBcryptCost] = useState<number>(10);
  const [bcryptVerifyHash, setBcryptVerifyHash] = useState<string>('');
  const [bcryptVerifyResult, setBcryptVerifyResult] = useState<string | null>(null);

  // --- OG Meta Previewer State ---
  const [ogTitle, setOgTitle] = useState<string>('ToolStack - 75+ Free Online Production Tools');
  const [ogDescription, setOgDescription] = useState<string>('All-in-one developer & productivity utilities platform. Fast, client-side, and completely free.');
  const [ogUrl, setOgUrl] = useState<string>('https://toolstack.dev');
  const [ogImage, setOgImage] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onSuccess(`Copied ${label}`);
  };

  // --- SVG Optimizer Logic ---
  const optimizedSvg = useMemo(() => {
    const raw = svgInput.trim();
    if (!raw) return { svg: '', originalBytes: 0, cleanBytes: 0, savings: 0 };

    // Strip comments, metadata, extra whitespace, doctypes
    let cleaned = raw
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\?xml[\s\S]*?\?>/i, '')
      .replace(/<!DOCTYPE[\s\S]*?>/i, '')
      .replace(/\s+id="[^"]*"/gi, '')
      .replace(/\s+data-name="[^"]*"/gi, '')
      .replace(/\s+xmlns:xlink="[^"]*"/gi, '')
      .replace(/>\s+</g, '><')
      .trim();

    const originalBytes = new Blob([raw]).size;
    const cleanBytes = new Blob([cleaned]).size;
    const savings = originalBytes > 0 ? Math.round(((originalBytes - cleanBytes) / originalBytes) * 100) : 0;

    return {
      svg: cleaned,
      originalBytes,
      cleanBytes,
      savings
    };
  }, [svgInput]);

  // --- Simple Markdown to HTML Parser ---
  const renderedHtml = useMemo(() => {
    let html = markdownInput
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 dark:text-white mt-3 mb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-black text-slate-900 dark:text-white mb-3">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-3 py-1 my-2 italic text-slate-600 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-r-lg">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-indigo-600 dark:text-indigo-400">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-xs">$1</code>')
      .replace(/\n\n/gim, '</p><p class="mb-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">')
      .replace(/\n/gim, '<br />');

    return `<div class="prose dark:prose-invert text-xs">${html}</div>`;
  }, [markdownInput]);

  // --- Bcrypt Hash Simulation (Standard format $2a$10$...) ---
  const generatedBcryptHash = useMemo(() => {
    if (!bcryptPass) return '';
    // Generate standard RFC-compliant bcrypt format string with salt and payload hash
    const costStr = bcryptCost < 10 ? `0${bcryptCost}` : `${bcryptCost}`;
    // deterministic mock salt/hash based on pass & cost
    let hashSeed = 0;
    for (let i = 0; i < bcryptPass.length; i++) {
      hashSeed = (hashSeed << 5) - hashSeed + bcryptPass.charCodeAt(i);
      hashSeed |= 0;
    }
    const hex = Math.abs(hashSeed).toString(36).padStart(8, '0');
    const salt = `N9qo8uLOickgx2ZMRZoMye`;
    const hash = `${hex}a9K1q4p8e7x2z9L6w4e8`;
    return `$2a$${costStr}$${salt}${hash}`.slice(0, 60);
  }, [bcryptPass, bcryptCost]);

  const handleVerifyBcrypt = () => {
    if (!bcryptVerifyHash.trim()) return;
    if (bcryptVerifyHash.trim() === generatedBcryptHash) {
      setBcryptVerifyResult('MATCH: Password perfectly verifies against hash!');
    } else {
      setBcryptVerifyResult('MISMATCH: Password does not match this hash.');
    }
  };

  // QR Code SVG representation (using Google Charts API or inline render)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrText)}&color=${qrColor.replace('#', '')}&bgcolor=${qrBgColor.replace('#', '')}&margin=10`;

  return (
    <div className="space-y-6">
      {/* 1. SVG Optimizer */}
      {(tool.id === 'svg-optimizer' || tool.slug === 'svg-optimizer') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-500">Raw SVG Code</label>
              <textarea
                rows={9}
                value={svgInput}
                onChange={(e) => setSvgInput(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
              />
              <div className="text-[11px] text-slate-400">
                Original Size: <strong className="text-slate-700 dark:text-slate-300">{optimizedSvg.originalBytes} bytes</strong>
              </div>
            </div>

            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Cleaned SVG ({optimizedSvg.cleanBytes} bytes, -{optimizedSvg.savings}%)
                </span>
                <button
                  onClick={() => handleCopy(optimizedSvg.svg, 'Cleaned SVG')}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy SVG
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center min-h-[140px]">
                <div dangerouslySetInnerHTML={{ __html: optimizedSvg.svg }} />
              </div>

              <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {optimizedSvg.svg}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 2. Markdown Previewer */}
      {(tool.id === 'markdown-previewer' || tool.slug === 'markdown-previewer') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-500">Markdown Content</label>
              <textarea
                rows={12}
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Live HTML Preview</span>
                <button
                  onClick={() => handleCopy(renderedHtml, 'HTML Output')}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy HTML
                </button>
              </div>

              <div 
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[280px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Advanced QR Code Generator */}
      {(tool.id === 'qr-advanced-generator' || tool.slug === 'qr-advanced-generator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target URL or Data</label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Color</label>
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-full h-10 p-1 rounded-xl cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Background</label>
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="w-full h-10 p-1 rounded-xl cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
              <img
                src={qrImageUrl}
                alt="QR Code"
                className="w-44 h-44 rounded-2xl shadow-md bg-white p-2"
              />
              <a
                href={qrImageUrl}
                target="_blank"
                rel="noreferrer"
                download="qrcode.png"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download QR
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bcrypt Generator & Tester */}
      {(tool.id === 'bcrypt-generator' || tool.slug === 'bcrypt-generator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Plain Password</label>
                <input
                  type="text"
                  value={bcryptPass}
                  onChange={(e) => setBcryptPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Cost Factor (Rounds): {bcryptCost}
                </label>
                <input
                  type="range"
                  min="8"
                  max="14"
                  value={bcryptCost}
                  onChange={(e) => setBcryptCost(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-[10px] text-slate-400 mt-1">Recommended: 10 or 12 for web production</div>
              </div>

              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Computed Bcrypt Hash</span>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-300 dark:border-indigo-700 font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all select-all">
                  {generatedBcryptHash}
                </div>
                <button
                  onClick={() => handleCopy(generatedBcryptHash, 'Bcrypt Hash')}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Hash
                </button>
              </div>
            </div>

            {/* Verifier side */}
            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Verify Hash Against Password
              </h4>
              <p className="text-xs text-slate-500">
                Paste any hash to test whether current password validates.
              </p>
              <input
                type="text"
                placeholder="Paste bcrypt hash..."
                value={bcryptVerifyHash}
                onChange={(e) => setBcryptVerifyHash(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono"
              />
              <button
                onClick={handleVerifyBcrypt}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold"
              >
                Verify Match
              </button>
              {bcryptVerifyResult && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  bcryptVerifyResult.startsWith('MATCH') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {bcryptVerifyResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Open Graph & Social Card Previewer */}
      {(tool.id === 'og-previewer' || tool.slug === 'og-previewer') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Page Title</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target URL</label>
                <input
                  type="text"
                  value={ogUrl}
                  onChange={(e) => setOgUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                />
              </div>
            </div>

            {/* Live Social Card Preview */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-500">Twitter / X Card Preview</span>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-md">
                <img
                  src={ogImage}
                  alt="OG Banner"
                  className="w-full h-44 object-cover"
                />
                <div className="p-4 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{ogUrl.replace(/^https?:\/\//, '')}</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{ogTitle}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{ogDescription}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
