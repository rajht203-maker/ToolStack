import React from 'react';
import { CATEGORIES, TOOLS_DATA } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { IconRenderer } from '../common/IconRenderer';
import {
  Home,
  Sparkles,
  Layers,
  Lock,
  Globe,
  Flame,
  Heart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Moon,
  Sun,
  X,
  Search,
  SlidersHorizontal,
  Compass,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenAuth: () => void;
  onSelectTool?: (tool: ToolItem) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  selectedCategory,
  onSelectCategory,
  onGoHome,
  onOpenSearch,
  onOpenFavorites,
  onOpenAuth,
  darkMode,
  onToggleDarkMode,
  isMobileOpen,
  onCloseMobile
}) => {
  const { user, profile, favorites } = useAuth();

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const map: Record<string, number> = {};
    TOOLS_DATA.forEach(t => {
      map[t.category] = (map[t.category] || 0) + 1;
    });
    return map;
  }, []);

  const totalToolsCount = TOOLS_DATA.length;
  const memberToolsCount = TOOLS_DATA.filter(t => t.requiresAuth).length;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all select-none">
      {/* Top Header / Brand */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            T
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white block leading-tight">
                Tool<span className="text-indigo-600 dark:text-indigo-400">Stack</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                {totalToolsCount}+ Utilities Suite
              </span>
            </div>
          )}
        </div>

        {/* Toggle desktop button */}
        <button
          onClick={onToggle}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Close mobile button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
        {/* Quick Discovery Actions */}
        <div className="space-y-1">
          <button
            onClick={() => {
              onGoHome();
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCategory === null
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Overview & All Tools"
          >
            <Home className="w-4 h-4 shrink-0" />
            {isOpen && <span className="flex-1 text-left">All Tools Library</span>}
            {isOpen && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                {totalToolsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onOpenSearch();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search or solve problem"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            {isOpen && (
              <div className="flex-1 flex items-center justify-between text-left">
                <span>Problem Solver</span>
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-md font-bold">
                  AI Match
                </span>
              </div>
            )}
          </button>

          <button
            onClick={() => {
              onOpenFavorites();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Saved Tools"
          >
            <Heart className="w-4 h-4 text-rose-500 shrink-0" />
            {isOpen && <span className="flex-1 text-left">Saved Favorites</span>}
            {isOpen && favorites.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] font-mono font-bold">
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories Section */}
        <div>
          {isOpen && (
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Categories</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
          )}

          <div className="space-y-1">
            {CATEGORIES.map(cat => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={`${cat.name} (${count} tools)`}
                >
                  <div className={`shrink-0 ${isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    <IconRenderer iconName={cat.icon} className="w-4 h-4" />
                  </div>
                  {isOpen && <span className="flex-1 text-left truncate">{cat.name}</span>}
                  {isOpen && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier Section (Members vs Free) */}
        <div>
          {isOpen && (
            <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tool Access Tiers
            </div>
          )}

          <div className="space-y-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                  <Lock className="w-3.5 h-3.5" /> Members Suite
                </span>
                <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded">
                  {memberToolsCount} tools
                </span>
              </div>
              {isOpen && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  Sign in to unlock Webhook HMAC, SQL-to-TS, Dockerfile builders, and enterprise utilities.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer / Settings / User */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
        {/* Dark Mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          title="Toggle color theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400 shrink-0" /> : <Moon className="w-4 h-4 text-slate-500 shrink-0" />}
          {isOpen && <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>}
        </button>

        {/* User Account Info / Sign In button */}
        {user ? (
          <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {profile?.displayName || 'Member'}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> All Tools Unlocked
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              onOpenAuth();
              onCloseMobile();
            }}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            {isOpen && <span>Sign In for 140+ Tools</span>}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
