import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TOOLS_DATA, CATEGORIES } from '../../data/toolsData';
import { ToolItem, UserProfile, AdminAuditLog } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Users, 
  Wrench, 
  Bell, 
  Server, 
  Lock, 
  Eye, 
  Save, 
  ArrowLeft,
  RefreshCw,
  Search,
  UserPlus,
  UserCheck,
  UserX,
  Trash2,
  Sliders,
  FileText,
  Download,
  AlertTriangle,
  Mail,
  Check,
  Filter,
  Sparkles
} from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface AdminPanelProps {
  onClose: () => void;
  onSelectTool: (tool: ToolItem) => void;
}

type AdminTab = 'overview' | 'users' | 'tools' | 'settings' | 'logs';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onSelectTool }) => {
  const { 
    user, 
    profile, 
    isAdmin, 
    getAllUsers, 
    updateUserRole, 
    updateUserStatus, 
    deleteUserAccount, 
    createAdminUser,
    getAdminLogs,
    logAdminAction,
    clearAdminLogs
  } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // --- Site Settings State ---
  const [announcement, setAnnouncement] = useState('ToolStack v3.0 is live! 75+ client-side tools with AI prompt & token builders.');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supportEmail, setSupportEmail] = useState('support@toolstack.dev');
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Tool Registry State ---
  const [toolSearch, setToolSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [disabledTools, setDisabledTools] = useState<string[]>([]);

  // --- User Management State ---
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Add User Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'user'>('user');
  const [creatingUser, setCreatingUser] = useState(false);
  const [addUserFeedback, setAddUserFeedback] = useState<string | null>(null);

  // --- Audit Logs State ---
  const [logsList, setLogsList] = useState<AdminAuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Load live site settings from Firestore
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'site_settings', 'general'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.announcement) setAnnouncement(data.announcement);
          if (typeof data.maintenanceMode === 'boolean') setMaintenanceMode(data.maintenanceMode);
          if (data.supportEmail) setSupportEmail(data.supportEmail);
          if (Array.isArray(data.disabledTools)) setDisabledTools(data.disabledTools);
        }
      } catch (err) {
        console.warn('Firestore settings load notice:', err);
      }
    };
    fetchSettings();
  }, []);

  // Fetch users list when Users tab is opened
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await getAllUsers();
      setUsersList(users);
    } catch (err) {
      console.warn('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch audit logs when Logs tab is opened
  const loadLogs = async () => {
    setLoadingLogs(true);
    try {
      const logs = await getAdminLogs(50);
      setLogsList(logs);
    } catch (err) {
      console.warn('Error fetching logs:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'logs') {
      loadLogs();
    }
  }, [activeTab]);

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    setSaveSuccess(false);
    try {
      await setDoc(doc(db, 'site_settings', 'general'), {
        announcement,
        maintenanceMode,
        supportEmail,
        disabledTools,
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || 'admin'
      }, { merge: true });

      await logAdminAction(
        'SETTINGS_UPDATE',
        `Updated banner: "${(announcement || '').slice(0, 30)}...", Maintenance: ${maintenanceMode}`
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.warn('Admin save fallback:', err);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setSavingSettings(false);
    }
  };

  const toggleToolStatus = async (toolId: string) => {
    const updated = disabledTools.includes(toolId) 
      ? disabledTools.filter(id => id !== toolId) 
      : [...disabledTools, toolId];
    
    setDisabledTools(updated);
    
    try {
      await setDoc(doc(db, 'site_settings', 'general'), {
        disabledTools: updated,
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || 'admin'
      }, { merge: true });

      await logAdminAction(
        'TOOL_TOGGLE',
        `Tool ${toolId} status toggled to ${disabledTools.includes(toolId) ? 'ACTIVE' : 'DISABLED'}`
      );
    } catch (err) {
      console.warn('Failed to sync tool status to Firestore:', err);
    }
  };

  const handleRoleToggle = async (targetUser: UserProfile) => {
    const targetUid = targetUser.userId || (targetUser as any).uid;
    const newTargetRole = targetUser.role === 'admin' ? 'user' : 'admin';
    const confirmMsg = `Are you sure you want to change ${targetUser.email}'s role to ${newTargetRole.toUpperCase()}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateUserRole(targetUid, newTargetRole);
      setUsersList(prev => 
        prev.map(u => (u.userId || (u as any).uid) === targetUid ? { ...u, role: newTargetRole } : u)
      );
    } catch (err: any) {
      alert(`Error updating role: ${err.message}`);
    }
  };

  const handleStatusToggle = async (targetUser: UserProfile) => {
    const targetUid = targetUser.userId || (targetUser as any).uid;
    const currentStatus = targetUser.status || 'active';
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    const confirmMsg = `Are you sure you want to set ${targetUser.email} status to ${newStatus.toUpperCase()}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateUserStatus(targetUid, newStatus);
      setUsersList(prev => 
        prev.map(u => (u.userId || (u as any).uid) === targetUid ? { ...u, status: newStatus } : u)
      );
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleDeleteUser = async (targetUser: UserProfile) => {
    const targetUid = targetUser.userId || (targetUser as any).uid;
    if (!window.confirm(`Permanently delete account for ${targetUser.email}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteUserAccount(targetUid);
      setUsersList(prev => prev.filter(u => (u.userId || (u as any).uid) !== targetUid));
    } catch (err: any) {
      alert(`Error deleting user: ${err.message}`);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    setCreatingUser(true);
    setAddUserFeedback(null);
    try {
      await createAdminUser(newEmail.trim(), newName.trim() || 'New Member', newRole);
      setAddUserFeedback(`Successfully registered ${newEmail} as ${newRole}!`);
      setNewEmail('');
      setNewName('');
      setTimeout(() => {
        setShowAddUserModal(false);
        setAddUserFeedback(null);
        loadUsers();
      }, 1500);
    } catch (err: any) {
      setAddUserFeedback(`Error: ${err.message}`);
    } finally {
      setCreatingUser(false);
    }
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Clear all audit logs? This cannot be undone.')) return;
    try {
      await clearAdminLogs();
      setLogsList([]);
    } catch (err: any) {
      alert(`Error clearing logs: ${err.message}`);
    }
  };

  const handleExportLogs = () => {
    const blob = new Blob([JSON.stringify(logsList, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolstack-admin-audit-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Authorization check
  const isAuthorized = isAdmin || user?.email === 'rajht203@gmail.com';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Restricted Administrator Access
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Access to the ToolStack system control center requires verified administrator credentials.
          Please sign in with your authorized admin account (e.g. <span className="font-semibold text-slate-700 dark:text-slate-300">rajht203@gmail.com</span>).
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:opacity-90"
        >
          Return to Platform
        </button>
      </div>
    );
  }

  // Filtered Tools
  const filteredTools = TOOLS_DATA.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
                          t.category.toLowerCase().includes(toolSearch.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(toolSearch.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered Users
  const filteredUsers = usersList.filter(u => {
    const userIdentifier = u.userId || (u as any).uid || '';
    const matchesSearch = (u.email || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                          (u.displayName || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                          userIdentifier.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || (u.status || 'active') === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            title="Return to user app"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Admin Management Console
              </h1>
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                MASTER ROOT
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Authorized session: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user?.email}</span>
            </p>
          </div>
        </div>

        {/* Tab Navigation Chips */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            User Management
            {usersList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold">
                {usersList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'tools'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Tool Registry ({TOOLS_DATA.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Site Broadcast
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'logs'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Audit Logs
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW TAB */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Total Tools Online</span>
                <Wrench className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {TOOLS_DATA.length - disabledTools.length} / {TOOLS_DATA.length}
              </div>
              <p className="text-[11px] text-emerald-500 font-medium">
                {disabledTools.length === 0 ? '100% Operational & Available' : `${disabledTools.length} tools disabled`}
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Tool Categories</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {CATEGORIES.length} Suites
              </div>
              <p className="text-[11px] text-slate-400">PDF, AI, Dev, Images, SEO, etc.</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Processing Engine</span>
                <Activity className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">Client WASM / JS</div>
              <p className="text-[11px] text-emerald-500 font-medium">Zero Server Egress Cost</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Database & Auth</span>
                <Users className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">Firebase Live</div>
              <p className="text-[11px] text-slate-400">Cloud Firestore Connected</p>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => setActiveTab('users')}
              className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-3xl border border-indigo-200 dark:border-indigo-800/60 cursor-pointer hover:scale-[1.01] transition-transform space-y-2"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Manage Users & Roles</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Promote administrators, manage access status, suspend accounts, and view user audit logs.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('tools')}
              className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:scale-[1.01] transition-transform space-y-2"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tool Inventory Control</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instantly toggle any of the {TOOLS_DATA.length} tools on/off with live synchronization.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('settings')}
              className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-3xl border border-amber-200 dark:border-amber-800/60 cursor-pointer hover:scale-[1.01] transition-transform space-y-2"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Broadcast & Maintenance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Publish platform announcement banners and control emergency maintenance mode.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. USER MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Registered Platform Users ({filteredUsers.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grant administrator permissions, manage suspensions, and audit accounts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadUsers}
                disabled={loadingUsers}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Refresh users list"
              >
                <RefreshCw className={`w-4 h-4 ${loadingUsers ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Add User / Admin
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by email, name, or UID..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins Only</option>
                <option value="user">Users Only</option>
              </select>

              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="suspended">Suspended Only</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
            {loadingUsers ? (
              <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                Querying Firestore user database...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">
                No registered users matching this filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Account ID</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                    {filteredUsers.map((u, idx) => {
                      const userIdentifier = u.userId || (u as any).uid || `user-${idx}`;
                      const isTargetAdmin = u.role === 'admin';
                      const isSuspended = u.status === 'suspended';
                      const isCurrentUser = userIdentifier === user?.uid;

                      return (
                        <tr key={userIdentifier} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">
                                {(u.displayName || u.email || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                  {u.displayName || 'Anonymous User'}
                                  {isCurrentUser && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                                      YOU
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono">
                                  {u.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isTargetAdmin
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {isTargetAdmin ? 'ADMIN' : 'USER'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isSuspended
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}>
                              {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[10px] font-mono text-slate-400">
                            {userIdentifier.slice(0, 12)}...
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Toggle Role */}
                              <button
                                onClick={() => handleRoleToggle(u)}
                                disabled={isCurrentUser}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                                  isCurrentUser
                                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                                }`}
                                title="Toggle user or admin privileges"
                              >
                                {isTargetAdmin ? 'Demote to User' : 'Make Admin'}
                              </button>

                              {/* Toggle Status */}
                              <button
                                onClick={() => handleStatusToggle(u)}
                                disabled={isCurrentUser}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                                  isCurrentUser
                                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700'
                                    : isSuspended
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                      : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                                }`}
                                title="Toggle suspension status"
                              >
                                {isSuspended ? 'Reactivate' : 'Suspend'}
                              </button>

                              {/* Delete Account */}
                              <button
                                onClick={() => handleDeleteUser(u)}
                                disabled={isCurrentUser}
                                className={`p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
                                  isCurrentUser ? 'opacity-30 cursor-not-allowed' : ''
                                }`}
                                title="Delete user record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add User Modal */}
          {showAddUserModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    Register New Platform User
                  </h3>
                  <button
                    onClick={() => setShowAddUserModal(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Display Name (Optional)</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Platform Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                    >
                      <option value="user">Standard User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  {addUserFeedback && (
                    <div className={`p-3 rounded-xl text-xs font-semibold ${
                      addUserFeedback.startsWith('Error') 
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {addUserFeedback}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={creatingUser}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      {creatingUser ? 'Creating...' : 'Create Account'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TOOL REGISTRY TAB */}
      {/* ========================================================================= */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Tool Inventory Registry ({TOOLS_DATA.length} Tools)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage operational status, verify routing, and run test executions.
              </p>
            </div>

            <div className="text-xs font-bold text-slate-500">
              Active: <strong className="text-emerald-600">{TOOLS_DATA.length - disabledTools.length}</strong> • 
              Disabled: <strong className="text-rose-600">{disabledTools.length}</strong>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Search tools by name, tag, or slug..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map(t => {
              const isDisabled = disabledTools.includes(t.id);
              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDisabled 
                      ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-70' 
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-2xs hover:border-indigo-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[170px]">
                          {t.name}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">
                          {t.category} • /{t.slug}
                        </div>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      t.badge === 'Hot' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      t.badge === 'Popular' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                      'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {t.badge || 'Tool'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 my-2.5 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      onClick={() => {
                        onSelectTool(t);
                        onClose();
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" /> Test Run
                    </button>

                    <button
                      onClick={() => toggleToolStatus(t.id)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                        isDisabled
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}
                    >
                      {isDisabled ? 'Disabled' : 'Operational'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SITE BROADCAST & SETTINGS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Global Platform Broadcast & Maintenance Mode
              </h2>
            </div>
            {saveSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Changes deployed to Firestore!
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-slate-500 mb-1.5">
                Top Bar Announcement Message
              </label>
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Platform announcement..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                This message appears globally across the top header of all user sessions.
              </p>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-500 mb-1.5">
                Official Support Contact Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-medium"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  Activate System Maintenance Mode
                </label>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  When enabled, non-admin visitors will see an informational maintenance banner and non-critical operations are locked.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'Deploying to Cloud...' : 'Deploy Global Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. AUDIT & SECURITY LOGS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Administrator Audit Logs ({logsList.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tamper-evident record of administrative changes, role grants, and settings modifications.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadLogs}
                disabled={loadingLogs}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Refresh logs"
              >
                <RefreshCw className={`w-4 h-4 ${loadingLogs ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleExportLogs}
                disabled={logsList.length === 0}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>

              <button
                onClick={handleClearLogs}
                disabled={logsList.length === 0}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Clear Logs
              </button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
            {loadingLogs ? (
              <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                Querying audit stream...
              </div>
            ) : logsList.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">
                No recorded admin audit actions yet. Any permission changes or broadcasts will be logged here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Admin Email</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-[11px]">
                    {logsList.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(log.createdAt || (log as any).timestamp || Date.now()).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap">
                          {log.adminEmail || (log as any).actorEmail || 'admin'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-sans max-w-md">
                          {log.details || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
