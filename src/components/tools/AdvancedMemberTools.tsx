import React, { useState, useEffect, useMemo } from 'react';
import { ToolItem } from '../../types';
import { 
  Copy, 
  Check, 
  Play, 
  ShieldCheck, 
  Key, 
  Terminal, 
  FileCode, 
  Printer, 
  Download, 
  Share2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Lock, 
  Sparkles, 
  Search, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Code
} from 'lucide-react';

interface AdvancedMemberToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const AdvancedMemberTools: React.FC<AdvancedMemberToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ----------------------------------------------------
  // 1. Webhook Tester & HMAC Simulator
  // ----------------------------------------------------
  const [whSecret, setWhSecret] = useState('whsec_test_secret_9988776655');
  const [whPayload, setWhPayload] = useState('{\n  "event": "payment_intent.succeeded",\n  "data": {\n    "id": "pi_3MtwBwLkdIwHu7ix28q3t8A4",\n    "amount": 4900,\n    "currency": "usd"\n  }\n}');
  const [whSignature, setWhSignature] = useState('');

  const generateHmac = async (secret: string, body: string) => {
    try {
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
      const hashArray = Array.from(new Uint8Array(sig));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return 'Signature error';
    }
  };

  useEffect(() => {
    generateHmac(whSecret, whPayload).then(setWhSignature);
  }, [whSecret, whPayload]);

  // ----------------------------------------------------
  // 2. Regex Syntax Debugger
  // ----------------------------------------------------
  const [regPattern, setRegPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
  const [regFlags, setRegFlags] = useState('g');
  const [regTestStr, setRegTestStr] = useState('Contact support@toolstack.io or dev-team@company.org for assistance.');

  const regMatches = useMemo(() => {
    try {
      const re = new RegExp(regPattern, regFlags);
      const matches = Array.from(regTestStr.matchAll(re));
      return {
        valid: true,
        matches: matches.map(m => m[0]),
        count: matches.length
      };
    } catch (e: any) {
      return { valid: false, error: e.message, matches: [], count: 0 };
    }
  }, [regPattern, regFlags, regTestStr]);

  // ----------------------------------------------------
  // 3. JWT Token Signer & Encoder
  // ----------------------------------------------------
  const [jwtHeader, setJwtHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [jwtPayload, setJwtPayload] = useState('{\n  "sub": "user_2026_pro",\n  "name": "Dev Member",\n  "role": "admin",\n  "exp": 1799000000\n}');
  const [jwtSecret, setJwtSecret] = useState('super-secure-jwt-signing-secret');

  const generatedJwt = useMemo(() => {
    try {
      const b64 = (str: string) => btoa(unescape(encodeURIComponent(str))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      const h = b64(jwtHeader.trim());
      const p = b64(jwtPayload.trim());
      const unsigned = `${h}.${p}`;
      // Simulated HMAC signature representation
      const sig = b64(`${unsigned}.${jwtSecret}`).slice(0, 43);
      return `${unsigned}.${sig}`;
    } catch (e) {
      return 'Invalid JSON payload structure';
    }
  }, [jwtHeader, jwtPayload, jwtSecret]);

  // ----------------------------------------------------
  // 4. Git Command Builder
  // ----------------------------------------------------
  const [gitAction, setGitAction] = useState('rebase-interactive');
  const [gitBranch, setGitBranch] = useState('feature/member-suite');
  const [gitCommitCount, setGitCommitCount] = useState(3);
  const [gitMessage, setGitMessage] = useState('feat: complete modern utilities');

  const gitSnippet = useMemo(() => {
    switch (gitAction) {
      case 'rebase-interactive':
        return `git fetch origin\ngit rebase -i HEAD~${gitCommitCount}`;
      case 'cherry-pick':
        return `git checkout main\ngit cherry-pick <commit-hash>\ngit push origin main`;
      case 'undo-commit':
        return `git reset --soft HEAD~1\n# Changes preserved in staging area`;
      case 'branch-cleanup':
        return `git checkout main\ngit pull\ngit branch --merged | grep -v "main" | xargs -n 1 git branch -d`;
      case 'stash-staged':
        return `git stash push -m "${gitMessage}" --keep-index`;
      default:
        return `git status`;
    }
  }, [gitAction, gitBranch, gitCommitCount, gitMessage]);

  // ----------------------------------------------------
  // 5. User-Agent Device Auditor
  // ----------------------------------------------------
  const [uaString, setUaString] = useState(typeof navigator !== 'undefined' ? navigator.userAgent : '');

  const uaAnalysis = useMemo(() => {
    const ua = uaString.toLowerCase();
    let browser = 'Unknown Browser';
    if (ua.includes('edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('chrome/')) browser = 'Google Chrome';
    else if (ua.includes('firefox/')) browser = 'Mozilla Firefox';
    else if (ua.includes('safari/')) browser = 'Apple Safari';

    let os = 'Unknown OS';
    if (ua.includes('macintosh') || ua.includes('mac os')) os = 'macOS';
    else if (ua.includes('windows nt 10')) os = 'Windows 10/11';
    else if (ua.includes('linux')) os = 'Linux';
    else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
    else if (ua.includes('android')) os = 'Android';

    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    const engine = ua.includes('webkit') ? 'WebKit / Blink' : ua.includes('gecko') ? 'Gecko' : 'Other';

    return { browser, os, isMobile, engine };
  }, [uaString]);

  // ----------------------------------------------------
  // 6. Content Security Policy (CSP) Builder
  // ----------------------------------------------------
  const [cspScriptSrc, setCspScriptSrc] = useState("'self' https://trustedscripts.com");
  const [cspStyleSrc, setCspStyleSrc] = useState("'self' 'unsafe-inline'");
  const [cspImgSrc, setCspImgSrc] = useState("'self' data: https:");
  const [cspConnectSrc, setCspConnectSrc] = useState("'self' https://api.toolstack.io");
  const [cspFrameAncestors, setCspFrameAncestors] = useState("'none'");

  const generatedCsp = useMemo(() => {
    return `default-src 'self'; script-src ${cspScriptSrc}; style-src ${cspStyleSrc}; img-src ${cspImgSrc}; connect-src ${cspConnectSrc}; frame-ancestors ${cspFrameAncestors}; object-src 'none'; base-uri 'self';`;
  }, [cspScriptSrc, cspStyleSrc, cspImgSrc, cspConnectSrc, cspFrameAncestors]);

  // ----------------------------------------------------
  // 7. SQL to TypeScript Interface Converter
  // ----------------------------------------------------
  const [sqlCreateInput, setSqlCreateInput] = useState(`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(150),
  is_verified BOOLEAN DEFAULT false,
  credits INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);

  const tsInterfaceOutput = useMemo(() => {
    try {
      const lines = sqlCreateInput.split('\n');
      const fields: string[] = [];
      let interfaceName = 'User';

      lines.forEach(line => {
        const tableMatch = line.match(/CREATE\s+TABLE\s+([a-zA-Z0-9_]+)/i);
        if (tableMatch) {
          interfaceName = tableMatch[1].charAt(0).toUpperCase() + tableMatch[1].slice(1).replace(/s$/, '');
        }

        const colMatch = line.trim().match(/^([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)/);
        if (colMatch && !['create', 'constraint', 'primary', ')'].includes(colMatch[1].toLowerCase())) {
          const colName = colMatch[1];
          const colType = colMatch[2].toLowerCase();
          let tsType = 'string';
          if (['integer', 'int', 'bigint', 'smallint', 'numeric', 'decimal', 'float', 'real'].includes(colType)) tsType = 'number';
          else if (['boolean', 'bool'].includes(colType)) tsType = 'boolean';
          else if (['timestamp', 'timestamptz', 'date'].includes(colType)) tsType = 'Date | string';
          else if (['json', 'jsonb'].includes(colType)) tsType = 'Record<string, unknown>';

          const isOptional = !line.toUpperCase().includes('NOT NULL') && !line.toUpperCase().includes('PRIMARY KEY');
          fields.push(`  ${colName}${isOptional ? '?' : ''}: ${tsType};`);
        }
      });

      return `export interface ${interfaceName} {\n${fields.join('\n')}\n}`;
    } catch (e) {
      return '// Failed to parse table definition';
    }
  }, [sqlCreateInput]);

  // ----------------------------------------------------
  // 8. Multi-Stage Dockerfile Builder
  // ----------------------------------------------------
  const [dfStack, setDfStack] = useState('node');
  const [dfNodeVersion, setDfNodeVersion] = useState('20-alpine');
  const [dfPort, setDfPort] = useState(3000);

  const generatedDockerfile = useMemo(() => {
    if (dfStack === 'node') {
      return `# Build Stage
FROM node:${dfNodeVersion} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Runner
FROM node:${dfNodeVersion} AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER nodejs
EXPOSE ${dfPort}
CMD ["node", "dist/server.js"]`;
    }
    return `# Generic Slim Container\nFROM alpine:3.19\nEXPOSE ${dfPort}\nCMD ["sh"]`;
  }, [dfStack, dfNodeVersion, dfPort]);

  // ----------------------------------------------------
  // 9. .env File Syntax & Leak Auditor
  // ----------------------------------------------------
  const [envText, setEnvText] = useState(`DATABASE_URL="postgresql://user:secret@localhost:5432/mydb"
API_KEY=sk_live_9999888877776666
PORT=3000
INVALID LINE WITHOUT EQUALS
DUPLICATE_KEY=first_value
DUPLICATE_KEY=second_value
# Comment line
UNQUOTED_SPACE=this has spaces without quotes`);

  const envAudit = useMemo(() => {
    const lines = envText.split('\n');
    const issues: string[] = [];
    const keys = new Set<string>();

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      if (!trimmed.includes('=')) {
        issues.push(`Line ${idx + 1}: Missing '=' assignment.`);
        return;
      }

      const [k, ...rest] = trimmed.split('=');
      const val = rest.join('=');

      if (keys.has(k)) {
        issues.push(`Line ${idx + 1}: Duplicate environment key "${k}".`);
      }
      keys.add(k);

      if (val.includes(' ') && !val.startsWith('"') && !val.startsWith("'")) {
        issues.push(`Line ${idx + 1}: Key "${k}" has unquoted spaces.`);
      }

      if (val.includes('sk_live_') || val.includes('ghp_')) {
        issues.push(`Line ${idx + 1}: Potential raw production secret detected for "${k}". Ensure this file is gitignored.`);
      }
    });

    return { issues, totalKeys: keys.size };
  }, [envText]);

  // ----------------------------------------------------
  // 10. HTTP Status Code Catalog
  // ----------------------------------------------------
  const [httpSearch, setHttpSearch] = useState('');
  const httpCodes = [
    { code: 200, name: 'OK', cat: '2xx Success', desc: 'Standard successful HTTP request.' },
    { code: 201, name: 'Created', cat: '2xx Success', desc: 'Resource successfully created via POST or PUT.' },
    { code: 204, name: 'No Content', cat: '2xx Success', desc: 'Action completed, no response body returned.' },
    { code: 301, name: 'Moved Permanently', cat: '3xx Redirection', desc: 'Target resource has been assigned a new permanent URI.' },
    { code: 304, name: 'Not Modified', cat: '3xx Redirection', desc: 'Client cached version is still fresh and valid (ETag/304).' },
    { code: 400, name: 'Bad Request', cat: '4xx Client Error', desc: 'Malformed syntax or invalid request parameters.' },
    { code: 401, name: 'Unauthorized', cat: '4xx Client Error', desc: 'Authentication required or invalid bearer credentials.' },
    { code: 403, name: 'Forbidden', cat: '4xx Client Error', desc: 'Authenticated user does not possess required RBAC permissions.' },
    { code: 404, name: 'Not Found', cat: '4xx Client Error', desc: 'Origin server cannot find current representation of target resource.' },
    { code: 429, name: 'Too Many Requests', cat: '4xx Client Error', desc: 'Rate limit quota exceeded. Check Retry-After header.' },
    { code: 500, name: 'Internal Server Error', cat: '5xx Server Error', desc: 'Server encountered an unhandled unexpected condition.' },
    { code: 502, name: 'Bad Gateway', cat: '5xx Server Error', desc: 'Invalid response from upstream origin server or reverse proxy.' },
    { code: 503, name: 'Service Unavailable', cat: '5xx Server Error', desc: 'Server temporarily overloaded or down for maintenance.' }
  ];

  const filteredHttp = httpCodes.filter(c => 
    c.code.toString().includes(httpSearch) || 
    c.name.toLowerCase().includes(httpSearch.toLowerCase()) || 
    c.desc.toLowerCase().includes(httpSearch.toLowerCase())
  );

  // ----------------------------------------------------
  // 11. Markdown to PDF Document Maker
  // ----------------------------------------------------
  const [mdDocText, setMdDocText] = useState(`# Executive Technology Briefing
**Author:** Engineering Leadership  
**Date:** March 2026

## 1. Executive Summary
This document summarizes our transition towards edge compute micro-frontends and real-time client tooling.

### 2. Strategic Objectives
- Accelerate p95 application load latency below 150ms.
- Guarantee 99.99% system availability through multi-region cloud deployment.
- Maintain strict Zero-Trust compliance across all API ingress points.

---
*Confidential — For Internal Review Only*`);

  // ----------------------------------------------------
  // 12. ROI Investment Calculator
  // ----------------------------------------------------
  const [roiInitial, setRoiInitial] = useState(25000);
  const [roiReturn, setRoiReturn] = useState(48000);
  const [roiYears, setRoiYears] = useState(2);

  const roiStats = useMemo(() => {
    const netProfit = roiReturn - roiInitial;
    const roiPct = (netProfit / roiInitial) * 100;
    const annualized = (Math.pow(roiReturn / roiInitial, 1 / Math.max(1, roiYears)) - 1) * 100;
    return {
      netProfit: netProfit.toLocaleString(),
      roiPct: Math.round(roiPct * 10) / 10,
      annualized: Math.round(annualized * 10) / 10
    };
  }, [roiInitial, roiReturn, roiYears]);

  // ----------------------------------------------------
  // 13. Loan Amortization Schedule
  // ----------------------------------------------------
  const [loanPrincipal, setLoanPrincipal] = useState(150000);
  const [loanInterestRate, setLoanInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(15);

  const amortizationStats = useMemo(() => {
    const monthlyRate = loanInterestRate / 100 / 12;
    const totalPayments = loanYears * 12;
    const monthlyPayment = (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalRepaid = monthlyPayment * totalPayments;
    const totalInterest = totalRepaid - loanPrincipal;

    return {
      monthly: Math.round(monthlyPayment).toLocaleString(),
      totalRepaid: Math.round(totalRepaid).toLocaleString(),
      totalInterest: Math.round(totalInterest).toLocaleString()
    };
  }, [loanPrincipal, loanInterestRate, loanYears]);

  // ----------------------------------------------------
  // 14. Mock Data JSON Generator
  // ----------------------------------------------------
  const [mockRows, setMockRows] = useState(4);

  const generatedMockJson = useMemo(() => {
    const firstNames = ['Sophia', 'Liam', 'Olivia', 'Noah', 'Emma', 'Aiden', 'Mia', 'Lucas'];
    const lastNames = ['Chen', 'Vance', 'Miller', 'Patel', 'Kim', 'Garcia', 'Smith', 'Zhang'];
    const roles = ['Software Engineer', 'Product Manager', 'UX Designer', 'DevOps Lead', 'Security Architect'];
    
    const records = [];
    for (let i = 0; i < mockRows; i++) {
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      records.push({
        id: `usr_${1000 + i}`,
        name: `${fn} ${ln}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
        role: roles[i % roles.length],
        active: i % 3 !== 0,
        createdAt: new Date(Date.now() - (i * 86400000 * 5)).toISOString()
      });
    }
    return JSON.stringify(records, null, 2);
  }, [mockRows]);

  // ----------------------------------------------------
  // 15. CORS Header Builder
  // ----------------------------------------------------
  const [corsOrigin, setCorsOrigin] = useState('https://myapp.com, https://admin.myapp.com');
  const [corsCredentials, setCorsCredentials] = useState(true);
  const [corsMethods, setCorsMethods] = useState('GET, POST, PUT, DELETE, OPTIONS');

  const corsNginxConfig = useMemo(() => {
    return `add_header 'Access-Control-Allow-Origin' '${corsOrigin}';
add_header 'Access-Control-Allow-Methods' '${corsMethods}';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
add_header 'Access-Control-Allow-Credentials' '${corsCredentials ? 'true' : 'false'}';`;
  }, [corsOrigin, corsCredentials, corsMethods]);

  // ----------------------------------------------------
  // 16. Social Share Card Debugger
  // ----------------------------------------------------
  const [socialTitle, setSocialTitle] = useState('ToolStack - The Unified Web Utility Suite');
  const [socialDesc, setSocialDesc] = useState('135+ completely free developer utilities, calculators, and media tools.');
  const [socialImg, setSocialImg] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80');

  // ----------------------------------------------------
  // 17. Markdown Cheatsheet Sandbox
  // ----------------------------------------------------
  const [cheatText, setCheatText] = useState('## Quick Start Guide\n\n- **Bold text** with asterisks\n- *Italics* with single asterisk\n- `inline code` with backticks\n\n> Blockquote inspirational note');

  // ----------------------------------------------------
  // 18. Meeting Agenda Builder
  // ----------------------------------------------------
  const [agendaTitle, setAgendaTitle] = useState('Quarterly Product Roadmap Sync');
  const [agendaItems, setAgendaItems] = useState([
    { time: '10 min', topic: 'Sprint Velocity & Deliverables Review' },
    { time: '20 min', topic: 'Architecture Proposals for Member Suite' },
    { time: '15 min', topic: 'Open Discussion & Action Items Assignment' }
  ]);

  const agendaSummary = useMemo(() => {
    return `# Agenda: ${agendaTitle}\n\n${agendaItems.map(a => `- **[${a.time}]** ${a.topic}`).join('\n')}\n\n### Action Items / Next Steps:\n- [ ] Distribute meeting recap notes\n- [ ] Schedule sprint backlog refinement`;
  }, [agendaTitle, agendaItems]);

  // ----------------------------------------------------
  // 19. UTM Campaign Generator
  // ----------------------------------------------------
  const [utmUrl, setUtmUrl] = useState('https://toolstack.io/pricing');
  const [utmSource, setUtmSource] = useState('newsletter');
  const [utmMedium, setUtmMedium] = useState('email');
  const [utmCampaign, setUtmCampaign] = useState('march_pro_launch');

  const generatedUtmLink = useMemo(() => {
    try {
      const u = new URL(utmUrl);
      u.searchParams.set('utm_source', utmSource);
      u.searchParams.set('utm_medium', utmMedium);
      u.searchParams.set('utm_campaign', utmCampaign);
      return u.toString();
    } catch (e) {
      return `${utmUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
    }
  }, [utmUrl, utmSource, utmMedium, utmCampaign]);

  // ----------------------------------------------------
  // 20. API Key & Entropy Generator
  // ----------------------------------------------------
  const [keyPrefix, setKeyPrefix] = useState('sk_live_');
  const [keyEntropyBytes, setKeyEntropyBytes] = useState(32);
  const [generatedKey, setGeneratedKey] = useState('');

  const generateSecureKey = () => {
    const bytes = new Uint8Array(keyEntropyBytes);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    setGeneratedKey(`${keyPrefix}${hex}`);
  };

  useEffect(() => {
    generateSecureKey();
  }, [keyPrefix, keyEntropyBytes]);

  return (
    <div className="space-y-6">
      {/* 1. WEBHOOK TESTER */}
      {tool.id === 'webhook-tester-simulator' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Webhook Secret (Signing Key)</label>
            <input
              type="text"
              value={whSecret}
              onChange={e => setWhSecret(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Payload JSON Body</label>
            <textarea
              value={whPayload}
              onChange={e => setWhPayload(e.target.value)}
              rows={5}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs"
            />
          </div>

          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-1">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
              <span>Computed HMAC-SHA256 Signature (Stripe / GitHub style)</span>
              <button
                onClick={() => copyToClipboard(whSignature, 'wh-sig')}
                className="text-indigo-600 hover:underline flex items-center gap-1 font-bold"
              >
                {copied === 'wh-sig' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy Sig
              </button>
            </div>
            <div className="font-mono text-xs break-all font-bold text-slate-900 dark:text-white">
              t={Math.floor(Date.now() / 1000)},v1={whSignature}
            </div>
          </div>
        </div>
      )}

      {/* 2. REGEX SYNTAX DEBUGGER */}
      {tool.id === 'regex-syntax-debugger' && (
        <div className="space-y-5">
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Regular Expression</label>
              <div className="relative">
                <input
                  type="text"
                  value={regPattern}
                  onChange={e => setRegPattern(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl border font-mono text-xs"
                />
                <input
                  type="text"
                  value={regFlags}
                  onChange={e => setRegFlags(e.target.value)}
                  placeholder="gims"
                  className="absolute right-1 top-1 bottom-1 w-10 text-center font-mono text-xs font-bold border-l"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Sample Text String</label>
            <textarea
              value={regTestStr}
              onChange={e => setRegTestStr(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-xl border text-xs font-mono"
            />
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Extracted Matches ({regMatches.count})</span>
              {regMatches.valid ? (
                <span className="text-emerald-600 font-bold">Valid Pattern</span>
              ) : (
                <span className="text-rose-600 font-bold">Invalid Pattern</span>
              )}
            </div>
            {regMatches.matches.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {regMatches.matches.map((m, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs rounded-lg border border-indigo-200 dark:border-indigo-800">
                    {m}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400">No matches found.</div>
            )}
          </div>
        </div>
      )}

      {/* 3. JWT TOKEN SIGNER */}
      {tool.id === 'jwt-token-signer' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Header JSON</label>
              <textarea value={jwtHeader} onChange={e => setJwtHeader(e.target.value)} rows={4} className="w-full p-2.5 border rounded-xl font-mono text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Payload Claims JSON</label>
              <textarea value={jwtPayload} onChange={e => setJwtPayload(e.target.value)} rows={4} className="w-full p-2.5 border rounded-xl font-mono text-xs" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Secret Key</label>
            <input type="text" value={jwtSecret} onChange={e => setJwtSecret(e.target.value)} className="w-full px-3 py-2 border rounded-xl font-mono text-xs" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500 uppercase">Generated Signed JWT</span>
              <button onClick={() => copyToClipboard(generatedJwt, 'jwt')} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                {copied === 'jwt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy Token
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border font-mono text-xs break-all text-indigo-600 dark:text-indigo-400 font-bold">
              {generatedJwt}
            </div>
          </div>
        </div>
      )}

      {/* 4. GIT COMMAND BUILDER */}
      {tool.id === 'git-command-generator' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={gitAction} onChange={e => setGitAction(e.target.value)} className="p-2.5 border rounded-xl text-xs font-bold">
              <option value="rebase-interactive">Interactive Rebase</option>
              <option value="cherry-pick">Cherry Pick Commit</option>
              <option value="undo-commit">Soft Undo Commit</option>
              <option value="branch-cleanup">Clean Merged Branches</option>
              <option value="stash-staged">Stash Staged Only</option>
            </select>
            <input type="text" value={gitBranch} onChange={e => setGitBranch(e.target.value)} placeholder="Target Branch" className="p-2.5 border rounded-xl text-xs font-mono" />
            <input type="number" min="1" max="20" value={gitCommitCount} onChange={e => setGitCommitCount(Number(e.target.value))} placeholder="Commits back" className="p-2.5 border rounded-xl text-xs font-mono" />
          </div>

          <div className="p-5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl relative shadow-inner">
            <button onClick={() => copyToClipboard(gitSnippet, 'git-copy')} className="absolute top-3 right-3 text-slate-400 hover:text-white">
              {copied === 'git-copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="whitespace-pre-wrap">{gitSnippet}</pre>
          </div>
        </div>
      )}

      {/* 5. USER AGENT AUDITOR */}
      {tool.id === 'user-agent-device-auditor' && (
        <div className="space-y-5">
          <textarea value={uaString} onChange={e => setUaString(e.target.value)} rows={3} className="w-full p-3 border rounded-xl font-mono text-xs" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Browser</div>
              <div className="text-base font-black text-indigo-600">{uaAnalysis.browser}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Operating System</div>
              <div className="text-base font-black text-slate-900 dark:text-white">{uaAnalysis.os}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Engine</div>
              <div className="text-base font-black text-slate-700 dark:text-slate-300">{uaAnalysis.engine}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Form Factor</div>
              <div className="text-base font-black text-emerald-600">{uaAnalysis.isMobile ? 'Mobile' : 'Desktop'}</div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CONTENT SECURITY POLICY BUILDER */}
      {tool.id === 'content-security-policy-builder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">script-src</label>
              <input type="text" value={cspScriptSrc} onChange={e => setCspScriptSrc(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">connect-src</label>
              <input type="text" value={cspConnectSrc} onChange={e => setCspConnectSrc(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>CSP HTTP Response Header</span>
              <button onClick={() => copyToClipboard(generatedCsp, 'csp')} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                {copied === 'csp' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy Header
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-slate-950 border rounded-xl font-mono text-xs break-all text-slate-800 dark:text-slate-200">
              Content-Security-Policy: {generatedCsp}
            </div>
          </div>
        </div>
      )}

      {/* 7. SQL TO TYPESCRIPT */}
      {tool.id === 'sql-to-typescript-converter' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">PostgreSQL / MySQL Schema</label>
              <textarea value={sqlCreateInput} onChange={e => setSqlCreateInput(e.target.value)} rows={10} className="w-full p-3 border rounded-xl font-mono text-xs" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase">TypeScript Interface</label>
                <button onClick={() => copyToClipboard(tsInterfaceOutput, 'ts-copy')} className="text-xs text-indigo-600 font-bold hover:underline">Copy TS</button>
              </div>
              <textarea readOnly value={tsInterfaceOutput} rows={10} className="w-full p-3 border bg-slate-50 dark:bg-slate-900 rounded-xl font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold" />
            </div>
          </div>
        </div>
      )}

      {/* 8. DOCKERFILE BUILDER */}
      {tool.id === 'dockerfile-builder' && (
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 border rounded-2xl text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Node Base Image</label>
              <input type="text" value={dfNodeVersion} onChange={e => setDfNodeVersion(e.target.value)} className="px-3 py-1.5 border rounded-lg font-mono text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Port</label>
              <input type="number" value={dfPort} onChange={e => setDfPort(Number(e.target.value))} className="w-24 px-3 py-1.5 border rounded-lg font-mono text-xs" />
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-2xl relative shadow-inner">
            <button onClick={() => copyToClipboard(generatedDockerfile, 'df-copy')} className="absolute top-3 right-3 text-slate-400 hover:text-white">
              {copied === 'df-copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="whitespace-pre-wrap">{generatedDockerfile}</pre>
          </div>
        </div>
      )}

      {/* 9. ENV AUDITOR */}
      {tool.id === 'env-file-auditor' && (
        <div className="space-y-4">
          <textarea value={envText} onChange={e => setEnvText(e.target.value)} rows={6} className="w-full p-3 border rounded-xl font-mono text-xs" />

          <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="text-xs font-bold uppercase text-slate-500">Audit Diagnosis ({envAudit.totalKeys} keys)</div>
            {envAudit.issues.length > 0 ? (
              <ul className="space-y-1 text-xs text-rose-600 font-medium">
                {envAudit.issues.map((iss, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>⚠️</span>
                    <span>{iss}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-emerald-600 font-bold">✅ Clean syntax with zero syntax warnings.</div>
            )}
          </div>
        </div>
      )}

      {/* 10. HTTP STATUS CODE GUIDE */}
      {tool.id === 'http-status-code-guide' && (
        <div className="space-y-4">
          <input
            type="text"
            value={httpSearch}
            onChange={e => setHttpSearch(e.target.value)}
            placeholder="Search by code (404) or name (unauthorized)..."
            className="w-full px-4 py-2.5 border rounded-xl text-xs font-medium"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {filteredHttp.map(c => (
              <div key={c.code} className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-base text-indigo-600">{c.code} {c.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">{c.cat}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. MARKDOWN TO PDF */}
      {tool.id === 'markdown-to-pdf-doc' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => window.print()} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea value={mdDocText} onChange={e => setMdDocText(e.target.value)} rows={12} className="w-full p-3 border rounded-xl font-mono text-xs" />
            <div className="p-6 bg-white dark:bg-slate-900 border rounded-2xl text-xs space-y-3 prose dark:prose-invert">
              <div className="whitespace-pre-wrap font-sans">{mdDocText}</div>
            </div>
          </div>
        </div>
      )}

      {/* 12. ROI INVESTMENT CALCULATOR */}
      {tool.id === 'roi-investment-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Initial Capital ($)</label>
              <input type="number" value={roiInitial} onChange={e => setRoiInitial(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Final Value ($)</label>
              <input type="number" value={roiReturn} onChange={e => setRoiReturn(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Timeframe (Years)</label>
              <input type="number" value={roiYears} onChange={e => setRoiYears(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total ROI</div>
              <div className="text-2xl font-black text-emerald-600">+{roiStats.roiPct}%</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Net Profit</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">${roiStats.netProfit}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Annualized CAGR</div>
              <div className="text-2xl font-black text-indigo-600">+{roiStats.annualized}%</div>
            </div>
          </div>
        </div>
      )}

      {/* 13. LOAN AMORTIZATION SCHEDULE */}
      {tool.id === 'loan-amortization-schedule' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Loan Principal ($)</label>
              <input type="number" value={loanPrincipal} onChange={e => setLoanPrincipal(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Interest Rate (%)</label>
              <input type="number" step="0.1" value={loanInterestRate} onChange={e => setLoanInterestRate(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Term (Years)</label>
              <input type="number" value={loanYears} onChange={e => setLoanYears(Number(e.target.value))} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-indigo-600">Monthly Payment</div>
              <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300">${amortizationStats.monthly}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Interest Paid</div>
              <div className="text-2xl font-black text-rose-600">${amortizationStats.totalInterest}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Repaid</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">${amortizationStats.totalRepaid}</div>
            </div>
          </div>
        </div>
      )}

      {/* 14. MOCK DATA GENERATOR */}
      {tool.id === 'mock-data-generator' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Records:</span>
              <input type="range" min="1" max="15" value={mockRows} onChange={e => setMockRows(Number(e.target.value))} />
              <span className="text-xs font-mono font-bold">{mockRows} items</span>
            </div>
            <button onClick={() => copyToClipboard(generatedMockJson, 'mock-json')} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              {copied === 'mock-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy JSON
            </button>
          </div>

          <pre className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900 font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-200">
            {generatedMockJson}
          </pre>
        </div>
      )}

      {/* 15. CORS HEADER BUILDER */}
      {tool.id === 'cors-header-builder' && (
        <div className="space-y-4">
          <input type="text" value={corsOrigin} onChange={e => setCorsOrigin(e.target.value)} placeholder="Allowed Origins" className="w-full p-2.5 border rounded-xl text-xs font-mono" />
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl relative shadow-inner">
            <button onClick={() => copyToClipboard(corsNginxConfig, 'cors-copy')} className="absolute top-3 right-3 text-slate-400 hover:text-white">
              {copied === 'cors-copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="whitespace-pre-wrap">{corsNginxConfig}</pre>
          </div>
        </div>
      )}

      {/* 16. SOCIAL SHARE CARD DEBUGGER */}
      {tool.id === 'social-share-card-debugger' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" value={socialTitle} onChange={e => setSocialTitle(e.target.value)} placeholder="Title" className="p-2 border rounded-lg text-xs font-semibold" />
            <input type="text" value={socialDesc} onChange={e => setSocialDesc(e.target.value)} placeholder="Description" className="p-2 border rounded-lg text-xs font-semibold" />
            <input type="text" value={socialImg} onChange={e => setSocialImg(e.target.value)} placeholder="Image URL" className="p-2 border rounded-lg text-xs font-semibold" />
          </div>

          <div className="max-w-md mx-auto border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-md">
            <img src={socialImg} alt="Preview" className="w-full h-44 object-cover" />
            <div className="p-4 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-mono">toolstack.io</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{socialTitle}</div>
              <p className="text-xs text-slate-500 line-clamp-2">{socialDesc}</p>
            </div>
          </div>
        </div>
      )}

      {/* 17. MARKDOWN CHEATSHEET SANDBOX */}
      {tool.id === 'markdown-cheatsheet-sandbox' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button onClick={() => setCheatText(prev => prev + '\n\n| Col A | Col B |\n| --- | --- |\n| Data 1 | Data 2 |')} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">+ Table</button>
            <button onClick={() => setCheatText(prev => prev + '\n\n```typescript\nconsole.log("hello");\n```')} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">+ Code Block</button>
            <button onClick={() => setCheatText(prev => prev + '\n\n- [ ] Action item checklist')} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">+ Task List</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea value={cheatText} onChange={e => setCheatText(e.target.value)} rows={8} className="w-full p-3 border rounded-xl font-mono text-xs" />
            <div className="p-4 border bg-slate-50 dark:bg-slate-900 rounded-xl text-xs whitespace-pre-wrap font-sans">
              {cheatText}
            </div>
          </div>
        </div>
      )}

      {/* 18. MEETING AGENDA BUILDER */}
      {tool.id === 'meeting-agenda-builder' && (
        <div className="space-y-4">
          <input type="text" value={agendaTitle} onChange={e => setAgendaTitle(e.target.value)} className="w-full p-3 border rounded-xl font-bold text-sm" />
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Exportable Markdown Agenda</span>
            <button onClick={() => copyToClipboard(agendaSummary, 'agenda-copy')} className="text-xs text-indigo-600 font-bold hover:underline">Copy Agenda</button>
          </div>
          <pre className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 font-mono text-xs whitespace-pre-wrap">
            {agendaSummary}
          </pre>
        </div>
      )}

      {/* 19. UTM CAMPAIGN GENERATOR */}
      {tool.id === 'utm-campaign-generator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={utmUrl} onChange={e => setUtmUrl(e.target.value)} placeholder="Target URL" className="p-2.5 border rounded-xl text-xs" />
            <input type="text" value={utmCampaign} onChange={e => setUtmCampaign(e.target.value)} placeholder="Campaign Name" className="p-2.5 border rounded-xl text-xs" />
            <input type="text" value={utmSource} onChange={e => setUtmSource(e.target.value)} placeholder="Source (e.g. google, newsletter)" className="p-2.5 border rounded-xl text-xs" />
            <input type="text" value={utmMedium} onChange={e => setUtmMedium(e.target.value)} placeholder="Medium (e.g. cpc, email)" className="p-2.5 border rounded-xl text-xs" />
          </div>

          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <span>Tagged Tracking URL</span>
              <button onClick={() => copyToClipboard(generatedUtmLink, 'utm')} className="hover:underline flex items-center gap-1 font-bold">
                {copied === 'utm' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy URL
              </button>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border font-mono text-xs break-all">
              {generatedUtmLink}
            </div>
          </div>
        </div>
      )}

      {/* 20. API KEY ENTROPY GENERATOR */}
      {tool.id === 'api-key-entropy-generator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Secret Prefix</label>
              <input type="text" value={keyPrefix} onChange={e => setKeyPrefix(e.target.value)} className="w-full p-2.5 border rounded-xl font-mono text-xs font-bold" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Entropy Size ({keyEntropyBytes * 8} bits)</label>
              <select value={keyEntropyBytes} onChange={e => setKeyEntropyBytes(Number(e.target.value))} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                <option value={16}>128 bits (Fast / standard)</option>
                <option value={32}>256 bits (Cryptographically Strong)</option>
                <option value={64}>512 bits (Maximum Enterprise Vault)</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 border rounded-3xl space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>Generated Secure Token</span>
              <button onClick={generateSecureKey} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>
            <div className="p-4 bg-white dark:bg-slate-950 border rounded-2xl font-mono text-xs font-bold text-slate-900 dark:text-white break-all flex items-center justify-between gap-3">
              <span>{generatedKey}</span>
              <button onClick={() => copyToClipboard(generatedKey, 'key-copy')} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                {copied === 'key-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
