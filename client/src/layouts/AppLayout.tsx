import React, { ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';


interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'CRM System',
  description = 'Customer Relationship Management System'
}) => {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>


        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

      </div>
    </HelmetProvider>
  );
};

