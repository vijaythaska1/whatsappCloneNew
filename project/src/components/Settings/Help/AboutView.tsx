import React from 'react';
import { ArrowLeft, Globe, Shield, Users, Zap } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-[#017561] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">About WhatsApp</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 text-center border-b">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
            alt="WhatsApp Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-xl font-medium mb-2">WhatsApp</h3>
          <p className="text-gray-600">Version 2.24.8.76</p>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Globe className="w-8 h-8 text-[#128C7E] mx-auto mb-2" />
              <h4 className="font-medium">2 Billion+</h4>
              <p className="text-sm text-gray-500">Monthly Users</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Users className="w-8 h-8 text-[#128C7E] mx-auto mb-2" />
              <h4 className="font-medium">180+</h4>
              <p className="text-sm text-gray-500">Countries</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4">
              <Shield className="w-6 h-6 text-[#128C7E] mt-1" />
              <div>
                <h4 className="font-medium mb-1">End-to-End Encryption</h4>
                <p className="text-sm text-gray-600">
                  Your personal messages and calls are secured with end-to-end encryption.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4">
              <Zap className="w-6 h-6 text-[#128C7E] mt-1" />
              <div>
                <h4 className="font-medium mb-1">Fast and Reliable</h4>
                <p className="text-sm text-gray-600">
                  Message and call quickly and reliably, even on slow connections.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-[#008069] hover:underline">Terms of Service</a>
              <a href="#" className="block text-[#008069] hover:underline">Privacy Policy</a>
              <a href="#" className="block text-[#008069] hover:underline">Licenses</a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4">
            <p>© 2024 WhatsApp LLC</p>
          </div>
        </div>
      </div>
    </div>
  );
};