import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ToolItem } from '../../types';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Star, 
  History, 
  Bookmark, 
  Download, 
  Trash2, 
  X, 
  Check, 
  Edit3, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
  onOpenAdmin: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
}) => {
  const { 
    user, 
    profile, 
    isAdmin, 
    adminOverride,
    toggleAdminOverride, 
    updateUserProfile,
    favorites, 
    history, 
    presets,
    clearHistory,
    signOutUser
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'data'>('profile');
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || user?.displayName || 'ToolStack User');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setIsSaving(true);
    try {
      await updateUserProfile({ displayName: displayName.trim() });
      setEditingName(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.warn('Failed to update name:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      user: {
        uid: user.uid,
        email: user.email,
        displayName: profile?.displayName || user.displayName,
        role: profile?.role || (isAdmin ? 'admin' : 'user')
      },
      favorites,
      history,
      presets
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolstack-user-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formattedDate = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-xs shadow-indigo-300 dark:shadow-none">
              {(profile?.displayName || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                User Account & Workspace
                {isAdmin && (
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> ADMIN
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 flex gap-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'stats'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Workspace Activity</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'data'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Privacy & Backup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Personal Details</span>
                  {saveSuccess && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 animate-in fade-in">
                      <Check className="w-3.5 h-3.5" /> Display name saved
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                      Display Name
                    </label>
                    {editingName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-indigo-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-hidden"
                          placeholder="Your full or screen name"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveName}
                          disabled={isSaving}
                          className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Save
                        </button>
                        <button
                          onClick={() => setEditingName(false)}
                          className="px-3 py-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {profile?.displayName || user.displayName || 'ToolStack User'}
                        </span>
                        <button
                          onClick={() => setEditingName(true)}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5 truncate">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        {user.email}
                      </span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="block text-[10px] uppercase font-bold text-slate-400">Account Type</span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mt-0.5">
                        <Shield className="w-3 h-3 text-indigo-500 shrink-0" />
                        {isAdmin ? 'System Administrator' : 'Standard Member'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Member Since</span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      {formattedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Access Panel Link or Test Switcher */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider">
                      Administrator Console Access
                    </h3>
                  </div>
                  {isAdmin && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      AUTHORIZED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Manage all 75+ tools, review system health, monitor user registrations, and deploy global site announcements.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {isAdmin ? (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAdmin();
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Launch Admin Panel
                    </button>
                  ) : (
                    <button
                      onClick={toggleAdminOverride}
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Enable Demo Admin Mode
                    </button>
                  )}

                  {isAdmin && (
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer ml-auto">
                      <input
                        type="checkbox"
                        checked={adminOverride}
                        onChange={toggleAdminOverride}
                        className="w-3.5 h-3.5 text-indigo-600 rounded"
                      />
                      Override Mode Active
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-5">
              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <div className="text-xl font-black text-slate-900 dark:text-white">{favorites.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Favorites</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <History className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <div className="text-xl font-black text-slate-900 dark:text-white">{history.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Tool Runs</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <Bookmark className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                  <div className="text-xl font-black text-slate-900 dark:text-white">{presets.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Presets</div>
                </div>
              </div>

              {/* Recent History Stream */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Recent Executions ({history?.length || 0})
                </h4>

                {(!history || history.length === 0) ? (
                  <div className="p-6 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-400">
                    No recent executions logged yet. Run any tool to record its activity.
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
                    {(history || []).slice(0, 8).map((item) => (
                      <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {item.toolName}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{item.summary}</div>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Export Workspace Data
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Download a complete JSON snapshot containing all your bookmarked favorites, execution history, and saved configuration presets.
                </p>
                <button
                  onClick={handleExportData}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download JSON Backup
                </button>
              </div>

              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  Clear Workspace History
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Remove all tool execution history logs from your account and local storage permanently.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your entire execution history?')) {
                      clearHistory();
                    }
                  }}
                  className="mt-2 px-4 py-2 bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold transition-colors"
                >
                  Clear Tool History
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <button
            onClick={() => {
              signOutUser();
              onClose();
            }}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Sign out of this device
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
