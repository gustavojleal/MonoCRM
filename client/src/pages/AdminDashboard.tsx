import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { UserService } from "../services/UserService";
import UserTable from '../components/UserManagement/UserTable';
import UserForm from '../components/UserManagement/UserForm';
import { User, Role } from '../types/types';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roles: Role[] = [
    { id: "0198860d-521e-7ef9-9ea2-3a90e1fdac4f", name: "Admin" },
    { id: "0198860d-529c-70fc-bcd7-d119d89d19b4", name: "Manager" },
    { id: "0198860d-52d1-7bcb-b901-401d2d716ebc", name: "User" }
  ]


  // Carrega os dados dos usuários
  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          throw new Error('Acesso não autorizado');
        }
        const currentUser = await AuthService.getCurrentUser();

        if (!currentUser?.roles?.includes('Admin')) {
          throw new Error('Permissão insuficiente');
        }
        console.log('Carregando usuários...');
        const usersData = await UserService.getAllUsers();
        console.log('Usuários carregados:', usersData);
        setUsers(usersData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Atualiza as roles do usuário
  const handleRoleChange = async (userId: string, newRoles: string[]) => {
    try {
      await AuthService.updateUserRoles(userId, newRoles);
      setUsers(users.map(user =>
        user.id === userId ? { ...user, roles: newRoles } : user
      ));
    } catch (err) {
      setError('Falha ao atualizar permissões');
    }
  };

  // Adiciona novo usuário
  const handleUserCreated = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  if (isLoading) {
    return <div className="p-4">Carregando dashboard administrativo...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        <p>Erro: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Recarregar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
        <p className="text-gray-600">
          Logado como: {AuthService.getCurrentUser(user)}
        </p>
      </header> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
            <UserTable
              users={users}
              roles={roles}
              onRoleChange={() => console.log("mudar roles")}
            // onRoleChange={handleRoleChange}
            />
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Adicionar Usuário</h2>
            <UserForm
              onUserCreated={handleUserCreated}
              availableRoles={roles}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;