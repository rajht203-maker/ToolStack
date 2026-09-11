import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles, CheckCircle2, Lock, HelpCircle } from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { IconRenderer } from './IconRenderer';
import { findToolsForProblem, POPULAR_PROBLEMS } from '../../utils/problemMatcher';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'problem' | 'keyword'>('problem');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyword search matches
  const keywordFilteredTools = useMemo(() => {
    if (!query.trim()) return TOOLS_DATA.filter(t => t.popular).slice(0, 8);
    const q = query.toLowerCase();
    return TOOLS_DATA.filter(t => {
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [query]);

  // Problem solver matches
  const problemMatchedTools = useMemo(() => {
    if (!query.trim()) return [];
    return findToolsForProblem(query);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Tab switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 pt-3 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('problem')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'problem'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Problem Solver (Describe Intent)
          </button>
          <button
            onClick={() => setActiveTab('keyword')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'keyword'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            Direct Keyword Search
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          {activeTab === 'problem' ? (
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeTab === 'problem'
                ? "Describe your problem (e.g. My PDF is too big, simulate stripe webhook, loan payments)..."
                : "Search 270+ tools by name, category, or tag..."
            }
            className="w-full px-3 bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Problem Suggestions if Problem tab & query empty */}
        {activeTab === 'problem' && !query && (
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" /> Click a common problem to solve:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_PROBLEMS.slice(0, 6).map((item, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(item.problem)}
                  className="px-2.5 py-1 text-xs rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                >
                  {item.problem}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {activeTab === 'problem' ? (
            // PROBLEM SOLVER TAB
            query.trim() ? (
              problemMatchedTools.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No direct tools matched this specific wording. Try &quot;compress PDF&quot;, &quot;format SQL&quot;, &quot;webhook&quot;, &quot;mock data&quot;, &quot;regex&quot;, etc.
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Solved with {problemMatchedTools.length} tools</span>
                    <span className="text-slate-400 font-normal">Ranked by relevance</span>
                  </div>
                  {problemMatchedTools.map(({ tool, reason }) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        onSelectTool(tool);
                        onClose();
                      }}
                      className="w-full p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/80 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 transition-all flex flex-col gap-2 text-left group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <IconRenderer iconName={tool.icon} className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 transition-colors">
                                {tool.name}
                              </span>
                              {tool.requiresAuth && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded">
                                  <Lock className="w-2.5 h-2.5" /> Members
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize">{tool.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{reason}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Type your goal or problem above to see which tools solve it.
              </div>
            )
          ) : (
            // KEYWORD TAB
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>{query ? `Search Results (${keywordFilteredTools.length})` : 'Popular Utilities'}</span>
                {!query && (
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="w-3 h-3" /> Trending
                  </span>
                )}
              </div>

              {keywordFilteredTools.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No matching tools found for &quot;{query}&quot;.
                </div>
              ) : (
                keywordFilteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <IconRenderer iconName={tool.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-100 text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tool.name}
                          </span>
                          {tool.requiresAuth && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded text-[10px] font-bold">
                              <Lock className="w-2.5 h-2.5" /> Members
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
