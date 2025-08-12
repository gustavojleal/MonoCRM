import React from 'react';

interface RoleBadgeProps {
  role: string;
  isActive: boolean;
  onClick: () => void;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, isActive, onClick }) => {
  const colors: Record<string, string> = {
    Admin: 'bg-red-100 text-red-800',
    User: 'bg-blue-100 text-blue-800',
    Manager: 'bg-green-100 text-green-800'
  };

  return (
    <span
      onClick={onClick}
      className={`${colors[role] || 'bg-gray-100 text-gray-800'} ${isActive ? 'ring-2 ring-offset-1 ring-indigo-500' : 'opacity-60'
        } px-2 py-1 rounded-full text-xs font-medium cursor-pointer`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;