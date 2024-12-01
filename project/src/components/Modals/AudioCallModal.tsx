import React, { useState, useEffect } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { User } from '../../types';

interface AudioCallModalProps {
  contact: User;
  onClose: () => void;
}

export const AudioCallModal: React.FC<AudioCallModalProps> = ({ contact, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full rounded-full object-cover border-4 border-white"
          />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">{contact.name}</h2>
        <p className="text-lg text-gray-300 mb-12">{formatDuration(callDuration)}</p>

        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-700'
            } hover:opacity-90`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-4 rounded-full bg-red-500 hover:opacity-90"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};