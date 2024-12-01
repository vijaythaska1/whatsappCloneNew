import React from 'react';
import { Image, File, Camera, StickyNote } from 'lucide-react';

interface AttachmentMenuProps {
  onAttach: (type: 'image' | 'document' | 'camera' | 'sticker') => void;
  onClose: () => void;
}

export const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onAttach, onClose }) => {
  return (
    <div className="absolute bottom-16 left-16 bg-white rounded-lg shadow-lg p-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            onAttach('image');
            onClose();
          }}
          className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg"
        >
          <div className="p-2 bg-[#02A698] rounded-full">
            <Image className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm">Photos</span>
        </button>

        <button
          onClick={() => {
            onAttach('document');
            onClose();
          }}
          className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg"
        >
          <div className="p-2 bg-[#5F66CD] rounded-full">
            <File className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm">Document</span>
        </button>

        <button
          onClick={() => {
            onAttach('camera');
            onClose();
          }}
          className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg"
        >
          <div className="p-2 bg-[#D3396D] rounded-full">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm">Camera</span>
        </button>

        <button
          onClick={() => {
            onAttach('sticker');
            onClose();
          }}
          className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-lg"
        >
          <div className="p-2 bg-[#0063CB] rounded-full">
            <StickyNote className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm">Sticker</span>
        </button>
      </div>
    </div>
  );
};