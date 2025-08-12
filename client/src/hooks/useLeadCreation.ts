// hooks/leads/useLeadCreation.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

// Tipo para os dados do lead
export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted';
  source?: string;
  // Adicione outros campos conforme necessário
}

export const useLeadCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { addNotification } = useNotification();

  const createLead = async (leadData: LeadData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Chamada à API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      // 2. Tratamento de erros da API
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lead');
      }

      const data = await response.json();
      
      // 3. Notificação de sucesso
      addNotification({
        type: 'success',
        title: 'Lead criado com sucesso!',
        message: 'O novo lead foi adicionado ao sistema.',
        timeout: 3000,
      });

      // 4. Redirecionamento após sucesso
      navigate(`/leads/${data.id}`);
      
      return data;
    } catch (err) {
      // 5. Tratamento de erros
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      
      // 6. Notificação de erro
      addNotification({
        type: 'error',
        title: 'Erro ao criar lead',
        message: message,
        timeout: 5000,
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createLead, isLoading, error };
};

