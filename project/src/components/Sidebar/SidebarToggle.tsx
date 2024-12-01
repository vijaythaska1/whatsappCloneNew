import React from 'react';
import { MessageSquare, Users, Phone, Settings } from 'lucide-react';

interface SidebarToggleProps {
  activeView: 'chats' | 'contacts' | 'calls' | 'settings';
  onViewChange: (view: 'chats' | 'contacts' | 'calls' | 'settings') => void;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ activeView, onViewChange }) => {
  const views = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex flex-col bg-gray-100 w-16 border-r border-gray-300">
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id as any)}
          className={`p-4 flex flex-col items-center gap-1 hover:bg-gray-200 transition-colors ${
            activeView === id ? 'bg-green-50 text-green-600' : 'text-gray-600'
          }`}
          title={label}
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
};