
import React from 'react';
import type { FileEntity } from '../types';
import { FileIcon } from './Icon';

interface FileItemProps {
  file: FileEntity;
  onClick: (event: React.MouseEvent) => void;
  onContextMenu: (event: React.MouseEvent, entity: FileEntity) => void;
  isSelected: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onClick, onContextMenu, isSelected }) => {
  const selectionClasses = isSelected 
    ? 'bg-blue-100 dark:bg-blue-900/70 border-blue-500' 
    : 'border-transparent hover:bg-blue-100/60 dark:hover:bg-blue-900/40';

  return (
    <div 
      onClick={onClick}
      onContextMenu={(e) => onContextMenu(e, file)}
      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectionClasses}`}
    >
      <FileIcon fileName={file.name} className="w-16 h-16 text-blue-500 dark:text-blue-400" />
      <span className="mt-2 text-sm text-center text-slate-700 dark:text-slate-300 break-all">{file.name}</span>
    </div>
  );
};
