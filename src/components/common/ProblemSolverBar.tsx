import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ToolItem } from '../../types';
import { findToolsForProblem, POPULAR_PROBLEMS, ProblemMatchResult } from '../../utils/problemMatcher';
import { IconRenderer } from './IconRenderer';
import {
  Sparkles,
  HelpCircle,
  ArrowRight,
  X,
  CheckCircle2,
  Lock,
  Flame,
  Search,
  ChevronRight,
  Layers
} from 'lucide-react';

interface ProblemSolverBarProps {
  onSelectTool: (tool: ToolItem) => void;
  className?: string;
  autoFocus?: boolean;
}

export const ProblemSolverBar: React.FC<ProblemSolverBarProps> = ({
  onSelectTool,
  className = '',
  autoFocus = false
}) => {
  const [problemText, setProblemText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const matchedResults = useMemo<ProblemMatchResult[]>(() => {
    return findToolsForProblem(problemText);
  }, [problemText]);

  const handleApplyPreset = (problem: string) => {
    setProblemText(problem);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setProblemText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Search Input Box */}
      <div className={`relative bg-white dark:bg-slate-900 border-2 transition-all rounded-3xl shadow-lg p-2 sm:p-2.5 ${
        isFocused
          ? 'border-indigo-500 shadow-indigo-500/10 ring-4 ring-indigo-500/10 dark:ring-indigo-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}>
        <div className="flex items-center gap-3 px-3 py-1.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                AI Problem Solver
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">• Describe your goal in plain words</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={problemText}
              onChange={e => setProblemText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="e.g. My PDF is too big to email, I need to test a Stripe webhook, or generate fake test data..."
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
            />
          </div>

          {problemText ? (
            <button
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Clear problem"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-500 shrink-0">
              <Search className="w-3.5 h-3.5 text-indigo-500" />
              <span>Smart Match</span>
            </div>
          )}
        </div>

        {/* Preset Problem Suggestion Chips */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-1 px-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-indigo-500" /> Popular problems:
          </span>
          {POPULAR_PROBLEMS.slice(0, 5).map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(item.problem)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 font-medium text-[11px] transition-colors border border-slate-200/60 dark:border-slate-700/60 shrink-0"
            >
              {item.problem.length > 34 ? `${item.problem.slice(0, 34)}...` : item.problem}
            </button>
          ))}
        </div>
      </div>

      {/* Matched Tools Results Area */}
      {problemText.trim().length > 2 && (
        <div className="mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-5 sm:p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tools that solve this problem
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black">
                {matchedResults.length} match{matchedResults.length === 1 ? '' : 'es'} found
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline font-medium">
              Click any tool to launch directly
            </span>
          </div>

          {matchedResults.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No exact automated match for this specific problem statement.
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try rephrasing with keywords like &quot;PDF&quot;, &quot;compress&quot;, &quot;webhook&quot;, &quot;loan&quot;, &quot;SQL&quot;, or &quot;generate data&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {matchedResults.map(({ tool, reason, score }) => (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="group relative p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/80 dark:hover:border-indigo-500/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-850 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                          <IconRenderer iconName={tool.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {tool.name}
                            </span>
                            {tool.requiresAuth ? (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                                <Lock className="w-2.5 h-2.5" /> Members
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                                Free
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium capitalize">
                            Category: {tool.category}
                          </span>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* How this solves the problem */}
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-950 dark:text-indigo-200">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{reason}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Relevance: {Math.min(100, Math.round(score * 1.5))}% match</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                      Open Tool <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
