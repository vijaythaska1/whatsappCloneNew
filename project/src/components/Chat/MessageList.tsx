import React from 'react';
import { Message } from '../../types';
import { format } from '../../utils/dateUtils';
import { FileText } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'image':
        return (
          <img
            src={message.mediaUrl}
            alt="Shared image"
            className="max-w-[300px] rounded-lg cursor-pointer"
          />
        );
      case 'document':
        return (
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg cursor-pointer">
            <FileText className="w-6 h-6 text-[#00a884]" />
            <span className="text-sm">Document</span>
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2]">
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[65%] rounded-lg p-2 ${
                message.isOwn
                  ? 'bg-[#d9fdd3] rounded-tr-none'
                  : 'bg-white rounded-tl-none'
              }`}
            >
              {renderMessageContent(message)}
              <p className="text-xs text-gray-500 text-right mt-1">
                {format(message.timestamp, 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};