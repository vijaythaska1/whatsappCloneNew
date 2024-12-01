import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { User } from '../../types';

interface VideoCallModalProps {
  contact: User;
  onClose: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ contact, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
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
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative w-full h-full">
        {/* Main video feed */}
        <div className="absolute inset-0 bg-gray-900">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Small video preview */}
        <div className="absolute bottom-24 right-8 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-white">
          <img
            src={contact.avatar}
            alt="You"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Call info */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
          <p className="text-lg">{formatDuration(callDuration)}</p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
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

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full ${
              !isVideoOn ? 'bg-red-500' : 'bg-gray-700'
            } hover:opacity-90`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};