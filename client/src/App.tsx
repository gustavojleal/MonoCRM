import { RouterProvider } from 'react-router-dom';
import { AppConfigProvider } from './app/AppConfigProvider';
import { NotificationProvider } from './app/core/NotificationContext';
import router from './app/Router';
import { AppLayout } from './layouts/AppLayout';

import './i18n/utils';

function App() {
  return (
    <AppConfigProvider>

      <NotificationProvider>
        <AppLayout>
          <RouterProvider router={router} />
        </AppLayout>
      </NotificationProvider>
    </AppConfigProvider>
  );
}

export default App;


// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     return !!localStorage.getItem('authToken');
//   });

//   const login = (token: string) => {
//     localStorage.setItem('authToken', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };