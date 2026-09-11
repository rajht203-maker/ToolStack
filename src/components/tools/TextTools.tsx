import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Play, 
  Square, 
  Volume2, 
  Type, 
  AlignLeft, 
  GitCompare, 
  FileText 
} from 'lucide-react';
import { ToolItem } from '../../types';

interface TextToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const TextTools: React.FC<TextToolsProps> = ({ tool, onSuccess }) => {
  const [inputText, setInputText] = useState<string>(
    tool.id === 'word-counter'
      ? 'ToolStack provides free, fast online tools with complete privacy. Everything runs directly in your browser without tracking or software installation.'
      : tool.id === 'case-converter'
      ? 'Transform any text into upper, lower, title, camel, snake, or kebab case.'
      : tool.id === 'slug-generator'
      ? '10 Best Web Developer Tools for High Productivity in 2026!'
      : tool.id === 'morse-code'
      ? 'SOS TOOLSTACK'
      : tool.id === 'binary-text'
      ? 'Hello World'
      : ''
  );

  const [copied, setCopied] = useState(false);

  // Slug generator options
  const [slugDelimiter, setSlugDelimiter] = useState<'-' | '_'>('-');
  const [slugStripStopWords, setSlugStripStopWords] = useState(false);

  // Lorem Ipsum options
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [loremCount, setLoremCount] = useState<number>(3);
  const [loremResult, setLoremResult] = useState<string>('');

  // Diff checker options
  const [diffOriginal, setDiffOriginal] = useState<string>(
    `The quick brown fox jumps over the lazy dog.\nWeb developers love fast browser tools.\nClean code matters.`
  );
  const [diffModified, setDiffModified] = useState<string>(
    `The quick brown fox leaps over the sleepy dog.\nWeb developers adore fast online tools.\nClean code matters always.`
  );

