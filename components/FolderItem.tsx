
import React from 'react';
import type { FolderEntity } from '../types';
import { Icon } from './Icon';

interface FolderItemProps {
  folder: FolderEntity;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick: (id: string) => void;
  onContextMenu: (event: React.MouseEvent, entity: FolderEntity) => void;
  isSelected: boolean;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder, onClick, onDoubleClick, onContextMenu, isSelected }) => {
  const selectionClasses = isSelected 
    ? 'bg-blue-100 dark:bg-blue-900/70 border-blue-500' 
    : 'border-transparent hover:bg-blue-100/60 dark:hover:bg-blue-900/40';
  
  return (
    <div
      onClick={onClick}
      onDoubleClick={() => onDoubleClick(folder.id)}
      onContextMenu={(e) => onContextMenu(e, folder)}
      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 ${selectionClasses}`}
    >
      <Icon name="folder" className="w-16 h-16 text-blue-500" />
      <span className="mt-2 text-sm text-center text-slate-700 dark:text-slate-300 break-all">{folder.name}</span>
    </div>
  );
};
