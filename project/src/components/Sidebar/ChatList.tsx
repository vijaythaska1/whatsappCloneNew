import React from 'react';
import { Chat } from '../../types';
import { SearchBar } from './SearchBar';
import { FilterTabs } from './FilterTabs';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onChatSelect }) => {
  const [filteredChats, setFilteredChats] = React.useState(chats);
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'unread' | 'groups' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterChats(query, activeFilter);
  };

  const handleFilterChange = (filter: 'all' | 'unread' | 'groups' | 'personal') => {
    setActiveFilter(filter);
    filterChats(searchQuery, filter);
  };

  const filterChats = (query: string, filter: string) => {
    let filtered = chats;

    // Apply search filter
    if (query) {
      filtered = filtered.filter(chat =>
        chat.name.toLowerCase().includes(query.toLowerCase()) ||
        chat.lastMessage?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply type filter
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(chat => chat.unreadCount > 0);
        break;
      case 'groups':
        filtered = filtered.filter(chat => chat.isGroup);
        break;
      case 'personal':
        filtered = filtered.filter(chat => !chat.isGroup);
        break;
    }

    setFilteredChats(filtered);
  };

  return (
    <div className="flex flex-col h-full">
      <SearchBar onSearch={handleSearch} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
              selectedChatId === chat.id ? 'bg-gray-100' : ''
            }`}
          >
            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{chat.name}</h3>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(chat.timestamp)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};