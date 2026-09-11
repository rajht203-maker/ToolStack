import React, { useState, useMemo } from 'react';
import { CATEGORIES, TOOLS_DATA, PLATFORM_STATS } from '../../data/toolsData';
import { ToolItem, CategoryInfo } from '../../types';
import { ToolCard } from '../tools/ToolCard';
import { IconRenderer } from '../common/IconRenderer';
import { ProblemSolverBar } from '../common/ProblemSolverBar';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Layers, 
  ArrowRight,
  Lock,
  Cpu,
  CheckCircle,
  HelpCircle,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onSelectTool: (tool: ToolItem) => void;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTool,
  selectedCategory,
  onSelectCategory,
  onOpenSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'problem' | 'standard'>('problem');

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCat = !selectedCategory || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Trending / popular tools for hero strip
  const trendingTools = useMemo(() => {
    return TOOLS_DATA.filter(t => t.trending || t.popular).slice(0, 4);
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with Problem Solver Bar */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-8 text-center px-4">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>270+ Working Utilities • Browser Executed</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-slate-900 dark:text-white">
            Define your problem.<br />
            <span className="text-indigo-600 dark:text-indigo-400">We find the exact tool.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            270+ professional tools for developers, designers, businesses, and creators. Simply describe what you need to solve or search directly.
          </p>

          {/* Search Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSearchMode('problem')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                searchMode === 'problem'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Problem Solver Search</span>
            </button>
            <button
              onClick={() => setSearchMode('standard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                searchMode === 'standard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Standard Tool Search</span>
            </button>
          </div>

          {/* Dynamic Search Interface */}
          {searchMode === 'problem' ? (
            <div className="pt-2">
              <ProblemSolverBar onSelectTool={onSelectTool} />
            </div>
          ) : (
            <div className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 270+ tools (Business Card, QR Logo, PDF, Image, SQL, Regex...)"
                  className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                />
                <button
                  onClick={onOpenSearch}
                  className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Client-Side
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-500" />
              Zero Remote Logging
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              140+ Working Utilities
            </span>
          </div>
        </div>
      </section>

      {/* Trending Tools Quick Showcase (Only shown when not filtering) */}
      {!searchQuery && !selectedCategory && searchMode !== 'problem' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Trending & Most Used Tools
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Daily essentials</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
            ))}
          </div>
        </section>
      )}

      {/* Category Pills Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {selectedCategory ? `${CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Category'} Tools` : 'Browse by Category'}
            </h2>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold uppercase tracking-wider"
            >
              Show All Categories
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500'
            }`}
          >
            All Tools ({TOOLS_DATA.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500'
              }`}
            >
              <IconRenderer name={cat.icon} className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mt-6">
          {filteredTools.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Search className="w-8 h-8 mx-auto text-slate-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                No tools match &quot;{searchQuery}&quot;
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try describing your problem in the Problem Solver or search for terms like &quot;compress&quot;, &quot;format&quot;, &quot;webhook&quot;, or &quot;loan&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory(null);
                }}
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-md shadow-indigo-200 dark:shadow-none"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Highlights Banner: Privacy & Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-900/90 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Security Status</p>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>End-to-End Client Encrypted</span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight">
              Your Files Never Leave Your Device.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Unlike other tool suites that upload your confidential PDFs, private images, and database queries to remote servers, ToolStack computes everything inside your web browser using HTML5 Canvas, Web Crypto, and WebAssembly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero server logs or remote uploads</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited file processing forever</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GDPR & HIPAA compliant architecture</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant local hardware execution</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
