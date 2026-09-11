import React from 'react';
import { ToolItem } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { useAuth } from '../../context/AuthContext';
import { Heart, ArrowRight, Lock } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  onSelect: (tool: ToolItem) => void;
}

const getCategoryIconStyles = (category: string) => {
  switch (category) {
    case 'pdf':
      return 'bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white';
    case 'image':
      return 'bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white';
    case 'developer':
      return 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white';
    case 'text':
      return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white';
    case 'calculator':
      return 'bg-pink-50 dark:bg-pink-950/40 text-pink-500 dark:text-pink-400 group-hover:bg-pink-500 group-hover:text-white';
    case 'converter':
      return 'bg-violet-50 dark:bg-violet-950/40 text-violet-500 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white';
    case 'security':
      return 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white';
    case 'seo':
      return 'bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white';
    default:
      return 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white';
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const { isFavorite, toggleFavorite } = useAuth();
  const favorited = isFavorite(tool.id);
  const iconColorClasses = getCategoryIconStyles(tool.category);

  return (
    <div
      onClick={() => onSelect(tool)}
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/60 transition-colors group cursor-pointer flex flex-col justify-between min-h-[175px]"
    >
      <div>
        {/* Top bar: Category Icon & Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${iconColorClasses}`}>
            <IconRenderer name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.requiresAuth && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> Login
              </span>
            )}
            {tool.badge && !tool.requiresAuth && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                {tool.badge}
              </span>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(tool.id, tool.name);
              }}
              className={`p-1.5 rounded-full transition-colors ${
                favorited
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-slate-300 dark:text-slate-600 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Name & description */}
        <h3 className="font-bold text-lg mb-1 tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Footer category tag & CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
        <span className="capitalize text-slate-400 font-medium tracking-wide">{tool.category}</span>
        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

