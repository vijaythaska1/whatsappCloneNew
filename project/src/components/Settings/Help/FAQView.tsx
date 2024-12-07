import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

interface FAQViewProps {
  onBack: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onBack }) => {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I change my profile picture?',
      answer: 'Tap on your profile picture in Settings > Profile, then tap on the camera icon to either take a new photo or choose one from your gallery.',
    },
    {
      question: 'How do I block someone?',
      answer: 'Open the chat with the person you want to block, tap on their name at the top, scroll down and tap "Block Contact".',
    },
    {
      question: 'Can I recover deleted messages?',
      answer: 'Messages that have been deleted cannot be recovered unless you have a backup from before the deletion.',
    },
    {
      question: 'How do I create a group?',
      answer: 'Tap the New Chat button, then select "New Group". Choose participants and set a group name and picture.',
    },
    {
      question: 'How do I change my privacy settings?',
      answer: 'Go to Settings > Privacy to adjust who can see your profile photo, status, and last seen.',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-[#017561] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">FAQ</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              className="w-full py-4 px-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
            >
              <span className="font-medium text-left">{faq.question}</span>
              {openQuestion === index ? (
                <Minus className="w-5 h-5 text-[#008069]" />
              ) : (
                <Plus className="w-5 h-5 text-[#008069]" />
              )}
            </button>
            {openQuestion === index && (
              <div className="px-2 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};