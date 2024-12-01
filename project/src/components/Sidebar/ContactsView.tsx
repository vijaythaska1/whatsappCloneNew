import React from 'react';
import { Contact } from '../../types';
import { SearchBar } from './SearchBar';
import { Phone, Video } from 'lucide-react';

interface ContactsViewProps {
  contacts: Contact[];
  onVideoCall: (contactId: string) => void;
  onAudioCall: (contactId: string) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contacts,
  onVideoCall,
  onAudioCall,
}) => {
  const [filteredContacts, setFilteredContacts] = React.useState(contacts);

  const handleSearch = (query: string) => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query)
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-[#008069] text-white">
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.about}</p>
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
        ))}
      </div>
    </div>
  );
};