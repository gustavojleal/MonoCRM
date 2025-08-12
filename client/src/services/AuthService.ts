import api from './PublicApi';

export interface User {
  id: string; 
  name: string;
  email: string;
  roles?: string[]; 
}

interface AuthResponse {
  data: {
    user?: User;
    token: string;
  }
}

export const AuthService = {
  // 👇 Autenticação
  async login(credentials: { userName: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      this.setSession(response.data);
      return response.data;
    } catch (error) {
      this.clearSession();
      throw new Error('Falha no login: ' + (error as any).response?.data?.message || 'Credenciais inválidas');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      this.clearSession();
    }
  },

    // 👇 Operações de Usuário (Admin)
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/auth/users');
    return response.data;
  },


  // 👇 Gestão de Sessão
  setSession(authData: AuthResponse): void {
    sessionStorage.setItem('authToken', authData.data.token);
    sessionStorage.setItem('userData', JSON.stringify(authData.data.user));
  },

  clearSession(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  },

  getCurrentUser(): User | null {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  },



  async updateUserRoles(userId: string, roles: string[]): Promise<void> {
    await api.put(`/admin/users/${userId}/roles`, { roles });
  },

  // async getAdminUsers(): Promise<{totalUsers: any, activeUsers: any, lockedUsers: any, serverTime: any }> {
  //   const response = await api.get<{totalUsers: any, activeUsers: any, lockedUsers: any, serverTime: any }>('/auth/admin-dashbord');
  //   console.log("response ===> ", response)
  //   return response.data;
  // }

};