import React from 'react';
import { Camera, X } from 'lucide-react';
import { User } from '../../types';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdateProfile: (updates: Partial<User>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onUpdateProfile }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => onUpdateProfile({ name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <input
                type="text"
                value={user.about}
                onChange={(e) => onUpdateProfile({ about: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                value={user.phone}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email || ''}
                onChange={(e) => onUpdateProfile({ email: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};