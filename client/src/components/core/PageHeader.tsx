import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs = [],
  actions,
  description
}) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (href?: string) => {
    if (href) navigate(href);
  };

  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {/* {index > 0 && (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )} */}
                <button
                  onClick={() => handleBreadcrumbClick(crumb.href)}
                  className={`text-sm font-medium ${index === breadcrumbs.length - 1
                    ? 'text-gray-500'
                    : 'text-blue-600 hover:text-blue-800'
                    }`}
                  disabled={!crumb.href}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {crumb.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Title and Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-700 max-w-3xl">{description}</p>
          )}
        </div>

        {actions && (
          <div className="flex space-x-3">
            {actions}
          </div>
        )}
      </div>

      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default PageHeader;