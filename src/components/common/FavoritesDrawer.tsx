import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TOOLS_DATA } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { IconRenderer } from './IconRenderer';
import { X, Heart, History, Trash2, ArrowRight, Sparkles } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTool
}) => {
  const { favorites, history, removeFavorite, clearHistory, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');

  if (!isOpen) return null;

  const favoriteTools = favorites
    .map(f => TOOLS_DATA.find(t => t.id === f.toolId))
    .filter((t): t is ToolItem => t !== undefined);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Your Workspace
              </span>
              {user && (
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] rounded-full font-bold">
                  Synced
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'favorites'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Favorites ({favorites.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Recent History ({history.length})</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'favorites' ? (
              favoriteTools.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                  <Heart className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                  <p className="font-semibold text-slate-600 dark:text-slate-300">No favorite tools yet</p>
                  <p className="max-w-xs mx-auto">
                    Click the heart icon on any tool card to pin it here for 1-click access.
                  </p>
                </div>
              ) : (
                favoriteTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 group"
                  >
                    <button
                      onClick={() => {
                        onSelectTool(tool);
                        onClose();
                      }}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <IconRenderer name={tool.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 dark:text-slate-100 text-xs truncate group-hover:text-indigo-600">
                          {tool.name}
                        </div>
                        <div className="text-[11px] text-slate-400 capitalize">{tool.category}</div>
                      </div>
                    </button>

                    <button
                      onClick={() => removeFavorite(tool.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )
            ) : (
              <div>
                {history.length > 0 && (
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={clearHistory}
                      className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear History
                    </button>
                  </div>
                )}

                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                    <History className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="font-semibold text-slate-600 dark:text-slate-300">No activity history yet</p>
                    <p className="max-w-xs mx-auto">
                      Tools you execute will automatically log their results here for your reference.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {history.map((item) => {
                      const t = TOOLS_DATA.find(x => x.id === item.toolId);
                      return (
                        <div
                          key={item.id}
                          className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {item.toolName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px]">{item.summary}</p>
                          {t && (
                            <button
                              onClick={() => {
                                onSelectTool(t);
                                onClose();
                              }}
                              className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] hover:underline flex items-center gap-1 pt-1"
                            >
                              <span>Reopen Tool</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
