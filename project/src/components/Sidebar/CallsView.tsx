import React from 'react';
import { Call, Contact } from '../../types';
import { Phone, Video, PhoneMissed, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

interface CallsViewProps {
  calls: Call[];
  contacts: Contact[];
  onVideoCall: (contactId: string) => void;
  onAudioCall: (contactId: string) => void;
}

export const CallsView: React.FC<CallsViewProps> = ({
  calls,
  contacts,
  onVideoCall,
  onAudioCall,
}) => {
  const getContact = (participantId: string) =>
    contacts.find(contact => contact.id === participantId);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#008069] text-white">
        <h2 className="text-xl font-semibold">Calls</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {calls.map((call) => {
          const contact = getContact(call.participantId);
          if (!contact) return null;

          return (
            <div
              key={call.id}
              className="flex items-center justify-between p-3 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    {call.status === 'missed' ? (
                      <PhoneMissed className="w-4 h-4 text-red-500 mr-1" />
                    ) : call.type === 'audio' ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    )}
                    <span>
                      {format(call.timestamp, 'MMM d, h:mm a')}
                      {call.duration && ` • ${formatDuration(call.duration)}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onVideoCall(contact.id)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Video className="w-5 h-5 text-[#008069]" />
                </button>
                <button
                  onClick={() => onAudioCall(contact.id)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Phone className="w-5 h-5 text-[#008069]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};