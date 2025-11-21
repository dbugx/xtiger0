
import React from 'react';

interface BreadcrumbsProps {
  path: { id: string; name: string }[];
  onNavigate: (path: string[]) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  const handleCrumbClick = (index: number) => {
    const newPathIds = path.slice(0, index + 1).map(p => p.id);
    onNavigate(newPathIds);
  };

  return (
    <nav className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
      {path.map((crumb, index) => (
        <React.Fragment key={crumb.id}>
          <button
            onClick={() => handleCrumbClick(index)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 disabled:text-slate-800 dark:disabled:text-slate-200 disabled:font-semibold disabled:cursor-default"
            disabled={index === path.length - 1}
          >
            {crumb.name}
          </button>
          {index < path.length - 1 && (
            <span className="mx-2 text-slate-400 dark:text-slate-600">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
