
import React from 'react';
import type { EntityDir } from '../types';
import { Icon, FileIcon } from './Icon';

interface SearchResultItemProps {
  result: { entity: EntityDir; path: string[] };
  onNavigate: (result: { entity: EntityDir; path: string[] }) => void;
  onContextMenu: (event: React.MouseEvent, entity: EntityDir) => void;
  getEntityPath: (pathIds: string[]) => { id: string; name: string }[];
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onNavigate, onContextMenu, getEntityPath }) => {
  const { entity, path } = result;
  const pathObjects = getEntityPath(path);
  const pathString = pathObjects.map(p => p.name).join(' / ');

  return (
    <div
      onClick={() => onNavigate(result)}
      onContextMenu={(e) => onContextMenu(e, entity)}
      className="flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 border-2 border-transparent text-center"
    >
      {entity.type === 'folder' ? (
        <Icon name="folder" className="w-16 h-16 text-blue-600" />
      ) : (
        <FileIcon fileName={entity.name} className="w-16 h-16 text-blue-500 dark:text-blue-400" />
      )}
      <span className="mt-2 text-sm text-slate-700 dark:text-slate-300 break-all">{entity.name}</span>
      <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate w-full" title={pathString}>
        {pathString}
      </span>
    </div>
  );
};
