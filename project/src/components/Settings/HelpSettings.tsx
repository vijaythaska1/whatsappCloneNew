import React, { useState } from 'react';
import {
  HelpCircle,
  FileQuestion,
  MessageCircle,
  Shield,
  Info,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { FAQView } from './Help/FAQView';
import { ContactView } from './Help/ContactView';
import { PrivacyPolicyView } from './Help/PrivacyPolicyView';
import { AboutView } from './Help/AboutView';

interface HelpSettingsProps {
  onBack: () => void;
}

export const HelpSettings: React.FC<HelpSettingsProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const helpSections = [
    {
      id: 'faq',
      icon: FileQuestion,
      title: 'FAQ',
      description: 'Frequently asked questions',
      component: FAQView,
    },
    {
      id: 'contact',
      icon: MessageCircle,
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      component: ContactView,
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy Policy',
      description: 'Learn about your privacy protection',
      component: PrivacyPolicyView,
    },
    {
      id: 'about',
      icon: Info,
      title: 'About WhatsApp',
      description: 'App info, licenses, and more',
      component: AboutView,
    },
  ];

  const handleBack = () => {
    if (activeSection) {
      setActiveSection(null);
    } else {
      onBack();
    }
  };

  if (activeSection) {
    const section = helpSections.find((s) => s.id === activeSection);
    if (section) {
      const Component = section.component;
      return <Component onBack={handleBack} />;
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-[#008069] text-white flex items-center gap-3">
        <button onClick={handleBack} className="p-2 hover:bg-[#017561] rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Help</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Help Center */}
        <div className="p-4 border-b">
          <h3 className="text-[#008069] font-medium mb-2">Help Center</h3>
          <p className="text-sm text-gray-600">
            Visit our Help Center to learn more about WhatsApp's features and resolve any issues.
          </p>
        </div>

        {/* Help Sections */}
        <div className="p-4 space-y-2">
          {helpSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            );
          })}
        </div>

        {/* System Info */}
        <div className="p-4 space-y-3 border-t mt-4">
          <div>
            <h4 className="text-sm font-medium">App Version</h4>
            <p className="text-sm text-gray-500">2.24.8.76</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Device</h4>
            <p className="text-sm text-gray-500">Web Browser</p>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="p-4 space-y-2">
          <a
            href="#"
            className="block text-[#008069] hover:underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              console.log('Open WhatsApp blog');
            }}
          >
            Visit WhatsApp Blog
          </a>
          <a
            href="#"
            className="block text-[#008069] hover:underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              console.log('Open WhatsApp features');
            }}
          >
            What's New
          </a>
        </div>
      </div>
    </div>
  );
};