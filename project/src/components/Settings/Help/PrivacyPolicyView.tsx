import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-[#017561] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">Privacy Policy</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose max-w-none">
          <h3 className="text-lg font-medium mb-4">WhatsApp Privacy Policy</h3>
          
          <div className="space-y-6">
            <section>
              <h4 className="font-medium mb-2">Information We Collect</h4>
              <p className="text-gray-600 mb-4">
                We collect information about your account and usage to provide and improve our services.
                This includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Account information (phone number, profile name, photo)</li>
                <li>Messages (encrypted end-to-end)</li>
                <li>Contacts (if permitted)</li>
                <li>Usage and log information</li>
              </ul>
            </section>

            <section>
              <h4 className="font-medium mb-2">How We Use Information</h4>
              <p className="text-gray-600 mb-4">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and maintain services</li>
                <li>Improve user experience</li>
                <li>Research and development</li>
                <li>Safety and security</li>
              </ul>
            </section>

            <section>
              <h4 className="font-medium mb-2">Information Sharing</h4>
              <p className="text-gray-600">
                We don't sell, rent, or monetize your personal information. Your messages
                are encrypted end-to-end and can't be read by WhatsApp.
              </p>
            </section>

            <section>
              <h4 className="font-medium mb-2">Data Protection</h4>
              <p className="text-gray-600">
                We use advanced security measures to protect your information and provide
                privacy-preserving features like end-to-end encryption for messages.
              </p>
            </section>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Last updated: March 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};