  // Morse Code sound synth
  const [isPlayingMorse, setIsPlayingMorse] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. WORD COUNTER METRICS ---
  const textStats = useMemo(() => {
    const text = inputText;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
    const readingTimeMins = (words / 225).toFixed(1);
    const speakingTimeMins = (words / 130).toFixed(1);

    // Keyword density
    const wordMap: Record<string, number> = {};
    const tokens = text.toLowerCase().match(/[a-z0-9]{3,}/g) || [];
    tokens.forEach(w => {
      wordMap[w] = (wordMap[w] || 0) + 1;
    });
    const keywords = Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      words,
      sentences,
      paragraphs,
      readingTimeMins,
      speakingTimeMins,
      keywords
    };
  }, [inputText]);

  // --- 2. CASE CONVERTER FUNCTIONS ---
  const convertCase = (type: string) => {
    let result = '';
    const text = inputText;
    switch (type) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'camel':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case 'pascal':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[a-z]/, (c) => c.toUpperCase());
        break;
      case 'snake':
        result = text
          .trim()
          .toLowerCase()
          .replace(/[\s\W-]+/g, '_');
        break;
      case 'kebab':
        result = text
          .trim()
          .toLowerCase()
          .replace(/[\s\W_]+/g, '-');
        break;
      case 'alternating':
        result = text
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join('');
        break;
      default:
        result = text;
    }
    setInputText(result);
    onSuccess(`Converted text case to ${type}.`);
  };

  // --- 3. SLUG GENERATOR ---
  const generatedSlug = useMemo(() => {
    let s = inputText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (slugStripStopWords) {
      const stopWords = ['a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
      const words = s.split(/\s+/).filter(w => !stopWords.includes(w));
      s = words.join(' ');
    }

    return s
      .replace(/[^a-z0-9\s-_]/g, '')
      .trim()
      .replace(/[\s_]+/g, slugDelimiter)
      .replace(new RegExp(`\\${slugDelimiter}+`, 'g'), slugDelimiter);
  }, [inputText, slugDelimiter, slugStripStopWords]);

  // --- 4. LOREM IPSUM GENERATOR ---
  const generateLorem = () => {
    const loremWords = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
      'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
      'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
      'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    let output = '';
    if (loremType === 'words') {
      const selected = [];
      for (let i = 0; i < loremCount; i++) {
        selected.push(loremWords[i % loremWords.length]);
      }
      output = selected.join(' ') + '.';
    } else if (loremType === 'sentences') {
      const sentences = [];
      for (let i = 0; i < loremCount; i++) {
        const sentenceLen = 8 + (i % 7);
        const w = [];
        for (let j = 0; j < sentenceLen; j++) {
          w.push(loremWords[(i * 5 + j) % loremWords.length]);
        }
        sentences.push(w.join(' ').charAt(0).toUpperCase() + w.join(' ').slice(1) + '.');
      }
      output = sentences.join(' ');
    } else {
      const paras = [];
      for (let p = 0; p < loremCount; p++) {
        const pWords = [];
        for (let w = 0; w < 60; w++) {
          pWords.push(loremWords[(p * 30 + w) % loremWords.length]);
        }
        paras.push(pWords.join(' ').charAt(0).toUpperCase() + pWords.join(' ').slice(1) + '.');
      }
      output = paras.join('\n\n');
    }

    setLoremResult(output);
    onSuccess(`Generated ${loremCount} ${loremType} of placeholder text.`);
  };

  // --- 5. MORSE CODE TRANSLATOR & SYNTH ---
  const MORSE_MAP: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_MAP).reduce(
    (acc, [char, code]) => ({ ...acc, [code]: char }),
    {}
  );

  const isMorseInput = /^[.\-\s/]+$/.test(inputText.trim());

  const morseResult = useMemo(() => {
    if (isMorseInput) {
      // Decode Morse to text
      return inputText
        .trim()
        .split(' ')
        .map((code) => (code === '/' ? ' ' : REVERSE_MORSE[code] || '?'))
        .join('');
    } else {
      // Encode text to Morse
      return inputText
        .toUpperCase()
        .split('')
        .map((char) => MORSE_MAP[char] || '')
        .join(' ');
    }
  }, [inputText, isMorseInput]);

  const playMorseAudio = async () => {
    if (isPlayingMorse) return;
    setIsPlayingMorse(true);

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const dotDuration = 0.08; // 80ms

      const sequence = morseResult.split('');
      let currentTime = audioCtx.currentTime + 0.1;

      for (const symbol of sequence) {
        if (symbol === '.') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, currentTime);
          gain.gain.setValueAtTime(0.2, currentTime);
          gain.gain.setValueAtTime(0, currentTime + dotDuration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(currentTime);
          osc.stop(currentTime + dotDuration);
          currentTime += dotDuration * 2;
        } else if (symbol === '-') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, currentTime);
          gain.gain.setValueAtTime(0.2, currentTime);
          gain.gain.setValueAtTime(0, currentTime + dotDuration * 3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(currentTime);
          osc.stop(currentTime + dotDuration * 3);
          currentTime += dotDuration * 4;
        } else if (symbol === ' ') {
          currentTime += dotDuration * 2;
        } else if (symbol === '/') {
          currentTime += dotDuration * 4;
        }
      }

      setTimeout(() => {
        setIsPlayingMorse(false);
      }, (currentTime - audioCtx.currentTime) * 1000);
    } catch (e) {
      console.warn(e);
      setIsPlayingMorse(false);
    }
  };

  // --- 6. BINARY TO TEXT ---
  const isBinaryInput = /^[01\s]+$/.test(inputText.trim());

  const binaryResult = useMemo(() => {
    if (isBinaryInput && inputText.trim().length >= 8) {
      // Binary to text
      try {
        const bytes = inputText.trim().split(/\s+/);
        return bytes.map((b) => String.fromCharCode(parseInt(b, 2))).join('');
      } catch (e) {
        return 'Invalid binary string.';
      }
    } else {
      // Text to binary
      return inputText
        .split('')
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
    }
  }, [inputText, isBinaryInput]);

  // --- 7. DIFF CHECKER ---
  const diffLines = useMemo(() => {
    const orig = diffOriginal.split('\n');
    const mod = diffModified.split('\n');
    const max = Math.max(orig.length, mod.length);
    const lines = [];

    for (let i = 0; i < max; i++) {
      const o = orig[i] || '';
      const m = mod[i] || '';
      lines.push({
        num: i + 1,
        orig: o,
        mod: m,
        status: o === m ? 'same' : o && !m ? 'deleted' : !o && m ? 'added' : 'modified'
      });
    }
    return lines;
  }, [diffOriginal, diffModified]);

  return (
    <div className="space-y-6">
      {/* 1. WORD COUNTER */}
      {tool.id === 'word-counter' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Words</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {textStats.words}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Characters</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {textStats.charsWithSpaces}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                ({textStats.charsWithoutSpaces} no spaces)
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Sentences</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {textStats.sentences}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {textStats.paragraphs} paragraphs
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">Reading Time</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {textStats.readingTimeMins}m
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {textStats.speakingTimeMins}m speaking
              </span>
            </div>
          </div>

          <div>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text to analyze..."
              className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {textStats.keywords.length > 0 && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Top Keyword Density
              </span>
              <div className="flex flex-wrap gap-2">
                {textStats.keywords.map(([word, count]) => (
                  <span
                    key={word}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    {word} <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CASE CONVERTER */}
      {tool.id === 'case-converter' && (
        <div className="space-y-4">
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste text to transform..."
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { id: 'uppercase', label: 'UPPERCASE' },
              { id: 'lowercase', label: 'lowercase' },
              { id: 'title', label: 'Title Case' },
              { id: 'sentence', label: 'Sentence case' },
              { id: 'camel', label: 'camelCase' },
              { id: 'pascal', label: 'PascalCase' },
              { id: 'snake', label: 'snake_case' },
              { id: 'kebab', label: 'kebab-case' },
              { id: 'alternating', label: 'aLtErNaTiNg' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => convertCase(fmt.id)}
                className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm transition-all"
              >
                {fmt.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => copyToClipboard(inputText)}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Text
            </button>
          </div>
        </div>
      )}

      {/* 3. SLUG GENERATOR */}
      {tool.id === 'slug-generator' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Article Title or Heading
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span>Separator:</span>
              <button
                type="button"
                onClick={() => setSlugDelimiter('-')}
                className={`px-2.5 py-1 rounded-md border font-mono ${
                  slugDelimiter === '-' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                }`}
              >
                Hyphen (-)
              </button>
              <button
                type="button"
                onClick={() => setSlugDelimiter('_')}
                className={`px-2.5 py-1 rounded-md border font-mono ${
                  slugDelimiter === '_' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                }`}
              >
                Underscore (_)
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={slugStripStopWords}
                onChange={(e) => setSlugStripStopWords(e.target.checked)}
                className="text-indigo-600 rounded"
              />
              Strip English stop words (a, the, in...)
            </label>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="min-w-0 font-mono text-sm text-indigo-600 dark:text-indigo-400 font-semibold truncate">
              {generatedSlug}
            </div>
            <button
              onClick={() => {
                copyToClipboard(generatedSlug);
                onSuccess('Copied URL slug.');
              }}
              className="shrink-0 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy Slug
            </button>
          </div>
        </div>
      )}

      {/* 4. LOREM IPSUM */}
      {tool.id === 'lorem-ipsum' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generate:</span>
              <input
                type="number"
                min="1"
                max="50"
                value={loremCount}
                onChange={(e) => setLoremCount(Math.max(1, Number(e.target.value)))}
                className="w-16 px-2 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded-lg text-center"
              />
            </div>

            <div className="flex gap-1.5">
              {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLoremType(t)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    loremType === t
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={generateLorem}
              className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg"
            >
              Generate Placeholder
            </button>
          </div>

          {loremResult && (
            <div className="relative">
              <textarea
                rows={8}
                readOnly
                value={loremResult}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-serif"
              />
              <button
                onClick={() => copyToClipboard(loremResult)}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. MORSE CODE */}
      {tool.id === 'morse-code' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Input (English Text or Morse Code with . and -)
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. SOS or ... --- ..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isMorseInput ? 'Decoded Text' : 'Morse Code Translation'}</span>
              <button
                onClick={playMorseAudio}
                disabled={isPlayingMorse}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium"
              >
                {isPlayingMorse ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Volume2 className="w-3 h-3" />}
                {isPlayingMorse ? 'Playing Audio...' : 'Play Beeps'}
              </button>
            </div>

            <div className="font-mono text-lg tracking-widest text-emerald-400 break-words">
              {morseResult || 'Enter text above'}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  copyToClipboard(morseResult);
                  onSuccess('Copied Morse result.');
                }}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy Output
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. BINARY TO TEXT */}
      {tool.id === 'binary-text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Enter Text or 8-Bit Binary Code
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter plain text (e.g. Hello) or binary bytes (e.g. 01001000 01101001)..."
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-mono"
            />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>{isBinaryInput ? 'ASCII Text Output' : 'Binary Output (8-bit bytes)'}</span>
              <button
                onClick={() => copyToClipboard(binaryResult)}
                className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-100 break-all bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              {binaryResult}
            </div>
          </div>
        </div>
      )}

      {/* 7. DIFF CHECKER */}
      {tool.id === 'diff-checker' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Original Text
              </label>
              <textarea
                rows={6}
                value={diffOriginal}
                onChange={(e) => setDiffOriginal(e.target.value)}
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Modified Text
              </label>
              <textarea
                rows={6}
                value={diffModified}
                onChange={(e) => setDiffModified(e.target.value)}
                className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-700">
              Comparison Output
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              {diffLines.map((line) => (
                <div
                  key={line.num}
                  className={`grid grid-cols-12 py-1.5 px-3 ${
                    line.status === 'modified'
                      ? 'bg-amber-50/60 dark:bg-amber-950/30'
                      : line.status === 'added'
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30'
                      : line.status === 'deleted'
                      ? 'bg-rose-50/60 dark:bg-rose-950/30'
                      : ''
                  }`}
                >
                  <span className="col-span-1 text-slate-400 select-none">{line.num}</span>
                  <div className="col-span-11 flex gap-2">
                    {line.status === 'modified' && (
                      <span className="text-amber-700 dark:text-amber-300 font-semibold">[~]</span>
                    )}
                    {line.status === 'added' && (
                      <span className="text-emerald-600 font-semibold">[+]</span>
                    )}
                    {line.status === 'deleted' && (
                      <span className="text-rose-600 font-semibold">[-]</span>
                    )}
                    <span className="text-slate-800 dark:text-slate-200">{line.mod || line.orig}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
