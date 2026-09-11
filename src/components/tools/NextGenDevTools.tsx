import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Terminal, 
  Key, 
  Database, 
  Clock, 
  Box, 
  Palette, 
  Network, 
  Monitor,
  RefreshCw,
  Info,
  Sliders
} from 'lucide-react';
import { ToolItem } from '../../types';

interface NextGenDevToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const NextGenDevTools: React.FC<NextGenDevToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // --- cURL Converter State ---
  const [curlInput, setCurlInput] = useState<string>(
    `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer sk_test_12345" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Jane Doe", "role": "admin"}'`
  );
  const [curlTargetLang, setCurlTargetLang] = useState<'fetch' | 'axios' | 'python' | 'go'>('fetch');

  // --- JWT Debugger State ---
  const [jwtInput, setJwtInput] = useState<string>(
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUml2ZXJzIiwiZW1haWwiOiJhbGV4QGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4z9sK41rW7g7r9E9sE4p8L4wW9w-zF7w8sK41rW7g7r`
  );

  // --- SQL Formatter State ---
  const [sqlInput, setSqlInput] = useState<string>(
    `select u.id, u.name, count(o.id) as total_orders from users u left join orders o on u.id = o.user_id where u.status = 'active' group by u.id, u.name having count(o.id) > 5 order by total_orders desc limit 10;`
  );
  const [sqlIndent, setSqlIndent] = useState<2 | 4>(2);
  const [sqlUppercase, setSqlUppercase] = useState(true);

  // --- Cron Parser State ---
  const [cronInput, setCronInput] = useState<string>('*/15 0 1,15 * 1-5');

  // --- Docker Compose State ---
  const [dockerServices, setDockerServices] = useState<string[]>(['node', 'postgres', 'redis']);
  const [dockerPort, setDockerPort] = useState<string>('3000');

  // --- CSS Mesh & Glassmorphism State ---
  const [glassBlur, setGlassBlur] = useState<number>(16);
  const [glassOpacity, setGlassOpacity] = useState<number>(25);
  const [glassBorder, setGlassBorder] = useState<number>(20);

  // --- Subnet Calculator State ---
  const [subnetIp, setSubnetIp] = useState<string>('192.168.1.100');
  const [subnetCidr, setSubnetCidr] = useState<number>(24);

  // --- User-Agent State ---
  const [customUa, setCustomUa] = useState<string>(
    typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0'
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onSuccess(`Copied ${label}`);
  };

  // --- cURL Conversion Logic ---
  const convertedCurlCode = useMemo(() => {
    // Parse method
    const methodMatch = curlInput.match(/-X\s+([A-Z]+)/i);
    const method = methodMatch ? methodMatch[1].toUpperCase() : (curlInput.includes('-d') ? 'POST' : 'GET');

    // Parse URL
    const urlMatch = curlInput.match(/curl\s+(?:-X\s+[A-Z]+\s+)?["']?(https?:\/\/[^\s"'\\]+)["']?/i);
    const url = urlMatch ? urlMatch[1] : 'https://api.example.com/endpoint';

    // Parse Headers
    const headerMatches = Array.from(curlInput.matchAll(/-H\s+["']([^"']+)["']/gi));
    const headersObj: Record<string, string> = {};
    headerMatches.forEach(m => {
      const parts = m[1].split(':');
      if (parts.length >= 2) {
        headersObj[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    // Parse Body
    const dataMatch = curlInput.match(/-d\s+["']([^"']+)["']/i);
    const rawData = dataMatch ? dataMatch[1] : null;

    if (curlTargetLang === 'fetch') {
      return `const response = await fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headersObj, null, 2)},
  ${rawData ? `body: JSON.stringify(${rawData})` : ''}
});
const data = await response.json();
console.log(data);`;
    }

    if (curlTargetLang === 'axios') {
      return `import axios from 'axios';

const response = await axios({
  method: '${method.toLowerCase()}',
  url: '${url}',
  headers: ${JSON.stringify(headersObj, null, 2)},
  ${rawData ? `data: ${rawData}` : ''}
});
console.log(response.data);`;
    }

    if (curlTargetLang === 'python') {
      return `import requests

url = "${url}"
headers = ${JSON.stringify(headersObj, null, 4)}
${rawData ? `payload = ${rawData}` : ''}

