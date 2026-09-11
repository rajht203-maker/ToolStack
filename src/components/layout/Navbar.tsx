import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Wrench, 
  Search, 
  Heart, 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Shield, 
  Sparkles, 
  Layers, 
  ChevronDown,
  Menu,
  PanelLeft
} from 'lucide-react';
import { CATEGORIES } from '../../data/toolsData';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenProfile?: () => void;
  onSelectCategory: (catId: string | null) => void;
  onGoHome: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenFavorites,
  onOpenAuth,
  onOpenAdmin,
  onOpenProfile,
  onSelectCategory,
  onGoHome,
  darkMode,
  onToggleDarkMode,
  onToggleSidebar
}) => {
  const { user, profile, isAdmin, signOutUser, favorites } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Sidebar Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle sidebar navigation"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Tool<span className="text-indigo-600 dark:text-indigo-400">Stack</span>
                </span>
                <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded-full uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/60">
                  v4.0
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight block">
                270+ Free & Member Tools
              </span>
            </div>
          </button>

          {/* Category Dropdown Navigation */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Categories</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {categoriesDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setCategoriesDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-40 grid grid-cols-1 gap-1">
                  <button
                    onClick={() => {
                      onSelectCategory(null);
                      setCategoriesDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
                  >
                    <span>All 270+ Tools</span>
                    <span className="text-indigo-600 font-bold">270+</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setCategoriesDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center Search Bar Trigger */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-full text-xs text-slate-500 dark:text-slate-400 transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <span className="font-medium">Search 50+ tools (PDF, JSON, Image...)...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Your Favorites & History"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Admin Panel Button (if admin) */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold hover:bg-amber-500/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* User Auth Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    (user.displayName || user.email || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-40 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/60">
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-100 truncate">
                        {user.displayName || 'ToolStack User'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                    </div>

                    {onOpenProfile && (
                      <button
                        onClick={() => {
                          onOpenProfile();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>My Account & Profile</span>
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        onClick={() => {
                          onOpenAdmin();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onOpenFavorites();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Favorites & History</span>
                    </button>

                    <button
                      onClick={() => {
                        signOutUser();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full shadow-md shadow-indigo-200 dark:shadow-none transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
