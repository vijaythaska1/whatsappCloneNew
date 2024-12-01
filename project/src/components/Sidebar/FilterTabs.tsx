import React from 'react';

interface FilterTabsProps {
  activeFilter: 'all' | 'unread' | 'groups' | 'personal';
  onFilterChange: (filter: 'all' | 'unread' | 'groups' | 'personal') => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex px-4 py-2 gap-2 bg-white border-b">
      {[
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'groups', label: 'Groups' },
        { id: 'personal', label: 'Personal' },
      ].map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id as any)}
          className={`px-4 py-1 rounded-full text-sm ${
            activeFilter === filter.id
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};