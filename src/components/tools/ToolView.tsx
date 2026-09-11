import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { ToolDispatcher } from './ToolDispatcher';
import { ToolCard } from './ToolCard';
import { getRelatedTools, CATEGORIES } from '../../data/toolsData';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronRight, 
  Heart, 
  Share2, 
  Check, 
  HelpCircle, 
  ListOrdered, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  Lock
} from 'lucide-react';

interface ToolViewProps {
  tool: ToolItem;
  onBack: () => void;
  onSelectTool: (tool: ToolItem) => void;
  onSelectCategory: (catId: string) => void;
  onOpenAuth?: () => void;
}

export const ToolView: React.FC<ToolViewProps> = ({
  tool,
  onBack,
  onSelectTool,
  onSelectCategory,
  onOpenAuth
}) => {
  const { user, isFavorite, toggleFavorite, addHistory } = useAuth();
  const favorited = isFavorite(tool.id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const relatedTools = getRelatedTools(tool);
  const categoryInfo = CATEGORIES.find(c => c.id === tool.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleToolSuccess = (summary: string) => {
    addHistory(tool.id, tool.name, summary);
    setSuccessToast(summary);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={onBack}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
        <button
          onClick={() => onSelectCategory(tool.category)}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium capitalize"
        >
          {categoryInfo?.name || tool.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
          {tool.name}
        </span>
      </nav>

      {/* Tool Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
              <IconRenderer name={tool.icon} className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {tool.name}
                </h1>
                {tool.requiresAuth && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Member Access
                  </span>
                )}
                {tool.badge && !tool.requiresAuth && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                    {tool.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Client-Side
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => toggleFavorite(tool.id, tool.name)}
              className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                favorited
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-200 dark:border-rose-900'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Primary Interactive Workspace */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          {tool.requiresAuth && !user ? (
            <div className="py-12 px-6 text-center max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                  <Sparkles className="w-3.5 h-3.5" /> Free Member Access
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Sign in to access {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  This high-productivity utility is part of our Member Suite. Sign in or register a free account to unlock instant access, save custom configurations, and track your execution history.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" /> Sign In or Register Free
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500">
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> 100% Free
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Client-Side
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Save Presets
                </div>
              </div>
            </div>
          ) : (
            <ToolDispatcher tool={tool} onSuccess={handleToolSuccess} />
          )}
        </div>
      </div>

      {/* Guide: How to Use & FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step by step guide */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              How to use {tool.name}
            </h3>
          </div>
          <ol className="space-y-2.5">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span className="pt-0.5 leading-relaxed font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {faq.question}
                </div>
                <div className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Related Tools You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} onSelect={onSelectTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
