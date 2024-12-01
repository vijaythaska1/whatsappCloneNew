import React from 'react';
import { X, Bell, Moon, Lock, Palette, CircleUser, LogOut } from 'lucide-react';
import { User } from '../../types';

interface SettingsModalProps {
  user: User;
  onClose: () => void;
  onUpdateSettings: (updates: Partial<User['settings']>) => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  user,
  onClose,
  onUpdateSettings,
  onLogout,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Profile Section */}
          <div className="flex items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer">
            <CircleUser className="w-6 h-6 mr-4 text-gray-600" />
            <div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-gray-500">Change your profile information</p>
            </div>
          </div>

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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div className="p-4 hover:bg-gray-100 rounded-lg space-y-4">
            <div className="flex items-center">
              <Lock className="w-6 h-6 mr-4 text-gray-600" />
              <div>
                <h3 className="font-medium">Privacy</h3>
                <p className="text-sm text-gray-500">Last seen, profile photo, about</p>
              </div>
            </div>

            <div className="space-y-3 pl-10">
              <div className="flex justify-between items-center">
                <span className="text-sm">Last seen</span>
                <select
                  value={user.settings.privacy.lastSeen}
                  onChange={(e) =>
                    onUpdateSettings({
                      privacy: { ...user.settings.privacy, lastSeen: e.target.value as any },
                    })
                  }
                  className="p-2 border rounded-lg"
                >
                  <option value="everyone">Everyone</option>
                  <option value="contacts">My contacts</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Read receipts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.settings.privacy.readReceipts}
                    onChange={(e) =>
                      onUpdateSettings({
                        privacy: {
                          ...user.settings.privacy,
                          readReceipts: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
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