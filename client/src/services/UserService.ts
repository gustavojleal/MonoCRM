import authedApi from './AuthedApi';
import { User } from '../types/types';

export interface UsersResponse {
  id: string; 
  name: string;
  email: string;
  roles?: string[]; 
}
interface CreateUserResponse {
  data: {
    user?: User;
  }
}

export const UserService = {
  async create (UserData: User): Promise<CreateUserResponse> {
    const Data = {
      userName: UserData.userName,    
      email: UserData.email,
      password: "Tempor@iryPassword123", // Default password, should be changed by user
      defaultRole: UserData.roles, 
    };
    try { 
      const response = await authedApi.post<CreateUserResponse>('/auth/users', Data)
    return response.data;

  } catch (error) {
      throw new Error('Falha ao criar novo usuario: ' + (error as any).response?.data?.message || 'Credenciais inválidas');
  }

  },

  async getAllUsers(): Promise<UsersResponse[]> {
    try {
        const response = await authedApi.get<UsersResponse[]>('/auth/users');
        return response.data;
      
    } catch (error) {
        throw new Error('Falha ao obter usuários: ' + (error as any).response?.data?.message || 'Erro desconhecido');
      }
    }

}
