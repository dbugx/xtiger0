
import React, { useState } from 'react';
import type { FolderEntity } from '../types';
import { Icon } from './Icon';

interface FolderTreeItemProps {
  folder: FolderEntity;
  currentPath: string[];
  selectedPath: string[];
  onSelectPath: (path: string[]) => void;
  disabledPaths: Set<string>;
  level: number;
}

export const FolderTreeItem: React.FC<FolderTreeItemProps> = ({
  folder,
  currentPath,
  selectedPath,
  onSelectPath,
  disabledPaths,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first few levels

  const isSelected = JSON.stringify(currentPath) === JSON.stringify(selectedPath);
  const pathString = currentPath.join('/');
  const isDisabled = disabledPaths.has(pathString) || Array.from(disabledPaths).some(p => pathString.startsWith(p + '/'));

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
        onSelectPath(currentPath);
    }
  }

  const childFolders = folder.children.filter((c): c is FolderEntity => c.type === 'folder');

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center p-1.5 rounded-md cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 dark:hover:bg-blue-900/40'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div style={{ paddingLeft: `${level * 1.25}rem` }} className="flex items-center flex-grow">
          <button
            onClick={handleToggleExpand}
            className={`mr-1 p-0.5 rounded-sm ${isSelected ? 'hover:bg-blue-700' : 'hover:bg-blue-200 dark:hover:bg-blue-800/50' } ${childFolders.length === 0 ? 'opacity-0 cursor-default' : ''}`}
            disabled={childFolders.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
              fill="none"
              viewBox="0 0 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Icon name="folder" className={`w-5 h-5 mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
          <span className="truncate">{folder.name}</span>
        </div>
      </div>
      {isExpanded && childFolders.length > 0 && (
        <div>
          {childFolders.map(child => (
            <FolderTreeItem
              key={child.id}
              folder={child}
              currentPath={[...currentPath, child.id]}
              selectedPath={selectedPath}
              onSelectPath={onSelectPath}
              disabledPaths={disabledPaths}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
