import React from 'react';
import { ArrowLeft, Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  onBack: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-[#017561] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">Contact Us</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">Need help?</h3>
            <p className="text-gray-600">
              Choose how you'd like to contact our support team
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border">
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Chat with us</h4>
                <p className="text-sm text-gray-500">Start a conversation now</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border">
              <div className="w-12 h-12 rounded-full bg-[#34B7F1] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-gray-500">support@whatsapp.com</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border">
              <div className="w-12 h-12 rounded-full bg-[#128C7E] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Phone Support</h4>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Before contacting us</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Check our FAQ section for quick answers</li>
              <li>Make sure you have the latest version of WhatsApp</li>
              <li>Have your account details ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};