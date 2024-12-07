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
import { PrivacySettings } from '../Settings/PrivacySettings';
import { HelpSettings } from '../Settings/HelpSettings';

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
  const [activeSection, setActiveSection] = React.useState<'main' | 'privacy' | 'help'>('main');

  const handlePrivacyUpdate = (updates: Partial<User['settings']['privacy']>) => {
    onUpdateSettings({
      privacy: { ...user.settings.privacy, ...updates },
    });
  };

  if (activeSection === 'privacy') {
    return (
      <PrivacySettings
        settings={user.settings.privacy}
        onUpdatePrivacy={handlePrivacyUpdate}
      />
    );
  }

  if (activeSection === 'help') {
    return (
      <HelpSettings
        onBack={() => setActiveSection('main')}
      />
    );
  }

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
          <div className="p-4 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-6 h-6 mr-4 text-gray-600" />
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">Message and group notifications</p>
                </div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008069]"></div>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div
            onClick={() => setActiveSection('privacy')}
            className="flex items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <Lock className="w-6 h-6 mr-4 text-gray-600" />
            <div className="flex-1">
              <h3 className="font-medium">Privacy</h3>
              <p className="text-sm text-gray-500">Last seen, profile photo, about</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Theme */}
          <div className="p-4 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Palette className="w-6 h-6 mr-4 text-gray-600" />
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-gray-500">Dark mode, chat wallpaper</p>
                </div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008069]"></div>
              </label>
            </div>
          </div>

          {/* Help */}
          <div
            onClick={() => setActiveSection('help')}
            className="flex items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <HelpCircle className="w-6 h-6 mr-4 text-gray-600" />
            <div className="flex-1">
              <h3 className="font-medium">Help</h3>
              <p className="text-sm text-gray-500">FAQ, contact us, privacy policy</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center p-4 hover:bg-gray-100 rounded-lg text-red-500"
          >
            <LogOut className="w-6 h-6 mr-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};