import React from 'react';
import { Lock, Eye, Image, MessageSquare, Bell } from 'lucide-react';
import { User } from '../../types';

interface PrivacySettingsProps {
  settings: User['settings']['privacy'];
  onUpdatePrivacy: (updates: Partial<User['settings']['privacy']>) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  settings,
  onUpdatePrivacy,
}) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <Lock className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Privacy Settings</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Last Seen */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-[#008069]" />
            <h3 className="font-medium">Last seen and online</h3>
          </div>
          <select
            value={settings.lastSeen}
            onChange={(e) => onUpdatePrivacy({ lastSeen: e.target.value as any })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008069]"
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My contacts</option>
            <option value="nobody">Nobody</option>
          </select>
          <p className="text-sm text-gray-500">
            Choose who can see when you were last online
          </p>
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Image className="w-5 h-5 text-[#008069]" />
            <h3 className="font-medium">Profile photo</h3>
          </div>
          <select
            value={settings.profilePhoto}
            onChange={(e) => onUpdatePrivacy({ profilePhoto: e.target.value as any })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008069]"
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My contacts</option>
            <option value="nobody">Nobody</option>
          </select>
          <p className="text-sm text-gray-500">
            Control who can see your profile photo
          </p>
        </div>

        {/* About */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-[#008069]" />
            <h3 className="font-medium">About</h3>
          </div>
          <select
            value={settings.about}
            onChange={(e) => onUpdatePrivacy({ about: e.target.value as any })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008069]"
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My contacts</option>
            <option value="nobody">Nobody</option>
          </select>
          <p className="text-sm text-gray-500">
            Choose who can see your about info
          </p>
        </div>

        {/* Read Receipts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#008069]" />
              <div>
                <h3 className="font-medium">Read receipts</h3>
                <p className="text-sm text-gray-500">
                  Show when you've read messages
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.readReceipts}
                onChange={(e) => onUpdatePrivacy({ readReceipts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008069]"></div>
            </label>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="pt-4 border-t">
          <a
            href="#"
            className="text-[#008069] hover:underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              console.log('Open privacy policy');
            }}
          >
            Read our Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};