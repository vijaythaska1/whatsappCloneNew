import React from 'react';
import { X, Phone, Video, Ban, ThumbsDown } from 'lucide-react';
import { User } from '../../types';

interface ContactInfoModalProps {
  contact: User;
  onClose: () => void;
}

export const ContactInfoModal: React.FC<ContactInfoModalProps> = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-white w-[400px] h-full overflow-y-auto">
        <div className="flex justify-between items-center p-4 bg-[#008069]">
          <h2 className="text-xl font-semibold text-white">Contact Info</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#017561] rounded-full">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-40 h-40 rounded-full mx-auto"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Name</h3>
              <p className="text-lg font-medium">{contact.name}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">About</h3>
              <p>{contact.about}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
              <p>{contact.phone}</p>
            </div>

            <div className="flex gap-4 py-4">
              <button className="flex-1 flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg">
                <Video className="w-6 h-6 text-[#008069]" />
                <span className="text-sm">Video</span>
              </button>
              <button className="flex-1 flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg">
                <Phone className="w-6 h-6 text-[#008069]" />
                <span className="text-sm">Voice</span>
              </button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg text-red-500">
                <Ban className="w-6 h-6" />
                <span>Block {contact.name}</span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg text-red-500">
                <ThumbsDown className="w-6 h-6" />
                <span>Report {contact.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};