import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

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
  description,
}) => {
  const navigate = useNavigate();

  const handleBreadcrumbClick = (href?: string) => {
    if (href) navigate(href);
  };

  const renderBreadcrumbs = () => (
    <nav className="Breadcrumbs" aria-label="breadcrumb">
      <ul className="Breadcrumbs__list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={index} className="Breadcrumbs__item">
              {index > 0 && <FiChevronRight className="text-gray-400" />}
              <button
                onClick={() => handleBreadcrumbClick(crumb.href)}
                className={`text-sm font-medium ${isLast
                  ? 'text-gray-500 cursor-default'
                  : 'text-blue-600 hover:text-blue-800'
                  }`}
                disabled={!crumb.href}
                aria-current={isLast ? 'page' : undefined}
              >
                {crumb.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );



  return (
    <div className="mb-8">
      {breadcrumbs.length > 0 && renderBreadcrumbs()}

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-700 max-w-3xl">{description}</p>
          )}
        </div>

        {actions && <div className="flex space-x-3">{actions}</div>}
      </div>

      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default PageHeader;
