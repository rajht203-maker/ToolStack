import React, { useState, useEffect, useMemo } from 'react';
import { ToolItem } from '../../types';
import {
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  Terminal,
  Activity,
  Monitor,
  Hash,
  Compass,
  Percent,
  Layers,
  FileText,
  Volume2
} from 'lucide-react';

interface PublicUtilityToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const PublicUtilityTools: React.FC<PublicUtilityToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ----------------------------------------------------
  // 1. Lorem Markdown Generator
  // ----------------------------------------------------
  const [includeHeadings, setIncludeHeadings] = useState(true);
  const [includeLists, setIncludeLists] = useState(true);
  const [includeCode, setIncludeCode] = useState(true);
  const [includeTable, setIncludeTable] = useState(true);

  const loremMarkdown = useMemo(() => {
    let out = '# Project Documentation Title\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\n';
    if (includeHeadings) {
      out += '## Architecture Overview\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.\n\n### Core System Specifications\n\nCurabitur pretium tincidunt lacus. Nulla gravida orci a odio.\n\n';
    }
    if (includeLists) {
      out += '## Key Objectives\n\n- [x] Initial infrastructure provisioning\n- [x] High-performance edge cache validation\n- [ ] Multi-region automated database failover\n- [ ] Zero-trust authorization token exchange\n\n';
    }
    if (includeCode) {
      out += '## Quick Start Installation\n\n```bash\nnpm install @toolstack/core\nnpm run dev:preview\n```\n\n```typescript\nimport { createClient } from "@toolstack/core";\n\nconst client = createClient({ endpoint: "https://api.toolstack.io" });\nconst status = await client.ping();\nconsole.log("System Status:", status.ok);\n```\n\n';
    }
    if (includeTable) {
      out += '## Performance Metrics Comparison\n\n| Cluster Node | P50 Latency | P99 Latency | Error Budget |\n| :--- | :--- | :--- | :--- |\n| US-East (Primary) | 12ms | 45ms | 99.995% |\n| EU-Central (Replica) | 18ms | 54ms | 99.990% |\n| AP-East (Edge) | 24ms | 68ms | 99.985% |\n\n';
    }
    return out;
  }, [includeHeadings, includeLists, includeCode, includeTable]);

  // ----------------------------------------------------
  // 2. Character Frequency Analyzer
  // ----------------------------------------------------
  const [charInput, setCharInput] = useState('Build fast, responsive, and secure modern web applications with ToolStack.');

  const charAnalysis = useMemo(() => {
    const letters = charInput.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const totalChars = charInput.length;
    const totalLetters = letters.length;
    const vowels = (letters.match(/[aeiou]/g) || []).length;
    const consonants = totalLetters - vowels;

    const freqMap: Record<string, number> = {};
    for (const char of letters) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const sorted = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { totalChars, totalLetters, vowels, consonants, sorted };
  }, [charInput]);

  // ----------------------------------------------------
  // 3. SQL Query Beautifier Pro
  // ----------------------------------------------------
  const [sqlRaw, setSqlRaw] = useState("select u.id, u.email, count(o.id) as total_orders from users u left join orders o on u.id = o.user_id where u.active = true and u.created_at > '2025-01-01' group by u.id, u.email order by total_orders desc limit 50;");

  const formattedSql = useMemo(() => {
    const keywords = [
      'SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'WHERE',
      'AND', 'OR', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE'
    ];

    let query = sqlRaw.trim();
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      query = query.replace(regex, kw);
    });

    const splitWords = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'WHERE', 'GROUP BY', 'ORDER BY', 'LIMIT'];
    let formatted = query;
    splitWords.forEach(kw => {
      const re = new RegExp(`\\s+(${kw})\\s+`, 'g');
      formatted = formatted.replace(re, '\n$1 ');
    });

    return formatted;
  }, [sqlRaw]);

  // ----------------------------------------------------
  // 4. Case Converter Pro
  // ----------------------------------------------------
  const [caseInput, setCaseInput] = useState('full stack web application development');

  const caseVariants: Record<string, string> = useMemo(() => {
    const words = caseInput.trim().split(/[\s_\-]+/).filter(Boolean);
    if (!words.length) return {};

    const lowerWords = words.map(w => w.toLowerCase());
    const capitalized = lowerWords.map(w => w.charAt(0).toUpperCase() + w.slice(1));

    const camelCase = lowerWords[0] + capitalized.slice(1).join('');
    const pascalCase = capitalized.join('');
    const snakeCase = lowerWords.join('_');
    const constantCase = lowerWords.join('_').toUpperCase();
    const kebabCase = lowerWords.join('-');
    const dotCase = lowerWords.join('.');
    const titleCase = capitalized.join(' ');
    const sentenceCase = lowerWords.join(' ').replace(/^./, c => c.toUpperCase());

    return {
      camelCase,
      PascalCase: pascalCase,
      snake_case: snakeCase,
      CONSTANT_CASE: constantCase,
      'kebab-case': kebabCase,
      'dot.case': dotCase,
      'Title Case': titleCase,
      'Sentence case': sentenceCase
    };
  }, [caseInput]);

  // ----------------------------------------------------
  // 5. Screen Resolution Detector
  // ----------------------------------------------------
  const [screenInfo, setScreenInfo] = useState({
    availWidth: typeof window !== 'undefined' ? window.screen.availWidth : 1920,
    availHeight: typeof window !== 'undefined' ? window.screen.availHeight : 1080,
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    colorDepth: typeof window !== 'undefined' ? window.screen.colorDepth : 24,
    touch: typeof navigator !== 'undefined' ? (navigator.maxTouchPoints > 0) : false
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenInfo({
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        dpr: window.devicePixelRatio,
        colorDepth: window.screen.colorDepth,
        touch: navigator.maxTouchPoints > 0
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----------------------------------------------------
  // 6. Word Scrambler & Anagram Generator
  // ----------------------------------------------------
  const [scrambleInput, setScrambleInput] = useState('algorithm');
  const [scrambleNonce, setScrambleNonce] = useState(0);

  const scrambledResults = useMemo(() => {
    const words = scrambleInput.trim().split(/\s+/);
    const scrambleWord = (w: string) => {
      if (w.length <= 2) return w;
      const arr = w.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    };

    const scrambledWordByWord = words.map(scrambleWord).join(' ');
    const allLetters = scrambleInput.replace(/\s+/g, '').split('');
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }
    const fullAnagram = allLetters.join('');
    const reversed = scrambleInput.split('').reverse().join('');

    return { scrambledWordByWord, fullAnagram, reversed };
  }, [scrambleInput, scrambleNonce]);

  // ----------------------------------------------------
  // 7. IPv4 CIDR Calculator
  // ----------------------------------------------------
  const [cidrIp, setCidrIp] = useState('192.168.1.50');
  const [cidrBits, setCidrBits] = useState(24);

  const cidrStats = useMemo(() => {
    const parts = cidrIp.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return null;
    }

    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const mask = cidrBits === 0 ? 0 : (~0 << (32 - cidrBits));
    const networkNum = ipNum & mask;
    const broadcastNum = networkNum | (~mask >>> 0);

    const toIpStr = (num: number) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');

    const networkIp = toIpStr(networkNum);
    const broadcastIp = toIpStr(broadcastNum);
    const subnetMask = toIpStr(mask);
    const wildcardMask = toIpStr(~mask >>> 0);
    const totalHosts = Math.pow(2, 32 - cidrBits);
    const usableHosts = cidrBits >= 31 ? 0 : totalHosts - 2;
    const firstUsable = cidrBits >= 31 ? 'N/A' : toIpStr(networkNum + 1);
    const lastUsable = cidrBits >= 31 ? 'N/A' : toIpStr(broadcastNum - 1);

    return {
      networkIp,
      broadcastIp,
      subnetMask,
      wildcardMask,
      totalHosts,
      usableHosts,
      firstUsable,
      lastUsable
    };
  }, [cidrIp, cidrBits]);

  // ----------------------------------------------------
  // 8. Roman Numeral Converter
  // ----------------------------------------------------
  const [romanArabicInput, setRomanArabicInput] = useState('2026');
  const [romanTextResult, setRomanTextResult] = useState('MMXXVI');

  const arabicToRoman = (num: number) => {
    if (isNaN(num) || num < 1 || num > 3999) return 'Please enter 1 - 3999';
    const romanMap: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [val, str] of romanMap) {
      while (num >= val) {
        result += str;
        num -= val;
      }
    }
    return result;
  };

  const romanToArabic = (str: string) => {
    const romanVal: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    const upper = str.toUpperCase().trim();
    let sum = 0;
    for (let i = 0; i < upper.length; i++) {
      const cur = romanVal[upper[i]] || 0;
      const next = romanVal[upper[i + 1]] || 0;
      if (cur < next) {
        sum -= cur;
      } else {
        sum += cur;
      }
    }
    return sum > 0 && sum <= 3999 ? sum.toString() : 'Invalid Roman Numeral';
  };

  const handleArabicChange = (val: string) => {
    setRomanArabicInput(val);
    const num = parseInt(val, 10);
    setRomanTextResult(arabicToRoman(num));
  };

  const handleRomanChange = (val: string) => {
    setRomanTextResult(val.toUpperCase());
    setRomanArabicInput(romanToArabic(val));
  };

  // ----------------------------------------------------
  // 9. CSS Cursor Previewer
  // ----------------------------------------------------
  const [activeCursor, setActiveCursor] = useState('pointer');
  const cursorList = [
    'default', 'pointer', 'crosshair', 'move', 'text', 'wait',
    'help', 'not-allowed', 'grab', 'grabbing', 'zoom-in', 'zoom-out',
    'col-resize', 'row-resize', 'all-scroll', 'progress', 'no-drop'
  ];

  // ----------------------------------------------------
  // 10. Percentage Change Calculator
  // ----------------------------------------------------
  const [pctInitial, setPctInitial] = useState(120);
  const [pctFinal, setPctFinal] = useState(180);

  const pctStats = useMemo(() => {
    if (pctInitial === 0) return { diff: 0, pct: 0, direction: 'neutral' };
    const diff = pctFinal - pctInitial;
    const pct = (diff / pctInitial) * 100;
    return {
      diff,
      pct: Math.round(pct * 100) / 100,
      direction: diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'neutral'
    };
  }, [pctInitial, pctFinal]);

  // ----------------------------------------------------
  // 11. Hex, RGB & HSL Color Mixer
  // ----------------------------------------------------
  const [rgbR, setRgbR] = useState(79);
  const [rgbG, setRgbG] = useState(70);
  const [rgbB, setRgbB] = useState(229);
  const [rgbAlpha, setRgbAlpha] = useState(1);

  const colorOutputs = useMemo(() => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    const hex = `#${toHex(rgbR)}${toHex(rgbG)}${toHex(rgbB)}`;
    const rgba = `rgba(${rgbR}, ${rgbG}, ${rgbB}, ${rgbAlpha})`;

    const r = rgbR / 255;
    const g = rgbG / 255;
    const b = rgbB / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    return { hex, rgba, hsl };
  }, [rgbR, rgbG, rgbB, rgbAlpha]);

  // ----------------------------------------------------
  // 12. Emoji Search & Copy
  // ----------------------------------------------------
  const [emojiQuery, setEmojiQuery] = useState('');
  const emojiCatalog = [
    { emoji: '🚀', tags: 'rocket launch fast speed deployment tech' },
    { emoji: '⚡', tags: 'lightning fast thunder power quick zap' },
    { emoji: '🔥', tags: 'fire hot trending flame streak lit' },
    { emoji: '✨', tags: 'sparkles magic shiny new star clean' },
    { emoji: '🔒', tags: 'lock security key private auth safe' },
    { emoji: '🛠️', tags: 'tools settings developer repair build code' },
    { emoji: '📊', tags: 'chart analytics graph data report stats' },
    { emoji: '💡', tags: 'bulb idea light tip innovation think' },
    { emoji: '🎯', tags: 'target goal focus precision direct' },
    { emoji: '📦', tags: 'package ship box release bundle' },
    { emoji: '🎨', tags: 'art palette design style color' },
    { emoji: '🌐', tags: 'globe web internet network world' },
    { emoji: '💎', tags: 'diamond gem premium crystal value' },
    { emoji: '✅', tags: 'check verified complete success done' },
    { emoji: '🎉', tags: 'celebrate party success tada celebrate' },
    { emoji: '🧠', tags: 'brain smart ai intelligence thinking' }
  ];

  const filteredEmojis = emojiCatalog.filter(e =>
    e.tags.toLowerCase().includes(emojiQuery.toLowerCase()) || e.emoji.includes(emojiQuery)
  );

  // ----------------------------------------------------
  // 13. Base64 Image Previewer
  // ----------------------------------------------------
  const [base64Uri, setBase64Uri] = useState('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZjQ2ZTUiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01ek0yIDE3bDEwIDUgMTAtNSBNMiAxMmwxMCA1IDEwLTUiLz48L3N2Zz4=');

  // ----------------------------------------------------
  // 14. HTML Table to Markdown Converter
  // ----------------------------------------------------
  const [htmlTableInput, setHtmlTableInput] = useState(`<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Public Tier</th>
      <th>Member Tier</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tools Included</td>
      <td>95+ Utilities</td>
      <td>140+ Complete Suite</td>
    </tr>
    <tr>
      <td>Cloud Sync</td>
      <td>Local Storage</td>
      <td>Automated Firestore</td>
    </tr>
    <tr>
      <td>Export PDF / SVG</td>
      <td>Standard</td>
      <td>High-Res Vector</td>
    </tr>
  </tbody>
</table>`);

  const convertedMarkdownTable = useMemo(() => {
    try {
      const headers: string[] = [];
      const thRegex = /<th[^>]*>(.*?)<\/th>/gis;
      let match;
      while ((match = thRegex.exec(htmlTableInput)) !== null) {
        headers.push(match[1].replace(/<[^>]+>/g, '').trim());
      }

      const rows: string[][] = [];
      const trRegex = /<tr[^>]*>(.*?)<\/tr>/gis;
      let trMatch;
      while ((trMatch = trRegex.exec(htmlTableInput)) !== null) {
        const rowContent = trMatch[1];
        const tdRegex = /<td[^>]*>(.*?)<\/td>/gis;
        const cellRow: string[] = [];
        let tdMatch;
        while ((tdMatch = tdRegex.exec(rowContent)) !== null) {
          cellRow.push(tdMatch[1].replace(/<[^>]+>/g, '').trim());
        }
        if (cellRow.length > 0) {
          rows.push(cellRow);
        }
      }

      if (headers.length === 0 && rows.length > 0) {
        headers.push(...rows[0]);
        rows.shift();
      }

      if (headers.length === 0) return 'Invalid HTML table structure. Please include <th> or <td> elements.';

      const headerLine = `| ${headers.join(' | ')} |`;
      const dividerLine = `| ${headers.map(() => '---').join(' | ')} |`;
      const rowLines = rows.map(r => `| ${r.join(' | ')} |`).join('\n');

      return `${headerLine}\n${dividerLine}\n${rowLines}`;
    } catch (e) {
      return 'Could not parse HTML table.';
    }
  }, [htmlTableInput]);

  // ----------------------------------------------------
  // 15. Meta Viewport Tag Generator
  // ----------------------------------------------------
  const [vpWidth, setVpWidth] = useState('device-width');
  const [vpScale, setVpScale] = useState('1.0');
  const [vpUserScalable, setVpUserScalable] = useState(true);
  const [vpCover, setVpCover] = useState(true);

  const generatedViewportTag = useMemo(() => {
    let content = `width=${vpWidth}, initial-scale=${vpScale}`;
    if (!vpUserScalable) content += ', user-scalable=no, maximum-scale=1.0';
    if (vpCover) content += ', viewport-fit=cover';
    return `<meta name="viewport" content="${content}" />`;
  }, [vpWidth, vpScale, vpUserScalable, vpCover]);

  // ----------------------------------------------------
  // 16. Morse Code Audio Synthesizer
  // ----------------------------------------------------
  const [morseTextInput, setMorseTextInput] = useState('SOS TOOLSTACK');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const morseDict: Record<string, string> = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const encodedMorse = useMemo(() => {
    return morseTextInput
      .toUpperCase()
      .split('')
      .map(ch => morseDict[ch] || '')
      .filter(Boolean)
      .join(' ');
  }, [morseTextInput]);

  const playMorseTone = async () => {
    if (isPlayingAudio || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      setIsPlayingAudio(true);

      const dotDuration = 0.08;
      let time = ctx.currentTime + 0.05;

      for (const char of encodedMorse) {
        if (char === '.' || char === '-') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = 650;

          const duration = char === '.' ? dotDuration : dotDuration * 3;
          gain.gain.setValueAtTime(0.3, time);
          gain.gain.setValueAtTime(0, time + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + duration);

          time += duration + dotDuration;
        } else if (char === ' ') {
          time += dotDuration * 2;
        } else if (char === '/') {
          time += dotDuration * 5;
        }
      }

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, (time - ctx.currentTime) * 1000);
    } catch (e) {
      setIsPlayingAudio(false);
    }
  };

  // ----------------------------------------------------
  // 17. Unix chmod Permissions Calculator
  // ----------------------------------------------------
  const [chmodMatrix, setChmodMatrix] = useState({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    others: { r: true, w: false, x: true }
  });

  const chmodStats = useMemo(() => {
    const calcVal = (perm: { r: boolean; w: boolean; x: boolean }) =>
      (perm.r ? 4 : 0) + (perm.w ? 2 : 0) + (perm.x ? 1 : 0);

    const oVal = calcVal(chmodMatrix.owner);
    const gVal = calcVal(chmodMatrix.group);
    const othVal = calcVal(chmodMatrix.others);
    const octal = `${oVal}${gVal}${othVal}`;

    const toSym = (perm: { r: boolean; w: boolean; x: boolean }) =>
      (perm.r ? 'r' : '-') + (perm.w ? 'w' : '-') + (perm.x ? 'x' : '-');

    const symbolic = `-${toSym(chmodMatrix.owner)}${toSym(chmodMatrix.group)}${toSym(chmodMatrix.others)}`;

    return { octal, symbolic, command: `chmod ${octal} <file>` };
  }, [chmodMatrix]);

  const toggleChmod = (groupKey: 'owner' | 'group' | 'others', permKey: 'r' | 'w' | 'x') => {
    setChmodMatrix(prev => ({
      ...prev,
      [groupKey]: {
        ...prev[groupKey],
        [permKey]: !prev[groupKey][permKey]
      }
    }));
  };

  // ----------------------------------------------------
  // 18. CSS Triangle Generator
  // ----------------------------------------------------
  const [triDirection, setTriDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [triSize, setTriSize] = useState(24);
  const [triColor, setTriColor] = useState('#4f46e5');

  const cssTriangleSnippet = useMemo(() => {
    const w = triSize;
    const h = triSize;
    let borders = '';
    switch (triDirection) {
      case 'top':
        borders = `border-left: ${w}px solid transparent;\nborder-right: ${w}px solid transparent;\nborder-bottom: ${h}px solid ${triColor};`;
        break;
      case 'bottom':
        borders = `border-left: ${w}px solid transparent;\nborder-right: ${w}px solid transparent;\nborder-top: ${h}px solid ${triColor};`;
        break;
      case 'left':
        borders = `border-top: ${h}px solid transparent;\nborder-bottom: ${h}px solid transparent;\nborder-right: ${w}px solid ${triColor};`;
        break;
      case 'right':
        borders = `border-top: ${h}px solid transparent;\nborder-bottom: ${h}px solid transparent;\nborder-left: ${w}px solid ${triColor};`;
        break;
    }
    return `width: 0;\nheight: 0;\n${borders}`;
  }, [triDirection, triSize, triColor]);

  // ----------------------------------------------------
  // 19. Speed, Distance & Time Calculator
  // ----------------------------------------------------
  const [sdtMode, setSdtMode] = useState<'speed' | 'distance' | 'time'>('speed');
  const [sdtSpeed, setSdtSpeed] = useState(65);
  const [sdtDistance, setSdtDistance] = useState(260);
  const [sdtTime, setSdtTime] = useState(4);

  const sdtResult = useMemo(() => {
    if (sdtMode === 'speed') {
      const val = sdtTime > 0 ? Math.round((sdtDistance / sdtTime) * 10) / 10 : 0;
      return { val: `${val} mph (or km/h)`, formula: 'Speed = Distance ÷ Time' };
    } else if (sdtMode === 'distance') {
      const val = Math.round(sdtSpeed * sdtTime * 10) / 10;
      return { val: `${val} miles (or km)`, formula: 'Distance = Speed × Time' };
    } else {
      const val = sdtSpeed > 0 ? Math.round((sdtDistance / sdtSpeed) * 100) / 100 : 0;
      return { val: `${val} hours`, formula: 'Time = Distance ÷ Speed' };
    }
  }, [sdtMode, sdtSpeed, sdtDistance, sdtTime]);

  // ----------------------------------------------------
  // 20. List Sorter & Deduplicator
  // ----------------------------------------------------
  const [listInput, setListInput] = useState('apple\nbanana\norange\napple\ngrape\nbanana\nwatermelon\npeach');
  const [listRemoveDupes, setListRemoveDupes] = useState(true);
  const [listSortMode, setListSortMode] = useState<'asc' | 'desc' | 'length' | 'none'>('asc');

  const cleanedList = useMemo(() => {
    let items = listInput.split('\n').map(s => s.trim()).filter(Boolean);
    if (listRemoveDupes) {
      items = Array.from(new Set(items));
    }
    if (listSortMode === 'asc') {
      items.sort((a, b) => a.localeCompare(b));
    } else if (listSortMode === 'desc') {
      items.sort((a, b) => b.localeCompare(a));
    } else if (listSortMode === 'length') {
      items.sort((a, b) => a.length - b.length);
    }
    return items.join('\n');
  }, [listInput, listRemoveDupes, listSortMode]);

  return (
    <div className="space-y-6">
      {/* 1. LOREM MARKDOWN */}
      {tool.id === 'lorem-markdown-generator' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-900 border rounded-2xl">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={includeHeadings} onChange={e => setIncludeHeadings(e.target.checked)} className="rounded text-indigo-600" />
              Headings
            </label>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={includeLists} onChange={e => setIncludeLists(e.target.checked)} className="rounded text-indigo-600" />
              Task Lists
            </label>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={includeCode} onChange={e => setIncludeCode(e.target.checked)} className="rounded text-indigo-600" />
              Code Blocks
            </label>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={includeTable} onChange={e => setIncludeTable(e.target.checked)} className="rounded text-indigo-600" />
              GFM Tables
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Formatted Markdown Output</span>
              <button
                onClick={() => copyToClipboard(loremMarkdown, 'lorem-md')}
                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                {copied === 'lorem-md' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy Markdown
              </button>
            </div>
            <textarea
              readOnly
              value={loremMarkdown}
              rows={12}
              className="w-full p-4 border rounded-2xl font-mono text-xs bg-white dark:bg-slate-950 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* 2. CHARACTER FREQUENCY */}
      {tool.id === 'character-frequency-analyzer' && (
        <div className="space-y-4">
          <textarea
            value={charInput}
            onChange={e => setCharInput(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-xl text-xs"
            placeholder="Type or paste text..."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Chars</div>
              <div className="text-xl font-black text-slate-900 dark:text-white">{charAnalysis.totalChars}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Letters</div>
              <div className="text-xl font-black text-indigo-600">{charAnalysis.totalLetters}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Vowels</div>
              <div className="text-xl font-black text-emerald-600">{charAnalysis.vowels}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Consonants</div>
              <div className="text-xl font-black text-amber-600">{charAnalysis.consonants}</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="text-xs font-bold uppercase text-slate-500">Top Letter Frequencies</div>
            <div className="flex flex-wrap gap-2">
              {charAnalysis.sorted.map(([char, count]) => (
                <div key={char} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border flex items-center gap-2 text-xs font-mono">
                  <span className="font-black text-indigo-600">{char.toUpperCase()}</span>
                  <span className="text-slate-500 font-bold">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SQL FORMATTER PRO */}
      {tool.id === 'sql-formatter-pro' && (
        <div className="space-y-4">
          <textarea
            value={sqlRaw}
            onChange={e => setSqlRaw(e.target.value)}
            rows={5}
            className="w-full p-3 border rounded-xl font-mono text-xs"
            placeholder="Paste raw SQL query..."
          />
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl relative shadow-inner">
            <button
              onClick={() => copyToClipboard(formattedSql, 'sql-copy')}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              {copied === 'sql-copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="whitespace-pre-wrap leading-relaxed">{formattedSql}</pre>
          </div>
        </div>
      )}

      {/* 4. CASE CONVERTER PRO */}
      {tool.id === 'case-converter-pro' && (
        <div className="space-y-4">
          <input
            type="text"
            value={caseInput}
            onChange={e => setCaseInput(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl font-semibold text-sm"
            placeholder="Enter text..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(caseVariants).map(([style, val]) => (
              <div key={style} className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">{style}</div>
                  <div className="font-mono text-xs font-bold text-slate-900 dark:text-white break-all">{val}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(val, style)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {copied === style ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SCREEN RESOLUTION DETECTOR */}
      {tool.id === 'screen-resolution-detector' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-indigo-600">Active Viewport</div>
              <div className="text-xl font-black text-indigo-700 dark:text-indigo-300 font-mono">
                {screenInfo.innerWidth} × {screenInfo.innerHeight}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Monitor Hardware</div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                {screenInfo.availWidth} × {screenInfo.availHeight}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Pixel Ratio (DPR)</div>
              <div className="text-xl font-black text-emerald-600 font-mono">
                {screenInfo.dpr}x
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Color Depth</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-200 font-mono">
                {screenInfo.colorDepth}-bit
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Touch Support</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-200">
                {screenInfo.touch ? 'Supported' : 'No Touch'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. WORD SCRAMBLER */}
      {tool.id === 'word-scrambler-anagram' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={scrambleInput}
              onChange={e => setScrambleInput(e.target.value)}
              className="flex-1 px-4 py-2.5 border rounded-xl font-medium text-sm"
              placeholder="Enter word or phrase..."
            />
            <button
              onClick={() => setScrambleNonce(n => n + 1)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-Shuffle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Word-by-Word Scramble</div>
              <div className="text-base font-bold font-mono text-indigo-600 break-all">{scrambledResults.scrambledWordByWord}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Complete Anagram</div>
              <div className="text-base font-bold font-mono text-emerald-600 break-all">{scrambledResults.fullAnagram}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl">
              <div className="text-[10px] uppercase font-bold text-slate-400">Reversed String</div>
              <div className="text-base font-bold font-mono text-slate-800 dark:text-slate-200 break-all">{scrambledResults.reversed}</div>
            </div>
          </div>
        </div>
      )}

      {/* 7. IPV4 CIDR CALCULATOR */}
      {tool.id === 'ipv4-cidr-calculator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-4 border rounded-2xl">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">IPv4 Address</label>
              <input
                type="text"
                value={cidrIp}
                onChange={e => setCidrIp(e.target.value)}
                className="w-full p-2.5 border rounded-xl font-mono text-xs font-bold"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>CIDR Prefix Length</span>
                <span className="text-indigo-600">/{cidrBits}</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                value={cidrBits}
                onChange={e => setCidrBits(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {cidrStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Network ID</div>
                <div className="font-mono text-xs font-bold text-indigo-600">{cidrStats.networkIp}</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Broadcast IP</div>
                <div className="font-mono text-xs font-bold text-rose-600">{cidrStats.broadcastIp}</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Subnet Mask</div>
                <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">{cidrStats.subnetMask}</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl">
                <div className="text-[10px] uppercase font-bold text-slate-400">Usable Hosts</div>
                <div className="font-mono text-xs font-bold text-emerald-600">{cidrStats.usableHosts.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl col-span-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">First Usable Host</div>
                <div className="font-mono text-xs font-bold">{cidrStats.firstUsable}</div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 border rounded-2xl col-span-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Last Usable Host</div>
                <div className="font-mono text-xs font-bold">{cidrStats.lastUsable}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. ROMAN NUMERAL CONVERTER */}
      {tool.id === 'roman-numeral-converter' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400">Arabic Decimal (1 - 3999)</label>
              <input
                type="number"
                min="1"
                max="3999"
                value={romanArabicInput}
                onChange={e => handleArabicChange(e.target.value)}
                className="w-full p-3 border rounded-xl font-bold text-lg font-mono"
              />
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400">Roman Numeral</label>
              <input
                type="text"
                value={romanTextResult}
                onChange={e => handleRomanChange(e.target.value)}
                className="w-full p-3 border rounded-xl font-bold text-lg font-mono text-indigo-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. CSS CURSOR PREVIEWER */}
      {tool.id === 'css-cursor-previewer' && (
        <div className="space-y-4">
          <div className="p-6 bg-slate-100 dark:bg-slate-900 border rounded-2xl text-center space-y-2" style={{ cursor: activeCursor }}>
            <div className="text-xs font-bold uppercase text-slate-400">Live Active Hover Box</div>
            <div className="text-xl font-black text-slate-900 dark:text-white">cursor: {activeCursor};</div>
            <p className="text-xs text-slate-500">Move your cursor across this container to test pointer feedback.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {cursorList.map(c => (
              <button
                key={c}
                onClick={() => setActiveCursor(c)}
                style={{ cursor: c }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition ${activeCursor === c ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-600' : 'bg-white dark:bg-slate-900 hover:border-slate-300'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 10. PERCENTAGE CHANGE */}
      {tool.id === 'percentage-change-calculator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Initial Value</label>
              <input
                type="number"
                value={pctInitial}
                onChange={e => setPctInitial(Number(e.target.value))}
                className="w-full p-2.5 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Final Value</label>
              <input
                type="number"
                value={pctFinal}
                onChange={e => setPctFinal(Number(e.target.value))}
                className="w-full p-2.5 border rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Percentage Change</div>
              <div className={`text-2xl font-black ${pctStats.pct > 0 ? 'text-emerald-600' : pctStats.pct < 0 ? 'text-rose-600' : 'text-slate-600'}`}>
                {pctStats.pct > 0 ? `+${pctStats.pct}%` : `${pctStats.pct}%`}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Absolute Difference</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {pctStats.diff > 0 ? `+${pctStats.diff}` : pctStats.diff}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. COLOR MIXER */}
      {tool.id === 'hex-rgb-hsl-picker' && (
        <div className="space-y-4">
          <div className="flex gap-4 items-center p-4 bg-white dark:bg-slate-900 border rounded-2xl">
            <div className="w-20 h-20 rounded-2xl border shadow-inner shrink-0" style={{ backgroundColor: colorOutputs.rgba }} />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono font-bold">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border">HEX: {colorOutputs.hex}</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border">RGB: {colorOutputs.rgba}</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border">HSL: {colorOutputs.hsl}</div>
            </div>
          </div>

          <div className="space-y-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-500">Red: {rgbR}</span>
              </div>
              <input type="range" min="0" max="255" value={rgbR} onChange={e => setRgbR(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-500">Green: {rgbG}</span>
              </div>
              <input type="range" min="0" max="255" value={rgbG} onChange={e => setRgbG(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-500">Blue: {rgbB}</span>
              </div>
              <input type="range" min="0" max="255" value={rgbB} onChange={e => setRgbB(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>
      )}

      {/* 12. EMOJI PICKER */}
      {tool.id === 'emoji-picker-search' && (
        <div className="space-y-4">
          <input
            type="text"
            value={emojiQuery}
            onChange={e => setEmojiQuery(e.target.value)}
            placeholder="Search emojis by keywords (fire, rocket, security, chart)..."
            className="w-full px-4 py-2.5 border rounded-xl text-xs font-medium"
          />

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {filteredEmojis.map(item => (
              <button
                key={item.emoji}
                onClick={() => copyToClipboard(item.emoji, item.emoji)}
                className="p-3 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 border rounded-2xl text-2xl flex items-center justify-center transition hover:scale-110 active:scale-95"
                title={item.tags}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 13. BASE64 IMAGE PREVIEWER */}
      {tool.id === 'base64-image-previewer' && (
        <div className="space-y-4">
          <textarea
            value={base64Uri}
            onChange={e => setBase64Uri(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded-xl font-mono text-xs"
            placeholder="data:image/png;base64,..."
          />

          <div className="p-6 bg-slate-50 dark:bg-slate-900 border rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="text-xs font-bold uppercase text-slate-400">Decoded Image Render</div>
            <img src={base64Uri} alt="Decoded preview" className="max-h-48 rounded-xl border shadow-sm object-contain" />
          </div>
        </div>
      )}

      {/* 14. HTML TABLE TO MARKDOWN */}
      {tool.id === 'html-table-to-markdown' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea
              value={htmlTableInput}
              onChange={e => setHtmlTableInput(e.target.value)}
              rows={10}
              className="w-full p-3 border rounded-xl font-mono text-xs"
              placeholder="<table>...</table>"
            />
            <div className="relative">
              <button
                onClick={() => copyToClipboard(convertedMarkdownTable, 'gfm-table')}
                className="absolute top-2 right-2 text-xs text-indigo-600 font-bold hover:underline"
              >
                {copied === 'gfm-table' ? 'Copied' : 'Copy Table'}
              </button>
              <textarea
                readOnly
                value={convertedMarkdownTable}
                rows={10}
                className="w-full p-3 border bg-slate-50 dark:bg-slate-900 rounded-xl font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* 15. META VIEWPORT GENERATOR */}
      {tool.id === 'meta-viewport-tag-generator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={vpUserScalable} onChange={e => setVpUserScalable(e.target.checked)} className="rounded text-indigo-600" />
              Allow User Zoom / Scalability
            </label>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={vpCover} onChange={e => setVpCover(e.target.checked)} className="rounded text-indigo-600" />
              Cover Notch Displays (viewport-fit=cover)
            </label>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Generated HTML Tag</span>
              <button
                onClick={() => copyToClipboard(generatedViewportTag, 'vp-copy')}
                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                {copied === 'vp-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy Tag
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-slate-950 border rounded-xl font-mono text-xs break-all text-indigo-600 dark:text-indigo-400 font-bold">
              {generatedViewportTag}
            </div>
          </div>
        </div>
      )}

      {/* 16. MORSE CODE AUDIO SYNTHESIZER */}
      {tool.id === 'text-morse-audio-player' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={morseTextInput}
              onChange={e => setMorseTextInput(e.target.value)}
              className="flex-1 px-4 py-2.5 border rounded-xl font-semibold text-sm"
              placeholder="Type message..."
            />
            <button
              onClick={playMorseTone}
              disabled={isPlayingAudio}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" /> {isPlayingAudio ? 'Beeping...' : 'Play Morse Audio'}
            </button>
          </div>

          <div className="p-4 bg-slate-900 text-amber-400 font-mono text-sm rounded-2xl break-all tracking-widest font-black">
            {encodedMorse || '...'}
          </div>
        </div>
      )}

      {/* 17. UNIX CHMOD CALCULATOR */}
      {tool.id === 'unix-file-permissions-calc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border">
            {(['owner', 'group', 'others'] as const).map(grp => (
              <div key={grp} className="space-y-2">
                <div className="text-xs font-bold uppercase text-slate-400">{grp}</div>
                <div className="space-y-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" checked={chmodMatrix[grp].r} onChange={() => toggleChmod(grp, 'r')} className="rounded text-indigo-600" /> Read (4)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" checked={chmodMatrix[grp].w} onChange={() => toggleChmod(grp, 'w')} className="rounded text-indigo-600" /> Write (2)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" checked={chmodMatrix[grp].x} onChange={() => toggleChmod(grp, 'x')} className="rounded text-indigo-600" /> Execute (1)
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-indigo-600">Octal Notation</div>
              <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 font-mono">{chmodStats.octal}</div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Symbolic String</div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{chmodStats.symbolic}</div>
            </div>
          </div>
        </div>
      )}

      {/* 18. CSS TRIANGLE GENERATOR */}
      {tool.id === 'css-triangle-generator' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['top', 'bottom', 'left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => setTriDirection(dir)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize ${triDirection === dir ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900'}`}
              >
                {dir}
              </button>
            ))}
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900 border rounded-2xl flex items-center justify-center">
            <div style={{
              width: 0,
              height: 0,
              borderLeft: triDirection === 'top' || triDirection === 'bottom' ? `${triSize}px solid transparent` : triDirection === 'right' ? `${triSize}px solid ${triColor}` : 'none',
              borderRight: triDirection === 'top' || triDirection === 'bottom' ? `${triSize}px solid transparent` : triDirection === 'left' ? `${triSize}px solid ${triColor}` : 'none',
              borderBottom: triDirection === 'top' ? `${triSize}px solid ${triColor}` : 'none',
              borderTop: triDirection === 'bottom' ? `${triSize}px solid ${triColor}` : 'none'
            }} />
          </div>

          <pre className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-2xl">
            {cssTriangleSnippet}
          </pre>
        </div>
      )}

      {/* 19. SPEED DISTANCE TIME */}
      {tool.id === 'speed-distance-time-calc' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['speed', 'distance', 'time'] as const).map(m => (
              <button
                key={m}
                onClick={() => setSdtMode(m)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize ${sdtMode === m ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900'}`}
              >
                Solve for {m}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border">
            {sdtMode !== 'speed' && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Speed</label>
                <input type="number" value={sdtSpeed} onChange={e => setSdtSpeed(Number(e.target.value))} className="w-full p-2 border rounded-xl font-bold" />
              </div>
            )}
            {sdtMode !== 'distance' && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Distance</label>
                <input type="number" value={sdtDistance} onChange={e => setSdtDistance(Number(e.target.value))} className="w-full p-2 border rounded-xl font-bold" />
              </div>
            )}
            {sdtMode !== 'time' && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Time (Hours)</label>
                <input type="number" value={sdtTime} onChange={e => setSdtTime(Number(e.target.value))} className="w-full p-2 border rounded-xl font-bold" />
              </div>
            )}
          </div>

          <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-center">
            <div className="text-[10px] uppercase font-bold text-indigo-600">{sdtResult.formula}</div>
            <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1">{sdtResult.val}</div>
          </div>
        </div>
      )}

      {/* 20. LIST SORTER & DEDUPLICATOR */}
      {tool.id === 'list-sorter-deduplicator' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-slate-900 p-4 border rounded-2xl">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input type="checkbox" checked={listRemoveDupes} onChange={e => setListRemoveDupes(e.target.checked)} className="rounded text-indigo-600" />
              Remove Duplicates
            </label>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span>Sort:</span>
              <select value={listSortMode} onChange={e => setListSortMode(e.target.value as any)} className="p-1.5 border rounded-lg text-xs">
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
                <option value="length">By Length</option>
                <option value="none">Original Order</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea
              value={listInput}
              onChange={e => setListInput(e.target.value)}
              rows={8}
              className="w-full p-3 border rounded-xl font-mono text-xs"
              placeholder="Paste list items..."
            />
            <div className="relative">
              <button
                onClick={() => copyToClipboard(cleanedList, 'clean-list')}
                className="absolute top-2 right-2 text-xs text-indigo-600 font-bold hover:underline"
              >
                {copied === 'clean-list' ? 'Copied' : 'Copy List'}
              </button>
              <textarea
                readOnly
                value={cleanedList}
                rows={8}
                className="w-full p-3 border bg-slate-50 dark:bg-slate-900 rounded-xl font-mono text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