response = requests.${method.toLowerCase()}(
    url,
    headers=headers,
    ${rawData ? 'json=payload' : ''}
)
print(response.json())`;
    }

    // Go net/http
    return `package main

import (
    "fmt"
    "net/http"
    "io"
    ${rawData ? `"strings"` : ''}
)

func main() {
    client := &http.Client{}
    ${rawData ? `body := strings.NewReader(\`${rawData}\`)` : `var body io.Reader = nil`}
    req, err := http.NewRequest("${method}", "${url}", body)
    if err != nil {
        panic(err)
    }

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    resBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(resBody))
}`;
  }, [curlInput, curlTargetLang]);

  // --- JWT Debugger Logic ---
  const jwtDecoded = useMemo(() => {
    try {
      const parts = jwtInput.trim().split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'Invalid JWT format (must have 3 parts separated by dots)' };
      }

      const decodePart = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const jsonStr = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonStr);
      };

      const header = decodePart(parts[0]);
      const payload = decodePart(parts[1]);

      let expirationMsg = 'No exp claim found';
      let isExpired = false;
      if (payload.exp && typeof payload.exp === 'number') {
        const expDate = new Date(payload.exp * 1000);
        const now = new Date();
        isExpired = expDate < now;
        expirationMsg = isExpired 
          ? `Expired on ${expDate.toLocaleString()}`
          : `Valid until ${expDate.toLocaleString()}`;
      }

      return {
        valid: true,
        header,
        payload,
        signature: parts[2],
        isExpired,
        expirationMsg
      };
    } catch (e: any) {
      return { valid: false, error: e.message || 'Error decoding base64 payload' };
    }
  }, [jwtInput]);

  // --- SQL Formatter Logic ---
  const formattedSql = useMemo(() => {
    const raw = sqlInput.trim();
    if (!raw) return '';

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 
      'JOIN', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'AND', 'OR', 'ON'
    ];

    let query = raw;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      query = query.replace(regex, sqlUppercase ? kw.toUpperCase() : kw.toLowerCase());
    });

    const indentStr = ' '.repeat(sqlIndent);
    let result = query
      .replace(/\b(FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|GROUP BY|HAVING|ORDER BY|LIMIT)\b/gi, `\n$1`)
      .replace(/\b(AND|OR)\b/gi, `\n${indentStr}$1`);

    return result.trim();
  }, [sqlInput, sqlIndent, sqlUppercase]);

  // --- Cron Parser Logic ---
  const cronDescription = useMemo(() => {
    const parts = cronInput.trim().split(/\s+/);
    if (parts.length < 5) {
      return { valid: false, text: 'Cron expression must have at least 5 space-separated parts.' };
    }

    const [min, hour, dom, mon, dow] = parts;
    let desc = `Runs: `;

    if (min === '*' && hour === '*') {
      desc += 'Every minute';
    } else if (min && min.startsWith('*/')) {
      desc += `Every ${min.slice(2)} minutes`;
    } else {
      desc += `At minute ${min} of hour ${hour}`;
    }

    if (dom !== '*') desc += `, on day-of-month ${dom}`;
    if (mon !== '*') desc += `, in month ${mon}`;
    if (dow !== '*') desc += `, on day-of-week ${dow}`;

    return { valid: true, text: desc };
  }, [cronInput]);

  // --- Docker Compose Logic ---
  const generatedDockerCompose = useMemo(() => {
    let yml = `version: '3.8'\n\nservices:\n`;

    if (dockerServices.includes('node')) {
      yml += `  app:
    image: node:20-alpine
    working_dir: /app
    ports:
      - "${dockerPort}:${dockerPort}"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
    restart: unless-stopped\n\n`;
    }

    if (dockerServices.includes('postgres')) {
      yml += `  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: secret_password
      POSTGRES_DB: app_development
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped\n\n`;
    }

    if (dockerServices.includes('redis')) {
      yml += `  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped\n\n`;
    }

    if (dockerServices.includes('nginx')) {
      yml += `  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped\n\n`;
    }

    yml += `volumes:
  pgdata:\n`;

    return yml;
  }, [dockerServices, dockerPort]);

  // --- Subnet Calculator Logic ---
  const subnetDetails = useMemo(() => {
    try {
      const parts = subnetIp.trim().split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }

      const totalHosts = Math.pow(2, 32 - subnetCidr);
      const usableHosts = subnetCidr >= 31 ? (subnetCidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

      // Mask string
      const maskBin = '1'.repeat(subnetCidr) + '0'.repeat(32 - subnetCidr);
      const maskOctets = [
        parseInt(maskBin.slice(0, 8), 2),
        parseInt(maskBin.slice(8, 16), 2),
        parseInt(maskBin.slice(16, 24), 2),
        parseInt(maskBin.slice(24, 32), 2),
      ];
      const maskStr = maskOctets.join('.');

      // Network address
      const netOctets = parts.map((octet, idx) => octet & maskOctets[idx]);
      const netAddress = netOctets.join('.');

      // Broadcast address
      const wildOctets = maskOctets.map(o => 255 - o);
      const bcastOctets = netOctets.map((o, idx) => o | wildOctets[idx]);
      const bcastAddress = bcastOctets.join('.');

      // Usable range
      const firstHost = [...netOctets];
      firstHost[3] += 1;
      const lastHost = [...bcastOctets];
      lastHost[3] -= 1;

      return {
        ip: subnetIp,
        cidr: subnetCidr,
        mask: maskStr,
        wildcard: wildOctets.join('.'),
        network: netAddress,
        broadcast: bcastAddress,
        hostRange: `${firstHost.join('.')} - ${lastHost.join('.')}`,
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString()
      };
    } catch (e) {
      return null;
    }
  }, [subnetIp, subnetCidr]);

  return (
    <div className="space-y-6">
      {/* 1. cURL to Code Converter */}
      {(tool.id === 'curl-converter' || tool.slug === 'curl-converter') && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">
              Input Raw cURL Command
            </label>
            <textarea
              rows={4}
              value={curlInput}
              onChange={(e) => setCurlInput(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(['fetch', 'axios', 'python', 'go'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setCurlTargetLang(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                      curlTargetLang === lang
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {lang === 'fetch' ? 'JavaScript (Fetch)' : lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCopy(convertedCurlCode, 'Converted Code')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Code
              </button>
            </div>

            <pre className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
              {convertedCurlCode}
            </pre>
          </div>
        </div>
      )}

      {/* 2. JWT Debugger */}
      {(tool.id === 'jwt-debugger' || tool.slug === 'jwt-debugger') && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">
              Encoded JWT Token (Header.Payload.Signature)
            </label>
            <textarea
              rows={3}
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-indigo-600 dark:text-indigo-400"
              placeholder="Paste encoded JWT here..."
            />
          </div>

          {jwtDecoded.valid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-rose-500">Header: Algorithm & Type</span>
                <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-rose-600 dark:text-rose-400">
                  {JSON.stringify(jwtDecoded.header, null, 2)}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-indigo-500">Payload: Claims & Data</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    jwtDecoded.isExpired ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {jwtDecoded.expirationMsg}
                  </span>
                </div>
                <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  {JSON.stringify(jwtDecoded.payload, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-xs font-semibold">
              {jwtDecoded.error}
            </div>
          )}
        </div>
      )}

      {/* 3. SQL Formatter */}
      {(tool.id === 'sql-formatter' || tool.slug === 'sql-formatter') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-500">Input SQL Query</label>
              <textarea
                rows={10}
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
              />
              <div className="flex items-center gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sqlUppercase}
                    onChange={(e) => setSqlUppercase(e.target.checked)}
                    className="rounded"
                  />
                  Uppercase Keywords
                </label>
                <div className="flex items-center gap-1.5">
                  <span>Indent:</span>
                  <button
                    onClick={() => setSqlIndent(2)}
                    className={`px-2 py-0.5 rounded ${sqlIndent === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => setSqlIndent(4)}
                    className={`px-2 py-0.5 rounded ${sqlIndent === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                  >
                    4
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Beautified SQL</span>
                <button
                  onClick={() => handleCopy(formattedSql, 'Formatted SQL')}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
              <pre className="flex-1 p-4 rounded-2xl bg-slate-900 text-sky-300 text-xs font-mono whitespace-pre-wrap overflow-y-auto max-h-[350px]">
                {formattedSql}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 4. Cron Expression Parser */}
      {(tool.id === 'cron-parser' || tool.slug === 'cron-parser') && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-500">
              Cron Expression (Minute Hour Day-of-Month Month Day-of-Week)
            </label>
            <input
              type="text"
              value={cronInput}
              onChange={(e) => setCronInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-indigo-400 bg-white dark:bg-slate-900 text-sm font-mono font-bold"
            />
          </div>

          <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-sm">
              <Clock className="w-4 h-4 text-indigo-600" />
              Plain English Translation
            </div>
            <p className="text-xs text-indigo-950 dark:text-indigo-300 font-medium">
              {cronDescription.text}
            </p>
          </div>
        </div>
      )}

      {/* 5. Docker Compose Generator */}
      {(tool.id === 'docker-compose-generator' || tool.slug === 'docker-compose-generator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Select Stack Components
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'node', label: 'Node.js App' },
                    { id: 'postgres', label: 'PostgreSQL DB' },
                    { id: 'redis', label: 'Redis Cache' },
                    { id: 'nginx', label: 'Nginx Proxy' }
                  ].map(item => {
                    const isChecked = dockerServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setDockerServices(prev => 
                            isChecked ? prev.filter(s => s !== item.id) : [...prev, item.id]
                          );
                        }}
                        className={`p-3 rounded-xl text-xs font-bold border transition-colors text-left flex items-center justify-between ${
                          isChecked
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isChecked && <Check className="w-4 h-4 text-indigo-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Exposed Host Port
                </label>
                <input
                  type="text"
                  value={dockerPort}
                  onChange={(e) => setDockerPort(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">docker-compose.yml</span>
                <button
                  onClick={() => handleCopy(generatedDockerCompose, 'docker-compose.yml')}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy YML
                </button>
              </div>
              <pre className="flex-1 p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap overflow-y-auto max-h-[350px]">
                {generatedDockerCompose}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 6. CSS Mesh & Glassmorphism Generator */}
      {(tool.id === 'css-mesh-generator' || tool.slug === 'css-mesh-generator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Backdrop Blur: {glassBlur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={glassBlur}
                  onChange={(e) => setGlassBlur(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Background Opacity: {glassOpacity}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={glassOpacity}
                  onChange={(e) => setGlassOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Border Opacity: {glassBorder}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={glassBorder}
                  onChange={(e) => setGlassBorder(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center min-h-[260px] relative overflow-hidden">
              <div 
                className="p-6 rounded-2xl text-white space-y-2 max-w-sm w-full shadow-2xl"
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${glassOpacity / 100})`,
                  backdropFilter: `blur(${glassBlur}px)`,
                  WebkitBackdropFilter: `blur(${glassBlur}px)`,
                  border: `1px solid rgba(255, 255, 255, ${glassBorder / 100})`
                }}
              >
                <div className="text-base font-bold">Glassmorphism Card</div>
                <div className="text-xs text-white/90">
                  Real-time CSS backdrop-filter simulation with variable saturation and edge illumination.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Subnet & CIDR Mask Calculator */}
      {(tool.id === 'subnet-calculator' || tool.slug === 'subnet-calculator') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">IP Address</label>
              <input
                type="text"
                value={subnetIp}
                onChange={(e) => setSubnetIp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">CIDR Prefix (/{subnetCidr})</label>
              <input
                type="number"
                min="8"
                max="32"
                value={subnetCidr}
                onChange={(e) => setSubnetCidr(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
              />
            </div>
          </div>

          {subnetDetails && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Subnet Mask</span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block truncate">
                  {subnetDetails.mask}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Network IP</span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
                  {subnetDetails.network}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Broadcast IP</span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
                  {subnetDetails.broadcast}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Usable Hosts</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block truncate">
                  {subnetDetails.usableHosts}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. User-Agent Parser */}
      {(tool.id === 'user-agent-parser' || tool.slug === 'user-agent-parser') && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">
              User-Agent String
            </label>
            <textarea
              rows={3}
              value={customUa}
              onChange={(e) => setCustomUa(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Screen Resolution</span>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                {typeof window !== 'undefined' ? `${window.screen.width} × ${window.screen.height}` : 'N/A'}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">CPU Cores</span>
              <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 8) : 8} Threads
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Touch Enabled</span>
              <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 ? 'Yes' : 'No'}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Device Memory</span>
              <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                {typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : '8 GB+'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
