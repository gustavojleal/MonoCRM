import React, { useState, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id?: string;
  type: NotificationType;
  title: string;
  message?: string;
  timeout?: number;
}

interface NotificationContainerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  removeNotification,
  autoClose = true,
  autoCloseDuration = 50000
}) => {
  // Função para obter cores baseadas no tipo
  const getNotificationColors = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  // Função para obter ícones
  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "h-5 w-5";

    switch (type) {
      case 'success':
        return (
          <h1>${type}</h1>
          // <svg className={`${iconClass} text-green-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          // </svg>
        );
      case 'error':
        return (
          <h1>${type}</h1>
          // <svg className={`${iconClass} text-red-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          // </svg>
        );
      case 'warning':
        return (
          <h1>${type}</h1>
          // <svg className={`${iconClass} text-yellow-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          // </svg>
        );
      case 'info':
      default:
        return (
          <h1>${type}</h1>
          // <svg className={`${iconClass} text-blue-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          // </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-end px-4 py-6 pointer-events-none sm:p-6 z-50">
      <div className="w-full max-w-sm">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            removeNotification={removeNotification}
            autoClose={autoClose}
            autoCloseDuration={autoCloseDuration}
            colors={getNotificationColors(notification.type)}
            icon={getNotificationIcon(notification.type)}
          />
        ))}
      </div>
    </div>
  );
};

// Componente individual de notificação
const NotificationItem: React.FC<{
  notification: Notification;
  removeNotification: (id: string) => void;
  autoClose: boolean;
  autoCloseDuration: number;
  colors: string;
  icon: JSX.Element;
}> = ({ notification, removeNotification, autoClose, autoCloseDuration, colors, icon }) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (notification.id) removeNotification(notification.id);
    }, 300);
  };

  useEffect(() => {
    if (autoClose && isVisible) {
      const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
          if (notification.id) removeNotification(notification.id);
        }, 300);
      };

      timerRef.current = setTimeout(() => {
        handleClose();
      }, notification.timeout || autoCloseDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, autoClose, notification.timeout, autoCloseDuration, notification.id]);


  if (!notification.id) return null;

  return (
    <div className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } transform transition-all duration-300 ease-in-out pointer-events-auto mb-2`}>
      <div className={`rounded-lg shadow-lg overflow-hidden ${colors} border`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icon}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium">
                {notification.title}
              </p>
              {notification.message && (
                <p className="mt-1 text-sm opacity-90">
                  {notification.message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={handleClose}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Fechar</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;

