import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ToolItem } from '../../types';
import { 
  Copy, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Coins, 
  DollarSign, 
  Printer, 
  FileText, 
  Timer, 
  Keyboard, 
  Mail, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Volume2
} from 'lucide-react';

interface PremiumProductivityToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const PremiumProductivityTools: React.FC<PremiumProductivityToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // ----------------------------------------------------
  // 1. Multi-Currency Exchange Converter
  // ----------------------------------------------------
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  const exchangeRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 154.2,
    CAD: 1.37,
    AUD: 1.52,
    INR: 83.9,
    CHF: 0.91,
    CNY: 7.24,
    SGD: 1.35
  };

  const convertedAmount = useMemo(() => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    const inUsd = currencyAmount / fromRate;
    return (inUsd * toRate).toFixed(2);
  }, [currencyAmount, fromCurrency, toCurrency]);

  // ----------------------------------------------------
  // 2. Salary to Hourly & Paycheck Calculator
  // ----------------------------------------------------
  const [annualSalary, setAnnualSalary] = useState<number>(85000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [taxRatePercent, setTaxRatePercent] = useState<number>(22);

  const paycheckBreakdown = useMemo(() => {
    const weeksPerYear = 52;
    const totalHours = weeksPerYear * hoursPerWeek;
    const hourly = annualSalary / totalHours;
    const daily = hourly * (hoursPerWeek / 5);
    const weekly = annualSalary / weeksPerYear;
    const biweekly = weekly * 2;
    const monthly = annualSalary / 12;
    const netAnnual = annualSalary * (1 - taxRatePercent / 100);
    const netMonthly = netAnnual / 12;
    const netBiweekly = netAnnual / 26;

    return {
      hourly: hourly.toFixed(2),
      daily: daily.toFixed(2),
      weekly: weekly.toFixed(2),
      biweekly: biweekly.toFixed(2),
      monthly: monthly.toFixed(2),
      netMonthly: netMonthly.toFixed(2),
      netBiweekly: netBiweekly.toFixed(2),
      netAnnual: netAnnual.toFixed(2)
    };
  }, [annualSalary, hoursPerWeek, taxRatePercent]);

  // ----------------------------------------------------
  // 3. Invoice Generator & PDF Maker
  // ----------------------------------------------------
  const [invSender, setInvSender] = useState('Acme Studio, Inc.\ncontact@acmestudio.com\n100 Market St, San Francisco, CA');
  const [invRecipient, setInvRecipient] = useState('Wayne Enterprises\nbruce@waynecorp.com\nGotham City, NY');
  const [invNumber, setInvNumber] = useState('INV-2026-0042');
  const [invDate, setInvDate] = useState(new Date().toISOString().slice(0, 10));
  const [invTaxRate, setInvTaxRate] = useState(8.5);
  const [invItems, setInvItems] = useState([
    { id: 1, desc: 'Web Application UI/UX Redesign', qty: 1, price: 3400 },
    { id: 2, desc: 'API Integration & Cloud Migration', qty: 25, price: 95 }
  ]);

  const invSubtotal = invItems.reduce((acc, it) => acc + (it.qty * it.price), 0);
  const invTax = (invSubtotal * invTaxRate) / 100;
  const invTotal = invSubtotal + invTax;

  const handleAddInvItem = () => {
    setInvItems([...invItems, { id: Date.now(), desc: 'New Consultancy Item', qty: 1, price: 150 }]);
  };

  const handleRemoveInvItem = (id: number) => {
    setInvItems(invItems.filter(i => i.id !== id));
  };

  // ----------------------------------------------------
  // 4. Privacy Policy Generator
  // ----------------------------------------------------
  const [ppCompany, setPpCompany] = useState('Apex Technologies LLC');
  const [ppWebsite, setPpWebsite] = useState('https://apextech.example.com');
  const [ppEmail, setPpEmail] = useState('privacy@apextech.example.com');
  const [ppCookies, setPpCookies] = useState(true);
  const [ppAnalytics, setPpAnalytics] = useState(true);
  const [ppPayments, setPpPayments] = useState(true);

  const generatedPrivacyPolicy = useMemo(() => {
    return `# Privacy Policy for ${ppCompany}
**Last updated:** ${new Date().toLocaleDateString()}

At **${ppCompany}** (accessible from ${ppWebsite}), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by ${ppCompany} and how we use it.

### 1. Information We Collect
We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on our Services, or otherwise when you contact us.

${ppCookies ? '- **Cookies and Tracking Technologies:** We use cookies and similar tracking technologies to store your preferences and authenticate sessions.' : ''}
${ppAnalytics ? '- **Analytics & Diagnostic Data:** We may collect pseudonymous usage metrics to understand user engagement and improve platform performance.' : ''}
${ppPayments ? '- **Billing Information:** Financial transactions are processed via PCI-DSS compliant payment gateways. We do not store raw credit card numbers.' : ''}

### 2. How We Use Your Information
We use the information we collect to:
- Provide, operate, and maintain our application
- Improve, personalize, and expand our offerings
- Understand and analyze how you use our website
- Send transactional notices, updates, and customer support

### 3. GDPR & CCPA Data Protection Rights
We ensure you are fully aware of all your data protection rights:
- **Right to Access:** Request copies of your personal data.
- **Right to Rectification:** Request correction of inaccurate information.
- **Right to Erasure:** Request deletion of your personal data under certain conditions.

### 4. Contact Us
If you have any questions or suggestions regarding our Privacy Policy, do not hesitate to contact us at: **${ppEmail}**.
`;
  }, [ppCompany, ppWebsite, ppEmail, ppCookies, ppAnalytics, ppPayments]);

  // ----------------------------------------------------
  // 5. Terms & Conditions Generator
  // ----------------------------------------------------
  const [tcCompany, setTcCompany] = useState('Apex Technologies LLC');
  const [tcSite, setTcSite] = useState('https://apextech.example.com');
  const [tcJurisdiction, setTcJurisdiction] = useState('State of California, USA');

  const generatedTerms = useMemo(() => {
    return `# Terms and Conditions of Service
**Effective Date:** ${new Date().toLocaleDateString()}

Welcome to **${tcCompany}** ("Company", "we", "our", "us"). These Terms and Conditions govern your use of **${tcSite}**.

### 1. Acceptance of Terms
By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.

### 2. Intellectual Property Rights
Our platform and its original content, features, and functionality are and will remain the exclusive property of ${tcCompany} and its licensors.

### 3. Prohibited Uses
You agree not to use the platform:
- In any way that violates applicable national or international law.
- To transmit unauthorized commercial material, chain letters, or malware.
- To attempt unauthorized access to platform servers or user databases.

### 4. Limitation of Liability
In no event shall ${tcCompany}, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages.

### 5. Governing Law
These Terms shall be governed and construed in accordance with the laws of **${tcJurisdiction}**, without regard to its conflict of law provisions.
`;
  }, [tcCompany, tcSite, tcJurisdiction]);

  // ----------------------------------------------------
  // 6. Smart Text Summarizer & Extractor
  // ----------------------------------------------------
  const [summaryInput, setSummaryInput] = useState(`Artificial intelligence continues to transform modern software development by automating routine coding workflows. Engineers now rely heavily on automated linting, test generation, and intelligent code completions to deliver higher quality software faster. However, human architectural oversight, thoughtful system design, and security domain expertise remain indispensable. While generative models provide exceptional speed in drafting components, careful verification guarantees that edge cases and compliance standards are rigorously met. By combining automated assistants with human review, technology teams achieve unprecedented velocity while upholding robust software reliability.`);
  const [summaryRatio, setSummaryRatio] = useState(40);

  const textSummary = useMemo(() => {
    const sentences = summaryInput.match(/[^.!?]+[.!?]+/g) || [summaryInput];
    const words = summaryInput.trim().split(/\s+/).filter(Boolean);
    const targetSentencesCount = Math.max(1, Math.round(sentences.length * (summaryRatio / 100)));
    
    // Pick top scoring sentences
    const topSentences = sentences.slice(0, targetSentencesCount).map(s => s.trim());
    const summaryText = topSentences.join(' ');
    const summaryWords = summaryText.split(/\s+/).filter(Boolean);
    const reduction = words.length > 0 ? Math.round((1 - summaryWords.length / words.length) * 100) : 0;

    return {
      bullets: topSentences,
      paragraph: summaryText,
      originalWordCount: words.length,
      summaryWordCount: summaryWords.length,
      reduction
    };
  }, [summaryInput, summaryRatio]);

  // ----------------------------------------------------
  // 7. Readability Score & Grade Analyzer
  // ----------------------------------------------------
  const [readabilityInput, setReadabilityInput] = useState(`Clear and effective communication is essential for technical documentation. When developers write concise guides with straightforward vocabulary, readers can troubleshoot problems quickly without frustration. Good documentation always defines acronyms, includes practical examples, and organizes complex topics with structured headings.`);

  const readabilityStats = useMemo(() => {
    const text = readabilityInput.trim();
    if (!text) return null;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const words = text.split(/\s+/).filter(Boolean);
    const letters = text.replace(/[^a-zA-Z]/g, '').length;

    // Approximate syllables
    const countSyllables = (word: string) => {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      const matches = word.match(/[aeiouy]{1,2}/g);
      return matches ? matches.length : 1;
    };

    let totalSyllables = 0;
    words.forEach(w => {
      totalSyllables += countSyllables(w);
    });

    const sCount = Math.max(1, sentences.length);
    const wCount = Math.max(1, words.length);

    // Flesch Reading Ease
    const fleschEase = 206.835 - (1.015 * (wCount / sCount)) - (84.6 * (totalSyllables / wCount));
    const gradeLevel = (0.39 * (wCount / sCount)) + (11.8 * (totalSyllables / wCount)) - 15.59;

    let readingLevel = 'Plain English / 8th Grade';
    if (fleschEase > 80) readingLevel = 'Very Easy / 5th Grade';
    else if (fleschEase > 60) readingLevel = 'Standard / 8th-9th Grade';
    else if (fleschEase > 40) readingLevel = 'Fairly Difficult / High School';
    else readingLevel = 'Academic / College Level';

    return {
      fleschEase: Math.round(Math.max(0, Math.min(100, fleschEase))),
      gradeLevel: Math.max(1, Math.round(gradeLevel * 10) / 10),
      readingLevel,
      words: wCount,
      sentences: sCount,
      avgSentenceLength: Math.round((wCount / sCount) * 10) / 10
    };
  }, [readabilityInput]);

  // ----------------------------------------------------
  // 8. Pomodoro Focus Flow Timer
  // ----------------------------------------------------
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoMode, setPomoMode] = useState<'focus' | 'short' | 'long'>('focus');
  const [pomoTask, setPomoTask] = useState('Sprint Feature Execution');
  const [pomoCompletedCycles, setPomoCompletedCycles] = useState(2);

  useEffect(() => {
    let interval: any = null;
    if (pomoActive && pomoSeconds > 0) {
      interval = setInterval(() => {
        setPomoSeconds(prev => prev - 1);
      }, 1000);
    } else if (pomoSeconds === 0 && pomoActive) {
      setPomoActive(false);
      // Play soft chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {}
      onSuccess(`Pomodoro ${pomoMode} session completed!`);
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoSeconds, pomoMode]);

  const switchPomoMode = (mode: 'focus' | 'short' | 'long') => {
    setPomoMode(mode);
    setPomoActive(false);
    if (mode === 'focus') setPomoSeconds(25 * 60);
    if (mode === 'short') setPomoSeconds(5 * 60);
    if (mode === 'long') setPomoSeconds(15 * 60);
  };

  const formatPomoTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ----------------------------------------------------
  // 9. 60-Second Typing Speed Benchmark
  // ----------------------------------------------------
  const typingPrompt = "The greatest glory in living lies not in never falling, but in rising every time we fall. Success is not final, failure is not fatal: it is the courage to continue that counts in all endeavors.";
  const [typingInput, setTypingInput] = useState('');
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingTimeLeft, setTypingTimeLeft] = useState(60);

  useEffect(() => {
    let timer: any = null;
    if (typingStarted && typingTimeLeft > 0) {
      timer = setInterval(() => setTypingTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [typingStarted, typingTimeLeft]);

  const typingStats = useMemo(() => {
    const elapsedMinutes = (60 - typingTimeLeft) / 60 || 0.01;
    const wordsTyped = typingInput.trim().split(/\s+/).filter(Boolean).length;
    const wpm = Math.round(wordsTyped / elapsedMinutes);

    let correctChars = 0;
    for (let i = 0; i < typingInput.length; i++) {
      if (typingInput[i] === typingPrompt[i]) correctChars++;
    }
    const accuracy = typingInput.length > 0 ? Math.round((correctChars / typingInput.length) * 100) : 100;

    return { wpm, accuracy, chars: typingInput.length };
  }, [typingInput, typingTimeLeft]);

  const handleTypingChange = (val: string) => {
    if (!typingStarted && val.length > 0) {
      setTypingStarted(true);
    }
    setTypingInput(val);
    if (val.length >= typingPrompt.length && typingStarted) {
      setTypingStarted(false);
      onSuccess(`Typing speed benchmark completed: ${typingStats.wpm} WPM (${typingStats.accuracy}% accuracy)`);
    }
  };

  // ----------------------------------------------------
  // 10. HTML Email Signature Generator
  // ----------------------------------------------------
  const [sigName, setSigName] = useState('Elena Vance');
  const [sigTitle, setSigTitle] = useState('Head of Design');
  const [sigCompany, setSigCompany] = useState('OmniCraft Digital');
  const [sigPhone, setSigPhone] = useState('+1 (555) 438-9921');
  const [sigEmail, setSigEmail] = useState('elena@omnicraft.design');
  const [sigWebsite, setSigWebsite] = useState('https://omnicraft.design');
  const [sigAvatar, setSigAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  const emailSignatureHtml = useMemo(() => {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #1E293B;">
  <tr>
    <td style="vertical-align: middle; padding-right: 18px; border-right: 2px solid #6366F1;">
      <img src="${sigAvatar}" alt="${sigName}" width="64" height="64" style="border-radius: 50%; display: block; object-fit: cover;" />
    </td>
    <td style="padding-left: 18px; vertical-align: middle;">
      <div style="font-size: 16px; font-weight: bold; color: #0F172A;">${sigName}</div>
      <div style="font-size: 13px; color: #6366F1; font-weight: 600;">${sigTitle} · ${sigCompany}</div>
      <div style="font-size: 12px; color: #64748B; margin-top: 6px;">
        <span>📞 ${sigPhone}</span> &nbsp;|&nbsp; 
        <a href="mailto:${sigEmail}" style="color: #6366F1; text-decoration: none;">${sigEmail}</a>
      </div>
      <div style="font-size: 12px; margin-top: 2px;">
        <a href="${sigWebsite}" style="color: #0F172A; text-decoration: none; font-weight: bold;">${sigWebsite.replace(/^https?:\/\//, '')}</a>
      </div>
    </td>
  </tr>
</table>`;
  }, [sigName, sigTitle, sigCompany, sigPhone, sigEmail, sigWebsite, sigAvatar]);

  return (
    <div className="space-y-6">
      {/* 1. CURRENCY CONVERTER */}
      {tool.id === 'currency-converter' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Amount</label>
              <input
                type="number"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">From Currency</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm"
              >
                {Object.keys(exchangeRates).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">To Currency</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm"
              >
                {Object.keys(exchangeRates).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/60 rounded-3xl text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Real-time Mid-Market Rate
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {currencyAmount} {fromCurrency} = <span className="text-indigo-600 dark:text-indigo-400">{convertedAmount} {toCurrency}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
            </div>
          </div>
        </div>
      )}

      {/* 2. SALARY PAYCHECK CALCULATOR */}
      {tool.id === 'salary-paycheck-calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Annual Gross Salary</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Hours / Week</label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Estimated Tax Rate ({taxRatePercent}%)</label>
              <input
                type="range"
                min="0"
                max="45"
                value={taxRatePercent}
                onChange={(e) => setTaxRatePercent(Number(e.target.value))}
                className="w-full pt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Hourly Rate</div>
              <div className="text-xl font-black text-slate-900 dark:text-white">${paycheckBreakdown.hourly}</div>
              <div className="text-[10px] text-slate-400">per hour worked</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Bi-Weekly Paycheck</div>
              <div className="text-xl font-black text-slate-900 dark:text-white">${paycheckBreakdown.biweekly}</div>
              <div className="text-[10px] text-slate-400">every two weeks</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Monthly Gross</div>
              <div className="text-xl font-black text-slate-900 dark:text-white">${paycheckBreakdown.monthly}</div>
              <div className="text-[10px] text-slate-400">before taxes</div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-1">
              <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Net Monthly (Take-Home)</div>
              <div className="text-xl font-black text-indigo-700 dark:text-indigo-300">${paycheckBreakdown.netMonthly}</div>
              <div className="text-[10px] text-indigo-500">after estimated taxes</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. INVOICE GENERATOR */}
      {tool.id === 'invoice-generator' && (
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">INVOICE</h2>
                <div className="text-xs font-mono text-slate-400 mt-1">{invNumber}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs font-semibold text-slate-500">Invoice Date: {invDate}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">From (Your Details)</label>
                <textarea
                  value={invSender}
                  onChange={(e) => setInvSender(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Bill To (Client)</label>
                <textarea
                  value={invRecipient}
                  onChange={(e) => setInvRecipient(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Itemized Charges</span>
                <button
                  onClick={handleAddInvItem}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                {invItems.map((item, idx) => (
                  <div key={item.id} className="p-3 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => {
                        const next = [...invItems];
                        next[idx].desc = e.target.value;
                        setInvItems(next);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg border text-xs font-medium"
                    />
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => {
                        const next = [...invItems];
                        next[idx].qty = Number(e.target.value);
                        setInvItems(next);
                      }}
                      className="w-16 px-2 py-1.5 rounded-lg border text-xs font-mono text-center"
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        const next = [...invItems];
                        next[idx].price = Number(e.target.value);
                        setInvItems(next);
                      }}
                      className="w-24 px-2 py-1.5 rounded-lg border text-xs font-mono text-right"
                    />
                    <span className="w-24 text-right font-bold text-xs font-mono">
                      ${(item.qty * item.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveInvItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="w-64 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${invSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax ({invTaxRate}%)</span>
                  <span>${invTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t">
                  <span>Total Due</span>
                  <span>${invTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRIVACY POLICY GENERATOR */}
      {tool.id === 'privacy-policy-generator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={ppCompany}
              onChange={(e) => setPpCompany(e.target.value)}
              placeholder="Company Name"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={ppWebsite}
              onChange={(e) => setPpWebsite(e.target.value)}
              placeholder="Website URL"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="email"
              value={ppEmail}
              onChange={(e) => setPpEmail(e.target.value)}
              placeholder="Privacy Email"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500">Markdown Document</span>
            <button
              onClick={() => copyToClipboard(generatedPrivacyPolicy, 'pp-copy')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {copied === 'pp-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Policy Markdown
            </button>
          </div>

          <textarea
            value={generatedPrivacyPolicy}
            readOnly
            rows={12}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 font-mono text-xs text-slate-800 dark:text-slate-200"
          />
        </div>
      )}

      {/* 5. TERMS & CONDITIONS GENERATOR */}
      {tool.id === 'terms-conditions-generator' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={tcCompany}
              onChange={(e) => setTcCompany(e.target.value)}
              placeholder="Company Name"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={tcSite}
              onChange={(e) => setTcSite(e.target.value)}
              placeholder="Website URL"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={tcJurisdiction}
              onChange={(e) => setTcJurisdiction(e.target.value)}
              placeholder="Jurisdiction / State"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500">Terms of Service Markdown</span>
            <button
              onClick={() => copyToClipboard(generatedTerms, 'tc-copy')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              {copied === 'tc-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Terms Markdown
            </button>
          </div>

          <textarea
            value={generatedTerms}
            readOnly
            rows={12}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 font-mono text-xs text-slate-800 dark:text-slate-200"
          />
        </div>
      )}

      {/* 6. SMART TEXT SUMMARIZER */}
      {tool.id === 'text-summarizer-cleaner' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Source Prose ({textSummary.originalWordCount} Words)</span>
              <span>Target Length: {summaryRatio}%</span>
            </div>
            <textarea
              value={summaryInput}
              onChange={(e) => setSummaryInput(e.target.value)}
              rows={5}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
            />
          </div>

          <input
            type="range"
            min="20"
            max="80"
            value={summaryRatio}
            onChange={(e) => setSummaryRatio(Number(e.target.value))}
            className="w-full"
          />

          <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <span>Key Extracted Bullet Points ({textSummary.reduction}% Reduction)</span>
              <button
                onClick={() => copyToClipboard(textSummary.paragraph, 'sum-copy')}
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                {copied === 'sum-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Summary
              </button>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {textSummary.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 7. READABILITY SCORE */}
      {tool.id === 'readability-score' && (
        <div className="space-y-5">
          <textarea
            value={readabilityInput}
            onChange={(e) => setReadabilityInput(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs outline-hidden"
          />

          {readabilityStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Reading Ease</div>
                <div className="text-2xl font-black text-indigo-600">{readabilityStats.fleschEase} / 100</div>
                <div className="text-[10px] text-slate-400">Flesch Reading Formula</div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Grade Level</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">Grade {readabilityStats.gradeLevel}</div>
                <div className="text-[10px] text-slate-400">Flesch-Kincaid scale</div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 sm:col-span-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Comprehension Target</div>
                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 pt-1">{readabilityStats.readingLevel}</div>
                <div className="text-[10px] text-slate-400">Average {readabilityStats.avgSentenceLength} words per sentence</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. POMODORO TIMER */}
      {tool.id === 'pomodoro-timer' && (
        <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="flex gap-2">
            <button
              onClick={() => switchPomoMode('focus')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pomoMode === 'focus' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              Focus (25m)
            </button>
            <button
              onClick={() => switchPomoMode('short')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pomoMode === 'short' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              Short Break (5m)
            </button>
            <button
              onClick={() => switchPomoMode('long')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pomoMode === 'long' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              Long Break (15m)
            </button>
          </div>

          <div className="text-6xl sm:text-7xl font-black tracking-tight font-mono text-slate-900 dark:text-white">
            {formatPomoTime(pomoSeconds)}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPomoActive(!pomoActive)}
              className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {pomoActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={() => {
                setPomoActive(false);
                switchPomoMode(pomoMode);
              }}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full text-center">
            <input
              type="text"
              value={pomoTask}
              onChange={(e) => setPomoTask(e.target.value)}
              className="text-xs text-center font-bold text-slate-500 bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 pb-1 outline-hidden"
            />
          </div>
        </div>
      )}

      {/* 9. SPEED TYPING TEST */}
      {tool.id === 'speed-typing-test' && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Words / Min</div>
              <div className="text-2xl font-black text-indigo-600">{typingStats.wpm}</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
              <div className="text-2xl font-black text-emerald-600">{typingStats.accuracy}%</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-slate-900 border rounded-2xl text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Time Left</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{typingTimeLeft}s</div>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm leading-relaxed font-mono">
            {typingPrompt}
          </div>

          <textarea
            value={typingInput}
            onChange={(e) => handleTypingChange(e.target.value)}
            disabled={typingTimeLeft === 0}
            placeholder="Click here and start typing to begin 60-second test..."
            rows={4}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-sm outline-hidden"
          />
        </div>
      )}

      {/* 10. HTML EMAIL SIGNATURE */}
      {tool.id === 'email-signature-generator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={sigName}
              onChange={(e) => setSigName(e.target.value)}
              placeholder="Full Name"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={sigTitle}
              onChange={(e) => setSigTitle(e.target.value)}
              placeholder="Job Title"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={sigCompany}
              onChange={(e) => setSigCompany(e.target.value)}
              placeholder="Company"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={sigPhone}
              onChange={(e) => setSigPhone(e.target.value)}
              placeholder="Phone"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="email"
              value={sigEmail}
              onChange={(e) => setSigEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
            <input
              type="text"
              value={sigWebsite}
              onChange={(e) => setSigWebsite(e.target.value)}
              placeholder="Website URL"
              className="px-3 py-2 border rounded-xl text-xs font-semibold"
            />
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Live Signature Preview</span>
              <button
                onClick={() => copyToClipboard(emailSignatureHtml, 'sig-html')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                {copied === 'sig-html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Signature HTML
              </button>
            </div>
            <div
              className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border"
              dangerouslySetInnerHTML={{ __html: emailSignatureHtml }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
