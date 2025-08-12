import React from 'react';
import RoleBadge from './RoleBadge';
import { User, Role } from '../../types/types';

interface UserTableProps {
  users: User[];
  roles?: Role[];
  onRoleChange: (userId: string, roles: Role[]) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, roles, onRoleChange }) => {
  const handleRoleToggle = (userId: string, role: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    // const newRoles = user.roles?.includes(role)
    //   ? user.roles.filter(r => r !== role)
    //   : [...user.roles, role];

    onRoleChange(userId, newRoles);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissões</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <RoleBadge
                      key={role.id}
                      role={role.name}
                      isActive={user.roles.includes(role.name)}
                      onClick={() => handleRoleToggle(user.id, role.name)}
                    />
                  ))}
                </div> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;