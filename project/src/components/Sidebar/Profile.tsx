import React, { useState } from 'react';
import { Menu, MoreVertical, Users, Settings } from 'lucide-react';
import { User } from '../../types';

interface ProfileProps {
  user: User;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onProfileClick, onSettingsClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-16 bg-gray-100 flex items-center px-4 justify-between relative">
      <img
        src={user.avatar}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={onProfileClick}
      />
      <div className="flex gap-4">
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Users className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              onSettingsClick();
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};