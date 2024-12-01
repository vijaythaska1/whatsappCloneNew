import React, { useState } from 'react';
import { MoreVertical, Phone, Search, Video } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  contact: User;
  onVideoCall: () => void;
  onAudioCall: () => void;
  onContactInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contact,
  onVideoCall,
  onAudioCall,
  onContactInfo,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-16 bg-gray-100 flex items-center px-4 justify-between border-l border-gray-300">
      <div
        className="flex items-center cursor-pointer"
        onClick={onContactInfo}
      >
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm text-gray-500">{contact.status}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {showSearch ? (
          <div className="flex items-center bg-white rounded-lg px-3 py-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in chat..."
              className="outline-none text-sm"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onVideoCall}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onAudioCall}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};