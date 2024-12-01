import React from 'react';
import { User } from '../../types';
import {
  User as UserIcon,
  Bell,
  Lock,
  Palette,
  Circle,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onUpdateSettings: (updates: Partial<User['settings']>) => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateSettings,
  onProfileClick,
  onLogout,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#008069] text-white">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div
          onClick={onProfileClick}
          className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.about}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Settings Sections */}
        <div className="p-4 space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center mr-4">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span>Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.settings.notifications}
                onChange={(e) =>
                  onUpdateSettings({ notifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Privacy */}
          <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#34B7F1] flex items-center justify-center mr-4">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span>Privacy</span>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#8E44AD] flex items-center justify-center mr-4">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span>Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.settings.darkMode}
                onChange={(e) =>
                  onUpdateSettings({ darkMode: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Help */}
          <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#F1C40F] flex items-center justify-center mr-4">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <span>Help</span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg text-red-500"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};