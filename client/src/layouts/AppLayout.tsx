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
      <div >
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>


        <main>
          <div >
            {children}
          </div>
        </main>

      </div>
    </HelmetProvider>
  );
};

