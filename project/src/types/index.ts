export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'audio' | 'video' | 'document';
  status: 'sent' | 'delivered' | 'read';
  mediaUrl?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  timestamp: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: Date;
  isGroup?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
  about: string;
  phone: string;
  email?: string;
  settings: UserSettings;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  about: string;
  phone: string;
}

export interface Call {
  id: string;
  participantId: string;
  type: 'audio' | 'video';
  status: 'ongoing' | 'missed' | 'completed';
  timestamp: Date;
  duration?: number;
}

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  privacy: {
    lastSeen: 'everyone' | 'contacts' | 'nobody';
    profilePhoto: 'everyone' | 'contacts' | 'nobody';
    about: 'everyone' | 'contacts' | 'nobody';
    readReceipts: boolean;
  };
  theme: {
    chatWallpaper: string;
    fontSize: 'small' | 'medium' | 'large';
  };
}

export type ActiveModal = 'profile' | 'contact' | 'video-call' | 'audio-call' | 'settings' | null;