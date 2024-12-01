import { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Chat/Header';
import { MessageList } from './components/Chat/MessageList';
import { MessageInput } from './components/Chat/MessageInput';
import { ProfileModal } from './components/Modals/ProfileModal';
import { VideoCallModal } from './components/Modals/VideoCallModal';
import { AudioCallModal } from './components/Modals/AudioCallModal';
import { ContactInfoModal } from './components/Modals/ContactInfoModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { mockChats, mockMessages, currentUser } from './data/mockData';
import { ActiveModal, User } from './types';

function App() {
  const [selectedChatId, setSelectedChatId] = useState(mockChats[0].id);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [user, setUser] = useState(currentUser);

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);
  const selectedContact: User = {
    id: selectedChat?.id || '',
    name: selectedChat?.name || '',
    avatar: selectedChat?.avatar || '',
    status: selectedChat?.status === 'online' ? 'online' : 'last seen recently',
    about: 'Hey there! I am using WhatsApp',
    phone: '+1234567890',
    settings: user.settings,
  };

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    setUser({ ...user, ...updates });
  };

  const handleUpdateSettings = (updates: Partial<User['settings']>) => {
    setUser({
      ...user,
      settings: { ...user.settings, ...updates },
    });
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className={`flex h-screen ${user.settings.darkMode ? 'dark' : ''}`}>
      <Sidebar
        user={user}
        chats={mockChats}
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
        onProfileClick={() => setActiveModal('profile')}
        onSettingsClick={() => setActiveModal('settings')}
      />

      <div className="flex-1 flex flex-col">
        {selectedChat && (
          <>
            <Header
              contact={selectedContact}
              onVideoCall={() => setActiveModal('video-call')}
              onAudioCall={() => setActiveModal('audio-call')}
              onContactInfo={() => setActiveModal('contact')}
            />
            <MessageList messages={mockMessages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        )}
      </div>

      {/* Modals */}
      {activeModal === 'profile' && (
        <ProfileModal
          user={user}
          onClose={() => setActiveModal(null)}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      {activeModal === 'settings' && (
        <SettingsModal
          user={user}
          onClose={() => setActiveModal(null)}
          onUpdateSettings={handleUpdateSettings}
          onLogout={handleLogout}
        />
      )}
      {activeModal === 'video-call' && selectedContact && (
        <VideoCallModal
          contact={selectedContact}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'audio-call' && selectedContact && (
        <AudioCallModal
          contact={selectedContact}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'contact' && selectedContact && (
        <ContactInfoModal
          contact={selectedContact}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}

export default App;
