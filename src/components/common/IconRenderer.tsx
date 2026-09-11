import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name?: string;
  iconName?: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, iconName, className = 'w-5 h-5' }) => {
  const finalName = iconName || name || 'Wrench';
  // Safe lookup in LucideIcons
  const IconComponent = (LucideIcons as any)[finalName] || LucideIcons.Wrench;
  return <IconComponent className={className} />;
};
