import React, { useState, useRef } from 'react';
import { Mic, Paperclip, Smile, Send, StopCircle, AlertCircle } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { AttachmentMenu } from './AttachmentMenu';

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'document' | 'audio') => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    const cursorPosition = inputRef.current?.selectionStart || message.length;
    const newMessage = 
      message.slice(0, cursorPosition) + 
      emoji.native + 
      message.slice(cursorPosition);
    setMessage(newMessage);
    setShowEmoji(false);
    
    // Restore focus and cursor position
    setTimeout(() => {
      const newPosition = cursorPosition + emoji.native.length;
      inputRef.current?.setSelectionRange(newPosition, newPosition);
      inputRef.current?.focus();
    }, 0);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const requestMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      if (result.state === 'denied') {
        throw new Error('Microphone permission denied. Please allow access in your browser settings.');
      }
    } catch (error) {
      throw new Error('Unable to access microphone permissions.');
    }
  };

  const startRecording = async () => {
    try {
      setRecordingError(null);
      await requestMicrophonePermission();

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        onSendMessage(audioUrl, 'audio');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.onerror = (event) => {
        setRecordingError('An error occurred while recording.');
        stopRecording();
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error accessing microphone';
      setRecordingError(errorMessage);
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
      setIsRecording(false);
      setRecordingTime(0);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  const handleAttachment = (type: 'image' | 'document' | 'camera' | 'sticker') => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = type === 'image' ? 'image/*' : '*/*';
    
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onSendMessage(reader.result as string, type === 'image' ? 'image' : 'document');
        };
        reader.readAsDataURL(file);
      }
    };
    
    fileInput.click();
    setShowAttachments(false);
  };

  return (
    <div className="bg-[#f0f2f5] px-4 py-3 relative">
      {showAttachments && (
        <AttachmentMenu
          onAttach={handleAttachment}
          onClose={() => setShowAttachments(false)}
        />
      )}

      {showEmoji && (
        <div className="absolute bottom-full mb-2 left-0">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}

      {recordingError && (
        <div className="absolute bottom-full left-0 right-0 mb-2 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{recordingError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowAttachments(!showAttachments)}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <Paperclip className="w-6 h-6 text-gray-600" />
        </button>

        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <Smile className="w-6 h-6 text-gray-600" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 py-2 px-4 rounded-lg focus:outline-none"
          disabled={isRecording}
        />

        {message.trim() ? (
          <button
            type="submit"
            className="p-2 hover:bg-gray-200 rounded-full text-[#00a884]"
          >
            <Send className="w-6 h-6" />
          </button>
        ) : (
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`p-2 hover:bg-gray-200 rounded-full ${
              isRecording ? 'text-red-500' : 'text-gray-600'
            }`}
            title="Hold to record voice message"
          >
            {isRecording ? (
              <div className="flex items-center gap-2">
                <StopCircle className="w-6 h-6" />
                <span className="text-sm">{formatRecordingTime(recordingTime)}</span>
              </div>
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
        )}
      </form>
    </div>
  );
};