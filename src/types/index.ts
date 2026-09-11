export type ToolCategory = 
  | 'pdf'
  | 'image'
  | 'text'
  | 'developer'
  | 'calculator'
  | 'converter'
  | 'security'
  | 'seo'
  | 'social'
  | 'ai';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: string;
  tags: string[];
  popular?: boolean;
  trending?: boolean;
  recentlyAdded?: boolean;
  isNew?: boolean;
  requiresAuth?: boolean;
  badge?: string;
  howToUse: string[];
  faqs: ToolFAQ[];
  relatedToolIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  count?: number;
  gradient: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  status?: 'active' | 'suspended';
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  toolId: string;
  toolName: string;
  createdAt: string;
}

export interface ToolHistoryItem {
  id: string;
  userId: string;
  toolId: string;
  toolName: string;
  summary: string;
  createdAt: string;
}

export interface SavedPreset {
  id: string;
  userId: string;
  toolId: string;
  name: string;
  presetData: string;
  createdAt: string;
}

export interface SiteSettings {
  announcement: string;
  maintenanceMode: boolean;
  featuredTools: string[];
  disabledTools?: string[];
  toolBadges?: Record<string, string>;
  allowRegistrations?: boolean;
  maxUploadSizeMb?: number;
  updatedAt?: string;
  updatedBy?: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  details: string;
  createdAt: string;
}
