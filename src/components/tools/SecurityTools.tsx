import React, { useState, useEffect, useMemo } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Dice5, 
  CreditCard, 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { ToolItem } from '../../types';

interface SecurityToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const SecurityTools: React.FC<SecurityToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // Password Generator states
  const [pwLength, setPwLength] = useState<number>(16);
  const [pwUpper, setPwUpper] = useState<boolean>(true);
  const [pwLower, setPwLower] = useState<boolean>(true);
  const [pwNumbers, setPwNumbers] = useState<boolean>(true);
  const [pwSymbols, setPwSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  // Hash Generator states
  const [hashInput, setHashInput] = useState<string>('ToolStack Security');
  const [hashes, setHashes] = useState<{ sha1: string; sha256: string; sha384: string; sha512: string }>({
    sha1: '',
    sha256: '',
    sha384: '',
    sha512: ''
  });

  // Random Number states
  const [randMin, setRandMin] = useState<number>(1);
  const [randMax, setRandMax] = useState<number>(100);
  const [randCount, setRandCount] = useState<number>(5);
  const [randUnique, setRandUnique] = useState<boolean>(true);
  const [randResults, setRandResults] = useState<number[]>([]);

  // Credit Card states
  const [ccNumber, setCcNumber] = useState<string>('4532 0150 0000 0000');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. PASSWORD GENERATOR ---
  const generatePassword = () => {
    let chars = '';
    if (pwUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (pwLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (pwNumbers) chars += '0123456789';
    if (pwSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(pwLength);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < pwLength; i++) {
      result += chars[array[i] % chars.length];
    }
    setGeneratedPassword(result);
    onSuccess('Generated cryptographically secure random password.');
  };

  useEffect(() => {
    if (tool.id === 'password-generator') {
      generatePassword();
    }
  }, [pwLength, pwUpper, pwLower, pwNumbers, pwSymbols]);

  // Password strength meter
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (generatedPassword.length >= 12) score += 1;
    if (generatedPassword.length >= 16) score += 1;
    if (/[A-Z]/.test(generatedPassword)) score += 1;
    if (/[0-9]/.test(generatedPassword)) score += 1;
    if (/[^a-zA-Z0-9]/.test(generatedPassword)) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { label: 'Strong', color: 'bg-amber-500' };
    return { label: 'Very Secure (Entropy > 90 bits)', color: 'bg-emerald-500' };
  }, [generatedPassword]);

  // --- 2. HASH GENERATOR ---
  useEffect(() => {
    if (tool.id === 'hash-generator') {
      computeHashes();
    }
  }, [hashInput]);

  const computeHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);

    const bufferToHex = (buf: ArrayBuffer) =>
      Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    try {
      const [sha1Buf, sha256Buf, sha384Buf, sha512Buf] = await Promise.all([
        crypto.subtle.digest('SHA-1', data),
        crypto.subtle.digest('SHA-256', data),
        crypto.subtle.digest('SHA-384', data),
        crypto.subtle.digest('SHA-512', data)
      ]);

      setHashes({
        sha1: bufferToHex(sha1Buf),
        sha256: bufferToHex(sha256Buf),
        sha384: bufferToHex(sha384Buf),
        sha512: bufferToHex(sha512Buf)
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // --- 3. RANDOM NUMBER GENERATOR ---
  const generateRandomNumbers = () => {
    const min = Math.min(randMin, randMax);
    const max = Math.max(randMin, randMax);
    const count = Math.min(randCount, randUnique ? max - min + 1 : 1000);
    const results: number[] = [];

    if (randUnique) {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      results.push(...pool.slice(0, count));
    } else {
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    }

    setRandResults(results);
    onSuccess(`Generated ${results.length} random numbers.`);
  };

  useEffect(() => {
    if (tool.id === 'random-number' && randResults.length === 0) {
      generateRandomNumbers();
    }
  }, [tool.id]);

  // --- 4. CREDIT CARD VALIDATOR (LUHN ALGORITHM) ---
  const cardValidation = useMemo(() => {
    const digits = ccNumber.replace(/\D/g, '');
    if (digits.length < 13) {
      return { valid: false, network: 'Unknown', formatted: digits };
    }

    // Identify card issuer
    let network = 'Unknown Network';
    if (/^4/.test(digits)) network = 'Visa';
    else if (/^(5[1-5]|2[2-7])/.test(digits)) network = 'Mastercard';
    else if (/^3[47]/.test(digits)) network = 'American Express';
    else if (/^6(?:011|5)/.test(digits)) network = 'Discover';

    // Luhn algorithm
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;

    return {
      valid: isValid,
      network,
      formatted: digits.replace(/(\d{4})/g, '$1 ').trim()
    };
  }, [ccNumber]);

  return (
    <div className="space-y-6">
      {/* 1. PASSWORD GENERATOR */}
      {tool.id === 'password-generator' && (
        <div className="space-y-5">
          <div className="p-5 bg-slate-900 rounded-2xl flex items-center justify-between gap-4 text-white">
            <span className="font-mono text-xl tracking-wider select-all break-all text-emerald-400">
              {generatedPassword}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={generatePassword}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                title="Generate New Password"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(generatedPassword)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Entropy & Strength</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {passwordStrength.label}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${passwordStrength.color} transition-all duration-300 w-full`} />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                <span>Password Length</span>
                <span className="text-indigo-600 font-bold">{pwLength} characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={pwLength}
                onChange={(e) => setPwLength(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'A-Z Uppercase', checked: pwUpper, set: setPwUpper },
                { label: 'a-z Lowercase', checked: pwLower, set: setPwLower },
                { label: '0-9 Numbers', checked: pwNumbers, set: setPwNumbers },
                { label: '!@# Symbols', checked: pwSymbols, set: setPwSymbols }
              ].map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100"
                >
                  <input
                    type="checkbox"
                    checked={opt.checked}
                    onChange={(e) => opt.set(e.target.checked)}
                    className="text-indigo-600 rounded"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. HASH GENERATOR */}
      {tool.id === 'hash-generator' && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Source String to Hash
            </label>
            <textarea
              rows={3}
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-mono"
            />
          </div>

          <div className="space-y-3">
            {[
              { name: 'SHA-256 (Industry Standard)', val: hashes.sha256 },
              { name: 'SHA-512 (High Security)', val: hashes.sha512 },
              { name: 'SHA-384', val: hashes.sha384 },
              { name: 'SHA-1 (Legacy)', val: hashes.sha1 }
            ].map((h) => (
              <div
                key={h.name}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>{h.name}</span>
                  <button
                    onClick={() => {
                      copyToClipboard(h.val);
                      onSuccess(`Copied ${h.name} digest.`);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline text-[11px]"
                  >
                    <Copy className="w-3 h-3" /> Copy Hash
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                  {h.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. RANDOM NUMBER GENERATOR */}
      {tool.id === 'random-number' && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Minimum
              </label>
              <input
                type="number"
                value={randMin}
                onChange={(e) => setRandMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Maximum
              </label>
              <input
                type="number"
                value={randMax}
                onChange={(e) => setRandMax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={randCount}
                onChange={(e) => setRandCount(Math.min(50, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={randUnique}
                onChange={(e) => setRandUnique(e.target.checked)}
                className="text-indigo-600 rounded"
              />
              No Duplicates (Lottery / Raffle Mode)
            </label>

            <button
              onClick={generateRandomNumbers}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Dice5 className="w-4 h-4" /> Roll Numbers
            </button>
          </div>

          {randResults.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-400 block mb-3">Generated Numbers</span>
              <div className="flex flex-wrap justify-center gap-3">
                {randResults.map((n, i) => (
                  <span
                    key={i}
                    className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-400 shadow-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CREDIT CARD VALIDATOR */}
      {tool.id === 'credit-card-validator' && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Enter Card Number to Test Luhn Mod-10 Checksum
            </label>
            <input
              type="text"
              value={ccNumber}
              onChange={(e) => setCcNumber(e.target.value)}
              placeholder="4532 0150 0000 0000"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono text-sm"
            />
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Card Issuer Network</span>
              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-md text-xs font-semibold">
                {cardValidation.network}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase">Luhn Checksum Result</span>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  cardValidation.valid
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                }`}
              >
                {cardValidation.valid ? 'Valid Card Number' : 'Invalid Card Number'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
