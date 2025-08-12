import authedApi from './AuthedApi';
import { User } from '../types/types'

interface UserResponse {
  data: {
    user?: User;
  }

}

export const UserService = {
  async create (UserData: User): Promise<UserResponse> {
    const Data = {
      userName: UserData.userName,    
      email: UserData.email,
      password: "Tempor@iryPassword123", // Default password, should be changed by user
      defaultRole: UserData.roles, 
    };
    try {
      const response = await authedApi.post<UserResponse>('/auth/users', Data)
    return response.data;

  } catch (error) {
      throw new Error('Falha ao criar novo usuario: ' + (error as any).response?.data?.message || 'Credenciais inválidas');
  }

  },
}
