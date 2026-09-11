import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  Braces, 
  FileCode, 
  Hash, 
  Clock, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';
import { ToolItem } from '../../types';

interface DevToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const DevTools: React.FC<DevToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // JSON Formatter states
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        site: "ToolStack",
        active: true,
        version: "2.5.0",
        stats: { tools: 52, users: 120000 },
        tags: ["free", "developer", "pdf", "image"]
      },
      null,
      2
    )
  );
  const [jsonIndent, setJsonIndent] = useState<2 | 4>(2);
  const [jsonTreeMode, setJsonTreeMode] = useState(false);

  // Base64 states
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');
  const [base64Input, setBase64Input] = useState<string>('ToolStack is awesome!');

  // URL Encoder states
  const [urlInput, setUrlInput] = useState<string>('https://example.com/search?query=hello world & special=true#section');
  const [urlComponentMode, setUrlComponentMode] = useState(true);

  // UUID states
  const [uuidQuantity, setUuidQuantity] = useState<number>(5);
  const [uuidUppercase, setUuidUppercase] = useState(false);
  const [uuidHyphens, setUuidHyphens] = useState(true);
  const [uuidList, setUuidList] = useState<string[]>([]);

  // Regex states
  const [regexPattern, setRegexPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [regexTestString, setRegexTestString] = useState<string>(
    'Contact support@toolstack.dev or info@example.com for assistance.'
  );

  // CSV & JSON states
  const [csvInput, setCsvInput] = useState<string>(
    `id,name,category,rating\n1,PDF Merge,pdf,4.9\n2,Image Compressor,image,4.8\n3,JSON Formatter,developer,5.0`
  );
  const [csvDelimiter, setCsvDelimiter] = useState<',' | ';' | '\t'>(',');

  // SQL Formatter state
  const [sqlInput, setSqlInput] = useState<string>(
    `select u.id, u.email, count(t.id) as total_tools from users u left join tools t on t.user_id = u.id where u.active = 1 group by u.id, u.email order by total_tools desc limit 10;`
  );

  // Timestamp states
  const [epochInput, setEpochInput] = useState<string>(Math.floor(Date.now() / 1000).toString());

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. JSON FORMATTER ACTION ---
  const formatJson = (minify = false) => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, jsonIndent);
      setJsonInput(formatted);
      onSuccess(minify ? 'Minified JSON payload.' : 'Beautified JSON formatting.');
    } catch (err: any) {
      setError(`JSON Parse Error: ${err.message}`);
    }
  };

  // --- 2. BASE64 CONVERTER ---
  const base64Output = useMemo(() => {
    try {
      if (base64Mode === 'encode') {
        return btoa(unescape(encodeURIComponent(base64Input)));
      } else {
        return decodeURIComponent(escape(atob(base64Input.trim())));
      }
    } catch (e) {
      return 'Invalid Base64 string for decoding.';
    }
  }, [base64Input, base64Mode]);

  // --- 3. URL ENCODER/DECODER ---
  const urlOutput = useMemo(() => {
    try {
      if (urlComponentMode) {
        return encodeURIComponent(urlInput);
      } else {
        return decodeURIComponent(urlInput);
      }
    } catch (e) {
      return 'Malformed URL string.';
    }
  }, [urlInput, urlComponentMode]);

  // --- 4. UUID GENERATOR ---
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidQuantity; i++) {
      let u: string = crypto.randomUUID();
      if (!uuidHyphens) u = u.replace(/-/g, '');
      if (uuidUppercase) u = u.toUpperCase();
      list.push(u);
    }
    setUuidList(list);
    onSuccess(`Generated ${uuidQuantity} UUIDs.`);
  };

  useMemo(() => {
    if (tool.id === 'uuid-generator' && uuidList.length === 0) {
      generateUuids();
    }
  }, [tool.id]);

  // --- 5. REGEX TESTER ---
  const regexResults = useMemo(() => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = Array.from(regexTestString.matchAll(re));
      return {
        valid: true,
        count: matches.length,
        matches: matches.map(m => m[0]),
        error: null
      };
    } catch (e: any) {
      return {
        valid: false,
        count: 0,
        matches: [],
        error: e.message
      };
    }
  }, [regexPattern, regexFlags, regexTestString]);

  // --- 6. CSV TO JSON ---
  const csvToJsonResult = useMemo(() => {
    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length < 2) return '[]';
      const headers = lines[0].split(csvDelimiter).map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(csvDelimiter).map(v => v.trim());
        const obj: Record<string, any> = {};
        headers.forEach((h, i) => {
          const val = values[i] || '';
          obj[h] = !isNaN(Number(val)) && val !== '' ? Number(val) : val;
        });
        return obj;
      });
      return JSON.stringify(rows, null, 2);
    } catch (e) {
      return 'Error parsing CSV.';
    }
  }, [csvInput, csvDelimiter]);

  // --- 7. SQL FORMATTER ---
  const formatSql = () => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE', 'AND', 'OR', 'AS', 'ON', 'DESC', 'ASC', 'COUNT'
    ];
    let sql = sqlInput;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      sql = sql.replace(regex, kw);
    });
    // Add line breaks before major query clauses
    ['FROM', 'WHERE', 'LEFT JOIN', 'GROUP BY', 'ORDER BY', 'LIMIT'].forEach(kw => {
      sql = sql.replace(new RegExp(`\\s+${kw}\\s+`, 'g'), `\n${kw} `);
    });
    setSqlInput(sql);
    onSuccess('Cleaned and standardized SQL syntax.');
  };

  // --- 8. TIMESTAMP CONVERTER ---
  const epochData = useMemo(() => {
    const num = Number(epochInput);
    if (isNaN(num)) return null;
    const ms = num > 1e11 ? num : num * 1000;
    const d = new Date(ms);
    return {
      utc: d.toUTCString(),
      local: d.toLocaleString(),
      iso: d.toISOString(),
      relative: `${Math.round((Date.now() - ms) / 1000 / 60 / 60 / 24)} days ago`
    };
  }, [epochInput]);

  return (
    <div className="space-y-6">
      {/* 1. JSON FORMATTER */}
      {tool.id === 'json-formatter' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Indentation:</span>
              <button
                type="button"
                onClick={() => setJsonIndent(2)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                  jsonIndent === 2 ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                }`}
              >
                2 Spaces
              </button>
              <button
                type="button"
                onClick={() => setJsonIndent(4)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                  jsonIndent === 4 ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                }`}
              >
                4 Spaces
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => formatJson(false)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
              >
                Format / Beautify
              </button>
              <button
                onClick={() => formatJson(true)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
              >
                Minify
              </button>
              <button
                onClick={() => copyToClipboard(jsonInput)}
                className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <textarea
            rows={14}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full font-mono text-xs p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {/* 2. BASE64 CONVERTER */}
      {tool.id === 'base64-encoder' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setBase64Mode('encode')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                base64Mode === 'encode'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
              }`}
            >
              Encode Plain Text → Base64
            </button>
            <button
              onClick={() => setBase64Mode('decode')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                base64Mode === 'decode'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
              }`}
            >
              Decode Base64 → Plain Text
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Input String
            </label>
            <textarea
              rows={5}
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Result Output</span>
              <button
                onClick={() => copyToClipboard(base64Output)}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-100 break-all bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              {base64Output}
            </div>
          </div>
        </div>
      )}

      {/* 3. URL ENCODER/DECODER */}
      {tool.id === 'url-encoder' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setUrlComponentMode(true)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                urlComponentMode
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
              }`}
            >
              Encode URL (Percent-encoding)
            </button>
            <button
              onClick={() => setUrlComponentMode(false)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                !urlComponentMode
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white dark:bg-slate-800 text-slate-600'
              }`}
            >
              Decode URL
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Source URL
            </label>
            <textarea
              rows={4}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Encoded / Decoded URL</span>
              <button
                onClick={() => copyToClipboard(urlOutput)}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-100 break-all bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              {urlOutput}
            </div>
          </div>
        </div>
      )}

      {/* 4. UUID GENERATOR */}
      {tool.id === 'uuid-generator' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Quantity:</span>
              <input
                type="number"
                min="1"
                max="100"
                value={uuidQuantity}
                onChange={(e) => setUuidQuantity(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-16 px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded-lg text-center"
              />
            </div>

            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uuidUppercase}
                onChange={(e) => setUuidUppercase(e.target.checked)}
                className="text-indigo-600 rounded"
              />
              UPPERCASE
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uuidHyphens}
                onChange={(e) => setUuidHyphens(e.target.checked)}
                className="text-indigo-600 rounded"
              />
              Include Hyphens
            </label>

            <button
              onClick={generateUuids}
              className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Generate UUIDs
            </button>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Generated UUID v4 Identifiers</span>
              <button
                onClick={() => copyToClipboard(uuidList.join('\n'))}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy All
              </button>
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-xs text-slate-800 dark:text-slate-200 divide-y divide-slate-100 dark:divide-slate-800">
              {uuidList.map((u, i) => (
                <div key={i} className="py-1.5 flex items-center justify-between">
                  <span>{u}</span>
                  <button
                    onClick={() => copyToClipboard(u)}
                    className="text-slate-400 hover:text-indigo-600 p-1"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. REGEX TESTER */}
      {tool.id === 'regex-tester' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Regular Expression Pattern
              </label>
              <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 px-3 py-2">
                <span className="text-slate-400 font-mono mr-1">/</span>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="flex-1 font-mono text-xs bg-transparent focus:outline-none text-slate-800 dark:text-slate-100"
                />
                <span className="text-slate-400 font-mono ml-1">/</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Flags
              </label>
              <input
                type="text"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                placeholder="g, i, m"
                className="w-full px-3 py-2 font-mono text-xs border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Test String
            </label>
            <textarea
              rows={5}
              value={regexTestString}
              onChange={(e) => setRegexTestString(e.target.value)}
              className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Regex evaluation status */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Matches Found: <strong className="text-indigo-600">{regexResults.count}</strong>
              </span>
              {regexResults.error && (
                <span className="text-xs text-rose-500 font-mono">{regexResults.error}</span>
              )}
            </div>

            {regexResults.matches.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {regexResults.matches.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-md font-mono text-xs border border-emerald-300 dark:border-emerald-800"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. CSV TO JSON / JSON TO CSV */}
      {(tool.id === 'csv-to-json' || tool.id === 'json-to-csv') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {tool.id === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Delimiter:</span>
              <button
                type="button"
                onClick={() => setCsvDelimiter(',')}
                className={`px-2 py-0.5 text-xs rounded border ${csvDelimiter === ',' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}
              >
                Comma (,)
              </button>
              <button
                type="button"
                onClick={() => setCsvDelimiter(';')}
                className={`px-2 py-0.5 text-xs rounded border ${csvDelimiter === ';' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}
              >
                Semicolon (;)
              </button>
              <button
                type="button"
                onClick={() => setCsvDelimiter('\t')}
                className={`px-2 py-0.5 text-xs rounded border ${csvDelimiter === '\t' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}
              >
                Tab (\t)
              </button>
            </div>
          </div>

          <textarea
            rows={6}
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Parsed JSON Output</span>
              <button
                onClick={() => copyToClipboard(csvToJsonResult)}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy JSON
              </button>
            </div>
            <pre className="font-mono text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto max-h-60">
              {csvToJsonResult}
            </pre>
          </div>
        </div>
      )}

      {/* 7. SQL FORMATTER */}
      {tool.id === 'sql-formatter' && (
        <div className="space-y-4">
          <textarea
            rows={8}
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
          />
          <div className="flex gap-3">
            <button
              onClick={formatSql}
              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
            >
              Format & Capitalize SQL
            </button>
            <button
              onClick={() => copyToClipboard(sqlInput)}
              className="py-2.5 px-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy SQL
            </button>
          </div>
        </div>
      )}

      {/* 8. TIMESTAMP CONVERTER */}
      {tool.id === 'timestamp-converter' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Unix Timestamp (Seconds or Milliseconds)
              </label>
              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl font-mono text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <button
              type="button"
              onClick={() => setEpochInput(Math.floor(Date.now() / 1000).toString())}
              className="self-end px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-semibold"
            >
              Set Current Time
            </button>
          </div>

          {epochData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block mb-0.5">GMT / UTC Date</span>
                <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {epochData.utc}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block mb-0.5">Local Timezone</span>
                <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {epochData.local}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block mb-0.5">ISO 8601</span>
                <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {epochData.iso}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block mb-0.5">Relative</span>
                <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {epochData.relative}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
