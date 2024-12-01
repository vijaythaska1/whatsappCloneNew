import { Chat, Message, User, Call, Contact } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  avatar:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  status: 'Available',
  about: 'Hey there! I am using WhatsApp',
  phone: '+1234567890',
  email: 'john.doe@example.com',
  settings: {
    notifications: true,
    darkMode: false,
    privacy: {
      lastSeen: 'everyone',
      profilePhoto: 'everyone',
      about: 'everyone',
      readReceipts: true,
    },
    theme: {
      chatWallpaper: 'default',
      fontSize: 'medium',
    },
  },
};

export const mockContacts: Contact[] = [
  {
    id: '2',
    name: 'Alice Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'online',
    about: 'Living life to the fullest',
    phone: '+1234567891',
  },
  {
    id: '3',
    name: 'Bob Smith',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'offline',
    about: 'At work',
    phone: '+1234567892',
  },
  {
    id: '4',
    name: 'Carol White',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'online',
    about: 'Traveling ✈️',
    phone: '+1234567893',
  },
];

export const mockCalls: Call[] = [
  {
    id: '1',
    participantId: '2',
    type: 'video',
    status: 'missed',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    participantId: '3',
    type: 'audio',
    status: 'completed',
    timestamp: new Date(Date.now() - 7200000),
    duration: 300,
  },
  {
    id: '3',
    participantId: '4',
    type: 'audio',
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000),
    duration: 180,
  },
];

// Add mockChats and mockMessages
export const mockChats: Chat[] = [
  {
    id: '2',
    name: 'Alice Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'online',
    lastMessage: 'Hey, how are you?',
    timestamp: new Date(),
  },
  {
    id: '3',
    name: 'Bob Smith',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'offline',
    lastMessage: 'See you later',
    timestamp: new Date(Date.now() - 86400000),
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    chatId: '2',
    senderId: '1',
    content: 'Hello Alice!',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    chatId: '2',
    senderId: '2',
    content: 'Hi John, how are you?',
    timestamp: new Date(Date.now() - 2700000),
  },
  {
    id: '3',
    chatId: '3',
    senderId: '1',
    content: 'Hey Bob!',
    timestamp: new Date(Date.now() - 5400000),
  },
];
