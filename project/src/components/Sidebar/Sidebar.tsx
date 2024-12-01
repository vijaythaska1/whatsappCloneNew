import React, { useState } from 'react';
import { SidebarToggle } from './SidebarToggle';
import { ChatList } from './ChatList';
import { ContactsView } from './ContactsView';
import { CallsView } from './CallsView';
import { SettingsView } from './SettingsView';
import { Profile } from './Profile';
import { User, Chat } from '../../types';
import { mockContacts, mockCalls } from '../../data/mockData';

interface SidebarProps {
  user: User;
  chats: Chat[];
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onUpdateSettings: (updates: Partial<User['settings']>) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  chats,
  selectedChatId,
  onChatSelect,
  onProfileClick,
  onSettingsClick,
  onUpdateSettings,
  onLogout,
}) => {
  const [activeView, setActiveView] = useState<'chats' | 'contacts' | 'calls' | 'settings'>('chats');

  const handleVideoCall = (contactId: string) => {
    console.log('Starting video call with:', contactId);
  };

  const handleAudioCall = (contactId: string) => {
    console.log('Starting audio call with:', contactId);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'chats':
        return (
          <>
            <Profile
              user={user}
              onProfileClick={onProfileClick}
              onSettingsClick={onSettingsClick}
            />
            <ChatList
              chats={chats}
              selectedChatId={selectedChatId}
              onChatSelect={onChatSelect}
            />
          </>
        );
      case 'contacts':
        return (
          <ContactsView
            contacts={mockContacts}
            onVideoCall={handleVideoCall}
            onAudioCall={handleAudioCall}
          />
        );
      case 'calls':
        return (
          <CallsView
            calls={mockCalls}
            contacts={mockContacts}
            onVideoCall={handleVideoCall}
            onAudioCall={handleAudioCall}
          />
        );
      case 'settings':
        return (
          <SettingsView
            user={user}
            onUpdateSettings={onUpdateSettings}
            onProfileClick={onProfileClick}
            onLogout={onLogout}
          />
        );
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarToggle activeView={activeView} onViewChange={setActiveView} />
      <div className="w-[400px] flex flex-col border-r border-gray-300">
        {renderContent()}
      </div>
    </div>
  );
};