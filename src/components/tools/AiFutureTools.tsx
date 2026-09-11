import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Coins, 
  Cpu, 
  BookOpen, 
  RefreshCw, 
  Sliders, 
  Layers, 
  Terminal,
  Zap,
  Info
} from 'lucide-react';
import { ToolItem } from '../../types';

interface AiFutureToolsProps {
  tool: ToolItem;
  onSuccess: (summary: string) => void;
}

export const AiFutureTools: React.FC<AiFutureToolsProps> = ({ tool, onSuccess }) => {
  const [copied, setCopied] = useState(false);

  // --- Prompt Builder State ---
  const [promptRole, setPromptRole] = useState('Senior Full-Stack Engineer');
  const [promptTask, setPromptTask] = useState('Design a high-performance caching layer with Redis and Node.js');
  const [promptTone, setPromptTone] = useState('Technical & Rigorous');
  const [promptFormat, setPromptFormat] = useState('Markdown with Code Examples & Explanations');
  const [promptConstraints, setPromptConstraints] = useState('Include error handling, TTL strategies, and memory optimization.');
  const [promptVariables, setPromptVariables] = useState('{{CACHE_TTL}}, {{REDIS_HOST}}');

  // --- Token Counter State ---
  const [tokenInputText, setTokenInputText] = useState(
    `You are an expert full-stack developer. Please refactor this TypeScript algorithm to achieve O(n) runtime complexity and minimal memory allocation. Ensure all edge cases including null, empty arrays, and NaN inputs are cleanly handled with defensive unit tests.`
  );

  // --- System Prompt Architect State ---
  const [systemIdentity, setSystemIdentity] = useState('Autonomous Cloud Solutions Architect');
  const [systemDomain, setSystemDomain] = useState('Kubernetes & Microservices Infrastructure');
  const [systemStrictness, setSystemStrictness] = useState<'moderate' | 'strict' | 'maximum'>('strict');
  const [systemOutputRule, setSystemOutputRule] = useState('JSON with schema definition');

  // --- Text Readability State ---
  const [readabilityText, setReadabilityText] = useState(
    `Modern web applications require high reliability and seamless scalability. By decoupling serverless microservices and utilizing distributed caching nodes, engineering teams can minimize cold starts and achieve sub-millisecond response latency across global edge points. This architecture ensures optimal resource utilization while maintaining strict fault isolation.`
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onSuccess(`Copied ${label}`);
  };

  // --- Computed Prompt Output ---
  const generatedPrompt = useMemo(() => {
    return `# System Role: ${promptRole}

## Objective
You are operating as a ${promptRole}. Your primary task is to:
${promptTask}

## Style & Tone Guidelines
- Approach: ${promptTone}
- Maintain high precision and domain-authoritative standards.
- Avoid vague conversational fillers; focus strictly on verifiable solutions.

## Specific Constraints & Guardrails
${promptConstraints ? promptConstraints : '- Adhere to industry best practices and clean architecture.'}

## Target Output Format
Deliver your response formatted as: ${promptFormat}.

## Variables to substitute:
${promptVariables ? promptVariables : 'None'}

Please confirm your understanding of these constraints and proceed with the deliverable.`;
  }, [promptRole, promptTask, promptTone, promptFormat, promptConstraints, promptVariables]);

  // --- Computed Token Stats ---
  const tokenStats = useMemo(() => {
    const text = tokenInputText.trim();
    if (!text) {
      return { chars: 0, words: 0, tokens: 0, gpt4Cost: 0, claudeCost: 0, geminiCost: 0, deepseekCost: 0 };
    }
    const chars = text.length;
    const words = text.split(/\s+/).filter(Boolean).length;
    // Standard rule-of-thumb heuristic for English/Code tokenization: ~4 chars per token
    const tokens = Math.max(1, Math.round(chars / 3.85));

    // Pricing per 1M input tokens:
    // GPT-4o: $2.50
    // Claude 3.5 Sonnet: $3.00
    // Gemini 2.0 Flash: $0.10
    // DeepSeek R1: $0.55
    const gpt4Cost = (tokens / 1_000_000) * 2.50;
    const claudeCost = (tokens / 1_000_000) * 3.00;
    const geminiCost = (tokens / 1_000_000) * 0.10;
    const deepseekCost = (tokens / 1_000_000) * 0.55;

    return { chars, words, tokens, gpt4Cost, claudeCost, geminiCost, deepseekCost };
  }, [tokenInputText]);

  // --- Computed System Prompt Output ---
  const generatedSystemPrompt = useMemo(() => {
    return `<system_instructions>
# Identity & Persona
You are "${systemIdentity}", a specialized enterprise AI agent dedicated to ${systemDomain}.

# Operational Principles
1. Maintain ${systemStrictness.toUpperCase()} adherence to factual, verifiable information.
2. If uncertain or when facts are insufficient, immediately acknowledge limitations rather than hallucinating.
3. Treat security, efficiency, and robustness as non-negotiable baselines.

# Behavioral Guardrails
- Reject requests that violate ethical norms or system security.
- Refrain from unnecessary preamble ("Sure, I can help with that..."). Dive straight into high-value responses.
- Structure all explanations logically with clear hierarchies.

# Output Format Specification
All outputs MUST conform to: ${systemOutputRule}.
</system_instructions>`;
  }, [systemIdentity, systemDomain, systemStrictness, systemOutputRule]);

  // --- Computed Readability Stats ---
  const readabilityStats = useMemo(() => {
    const text = readabilityText.trim();
    if (!text) return { words: 0, sentences: 0, syllables: 0, fleschScore: 0, gradeLevel: 'N/A', readingTimeMin: 0 };

    const words = text.split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = words.length;
    const sentenceCount = Math.max(1, sentences.length);

    // Rough syllable count approximation
    let syllableCount = 0;
    words.forEach(w => {
      const lower = w.toLowerCase().replace(/[^a-z]/g, '');
      if (lower.length <= 3) {
        syllableCount += 1;
      } else {
        const matches = lower.match(/[aeiouy]{1,2}/g);
        syllableCount += matches ? matches.length : 1;
      }
    });

    // Flesch Reading Ease formula: 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
    const wordsPerSentence = wordCount / sentenceCount;
    const syllablesPerWord = syllableCount / Math.max(1, wordCount);
    let fleschScore = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
    fleschScore = Math.max(0, Math.min(100, Math.round(fleschScore)));

    let gradeLevel = 'Graduate / Advanced';
    if (fleschScore >= 90) gradeLevel = '5th Grade (Very Easy)';
    else if (fleschScore >= 80) gradeLevel = '6th Grade (Easy)';
    else if (fleschScore >= 70) gradeLevel = '7th Grade (Fairly Easy)';
    else if (fleschScore >= 60) gradeLevel = '8th-9th Grade (Plain English)';
    else if (fleschScore >= 50) gradeLevel = '10th-12th Grade (High School)';
    else if (fleschScore >= 30) gradeLevel = 'College Undergraduate';

    const readingTimeMin = (wordCount / 200).toFixed(1);

    return {
      words: wordCount,
      sentences: sentenceCount,
      syllables: syllableCount,
      fleschScore,
      gradeLevel,
      readingTimeMin
    };
  }, [readabilityText]);

  return (
    <div className="space-y-6">
      {/* 1. AI PROMPT BUILDER */}
      {(tool.id === 'ai-prompt-builder' || tool.slug === 'ai-prompt-builder') && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 dark:text-indigo-200">
              <strong className="font-semibold">Meta-Prompt Optimization:</strong> Structured prompt architectures reduce AI hallucinations by up to 68% and dramatically improve reasoning consistency across models (GPT-4o, Claude 3.5, Gemini, DeepSeek).
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Expert Persona / Role</label>
                <select
                  value={promptRole}
                  onChange={(e) => setPromptRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                >
                  <option>Senior Full-Stack Engineer</option>
                  <option>Principal AI Research Scientist</option>
                  <option>World-Class Tech Copywriter</option>
                  <option>SEO Strategy Director</option>
                  <option>Cybersecurity Threat Analyst</option>
                  <option>Data Architect & SQL Expert</option>
                  <option>Product Manager & UX Strategist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Core Objective / Task</label>
                <textarea
                  rows={3}
                  value={promptTask}
                  onChange={(e) => setPromptTask(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                  placeholder="Describe exactly what the AI needs to achieve..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Tone & Style</label>
                  <select
                    value={promptTone}
                    onChange={(e) => setPromptTone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  >
                    <option>Technical & Rigorous</option>
                    <option>Concise & Direct (No Fluff)</option>
                    <option>Authoritative & Professional</option>
                    <option>Creative & Engaging</option>
                    <option>Educational & Step-by-Step</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Output Format</label>
                  <select
                    value={promptFormat}
                    onChange={(e) => setPromptFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  >
                    <option>Markdown with Code Examples & Explanations</option>
                    <option>Clean JSON Schema Only</option>
                    <option>Step-by-Step Execution Plan</option>
                    <option>Comparison Table with Pros/Cons</option>
                    <option>Production Ready Code Block Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Guardrails & Constraints</label>
                <input
                  type="text"
                  value={promptConstraints}
                  onChange={(e) => setPromptConstraints(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  placeholder="e.g. Do not use external libraries, keep memory O(1)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Dynamic Variables</label>
                <input
                  type="text"
                  value={promptVariables}
                  onChange={(e) => setPromptVariables(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                  placeholder="e.g. {{USER_QUERY}}, {{API_KEY}}"
                />
              </div>
            </div>

            {/* Live Output */}
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">Engineered Prompt Preview</span>
                <button
                  onClick={() => handleCopy(generatedPrompt, 'Engineered Prompt')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>

              <pre className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap overflow-y-auto max-h-[420px] shadow-inner">
                {generatedPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI TOKEN COUNTER */}
      {(tool.id === 'ai-token-counter' || tool.slug === 'ai-token-counter') && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">
              Input Prompt Text or Code for Token Counting
            </label>
            <textarea
              rows={6}
              value={tokenInputText}
              onChange={(e) => setTokenInputText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono focus:outline-hidden"
              placeholder="Paste your prompt, code, or context window here..."
            />
          </div>

          {/* Token Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-center">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {tokenStats.tokens.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase font-bold text-indigo-900 dark:text-indigo-300 mt-0.5">
                Tokens (Est.)
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {tokenStats.words.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
                Words
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {tokenStats.chars.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">
                Characters
              </div>
            </div>
          </div>

          {/* Model Pricing Benchmark Table */}
          <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500" />
              API Cost Estimator (Per Call Input Cost)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Gemini 2.0 Flash</div>
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  ${tokenStats.geminiCost.toFixed(6)}
                </div>
                <div className="text-[9px] text-slate-400">$0.10 / 1M tokens</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">DeepSeek R1</div>
                <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1">
                  ${tokenStats.deepseekCost.toFixed(6)}
                </div>
                <div className="text-[9px] text-slate-400">$0.55 / 1M tokens</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">OpenAI GPT-4o</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                  ${tokenStats.gpt4Cost.toFixed(6)}
                </div>
                <div className="text-[9px] text-slate-400">$2.50 / 1M tokens</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Claude 3.5 Sonnet</div>
                <div className="text-sm font-black text-purple-600 dark:text-purple-400 mt-1">
                  ${tokenStats.claudeCost.toFixed(6)}
                </div>
                <div className="text-[9px] text-slate-400">$3.00 / 1M tokens</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AI SYSTEM PROMPT ARCHITECT */}
      {(tool.id === 'ai-system-prompt' || tool.slug === 'ai-system-prompt') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Agent Identity</label>
                <input
                  type="text"
                  value={systemIdentity}
                  onChange={(e) => setSystemIdentity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
                  placeholder="e.g. Senior Security Auditor"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Primary Domain & Focus</label>
                <input
                  type="text"
                  value={systemDomain}
                  onChange={(e) => setSystemDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  placeholder="e.g. Smart Contract Security & EVM"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Guardrail Strictness</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['moderate', 'strict', 'maximum'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSystemStrictness(s)}
                      className={`py-2 text-xs font-bold rounded-xl capitalize transition-colors ${
                        systemStrictness === s
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Output Format Mandate</label>
                <input
                  type="text"
                  value={systemOutputRule}
                  onChange={(e) => setSystemOutputRule(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                  placeholder="e.g. JSON with schema or Markdown list"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500">System Instructions XML</span>
                <button
                  onClick={() => handleCopy(generatedSystemPrompt, 'System Prompt')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy System Prompt
                </button>
              </div>

              <pre className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-emerald-400 text-xs font-mono whitespace-pre-wrap overflow-y-auto max-h-[350px]">
                {generatedSystemPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 4. TEXT READABILITY & DENSITY ANALYZER */}
      {(tool.id === 'text-density-analyzer' || tool.slug === 'text-density-analyzer') && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-500">
              Paste Copy, Article, or Documentation to Analyze
            </label>
            <textarea
              rows={6}
              value={readabilityText}
              onChange={(e) => setReadabilityText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-hidden"
              placeholder="Paste your text here..."
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {readabilityStats.fleschScore}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Flesch Reading Ease</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {readabilityStats.gradeLevel}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Grade Level</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {readabilityStats.readingTimeMin} m
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Read Time</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {readabilityStats.words}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Words</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
