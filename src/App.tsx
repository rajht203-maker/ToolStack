import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { ToolView } from './components/tools/ToolView';
import { SearchModal } from './components/common/SearchModal';
import { FavoritesDrawer } from './components/common/FavoritesDrawer';
import { AuthModal } from './components/common/AuthModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { getToolBySlug, TOOLS_DATA } from './data/toolsData';
import { ToolItem } from './types';
import { Sparkles, Shield, X } from 'lucide-react';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('toolstack_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('toolstack_dark_mode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Route resolver: parses pathname, search params, or hash
  const resolveRoute = useCallback(() => {
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace(/^#\/?/, '');

    let toolSlug = searchParams.get('tool') || hash;

    if (!toolSlug) {
      // Check /tools/[slug] or /calculators/[slug]
      const toolMatch = pathname.match(/^\/(?:tools|calculators)\/([^/]+)/);
      if (toolMatch && toolMatch[1]) {
        toolSlug = toolMatch[1];
      }
    }

    if (toolSlug) {
      const found = getToolBySlug(toolSlug);
      if (found) {
        setActiveTool(found);
        setAdminPanelOpen(false);
        return;
      }
    }

    if (pathname === '/admin' || searchParams.get('admin') === 'true') {
      setAdminPanelOpen(true);
      setActiveTool(null);
      return;
    }

    // Default: home
    setActiveTool(null);
    setAdminPanelOpen(false);
  }, []);

  // Initialize route on mount and listen to browser popstate
  useEffect(() => {
    resolveRoute();

    const handlePopState = () => {
      resolveRoute();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [resolveRoute]);

  // Sync activeTool with URL & Document Title & SEO meta tags
  useEffect(() => {
    if (activeTool) {
      const newPath = activeTool.category === 'calculator' 
        ? `/calculators/${activeTool.slug}` 
        : `/tools/${activeTool.slug}`;

      if (window.location.pathname !== newPath) {
        window.history.pushState({ toolId: activeTool.id }, '', newPath);
      }
      document.title = `${activeTool.seoTitle || activeTool.name} | ToolStack`;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && activeTool.seoDescription) {
        metaDesc.setAttribute('content', activeTool.seoDescription);
      }
    } else if (adminPanelOpen) {
      if (window.location.pathname !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
      document.title = 'Admin Control Center | ToolStack';
    } else {
      if (window.location.pathname !== '/' && window.location.search === '') {
        window.history.pushState({}, '', '/');
      }
      document.title = 'ToolStack - 50+ Free Production Online Tools';
    }

    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTool, adminPanelOpen]);

  // Global Keyboard Shortcuts (Cmd+K or Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setFavoritesDrawerOpen(false);
        setAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTool = (tool: ToolItem) => {
    setActiveTool(tool);
    setAdminPanelOpen(false);
  };

  const handleSelectCategory = (catId: string | null) => {
    setSelectedCategory(catId);
    setActiveTool(null);
    setAdminPanelOpen(false);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleGoHome = () => {
    setActiveTool(null);
    setSelectedCategory(null);
    setAdminPanelOpen(false);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 font-sans transition-colors">
        {/* Top Announcement Banner */}
        {showBanner && (
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white text-xs py-2 px-4 flex items-center justify-between shadow-xs">
            <div className="flex-1 flex items-center justify-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                <strong>ToolStack 4.0:</strong> All 270+ utilities operate 100% inside your browser with zero data tracking.
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 text-white/80 hover:text-white rounded-md transition-colors"
              title="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Bar */}
        <Navbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenFavorites={() => setFavoritesDrawerOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenAdmin={() => setAdminPanelOpen(true)}
          onSelectCategory={handleSelectCategory}
          onGoHome={handleGoHome}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onToggleSidebar={() => {
            if (window.innerWidth < 768) {
              setMobileSidebarOpen(prev => !prev);
            } else {
              setSidebarOpen(prev => !prev);
            }
          }}
        />

        {/* Main Body with Sidebar Layout */}
        <div className="flex-1 flex w-full">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(prev => !prev)}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onGoHome={handleGoHome}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenFavorites={() => setFavoritesDrawerOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
            onSelectTool={handleSelectTool}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            isMobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          <div className="flex-1 min-w-0 flex flex-col">
            {/* Main Content Area */}
            <main className="flex-1">
              {adminPanelOpen ? (
                <AdminPanel
                  onClose={() => setAdminPanelOpen(false)}
                  onSelectTool={handleSelectTool}
                />
              ) : activeTool ? (
                <ToolView
                  tool={activeTool}
                  onBack={handleGoHome}
                  onSelectTool={handleSelectTool}
                  onSelectCategory={(catId) => handleSelectCategory(catId)}
                  onOpenAuth={() => setAuthModalOpen(true)}
                />
              ) : (
                <HomePage
                  onSelectTool={handleSelectTool}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  onOpenSearch={() => setSearchModalOpen(true)}
                />
              )}
            </main>

            {/* Footer */}
            <Footer
              onSelectCategory={handleSelectCategory}
              onOpenAdmin={() => setAdminPanelOpen(true)}
            />
          </div>
        </div>

        {/* Global Modals & Drawers */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectTool={handleSelectTool}
        />

        <FavoritesDrawer
          isOpen={favoritesDrawerOpen}
          onClose={() => setFavoritesDrawerOpen(false)}
          onSelectTool={handleSelectTool}
        />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
