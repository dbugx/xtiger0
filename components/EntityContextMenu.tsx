import React from 'react';
import { Icon } from './Icon';
import type { EntityDir } from '../types';
import { isImageFile } from '../utils';

interface EntityContextMenuProps {
  entity: EntityDir;
  selectionCount: number;
  onRename: () => void;
  onDelete: () => void;
  onAnalyze: () => void;
  onMove: () => void;
  onClose: () => void;
  position: { x: number; y: number };
}

export const EntityContextMenu: React.FC<EntityContextMenuProps> = ({ 
    entity, 
    selectionCount,
    onRename, 
    onDelete, 
    onAnalyze,
    onMove,
    onClose, 
    position 
}) => {
  const isMultiSelect = selectionCount > 1;

  return (
    <div
      className="fixed z-50 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 py-1 w-52"
      style={{ top: position.y, left: position.x }}
      onMouseLeave={onClose}
    >
      <ul>
        {entity.type === 'file' && isImageFile(entity.name) && !isMultiSelect && (
            <li>
                <button
                    onClick={() => { onAnalyze(); onClose(); }}
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                    <Icon name="spark" className="w-4 h-4 mr-3 text-purple-500" />
                    Analyze Image
                </button>
            </li>
        )}
        <li>
          <button
            onClick={() => { onRename(); onClose(); }}
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isMultiSelect}
          >
            <Icon name="edit" className="w-4 h-4 mr-3" />
            Rename
          </button>
        </li>
        <li>
           <button
            onClick={() => { onMove(); onClose(); }}
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Icon name="move" className="w-4 h-4 mr-3" />
            Move {isMultiSelect ? `${selectionCount} items` : ''}
          </button>
        </li>
        <li>
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Icon name="delete" className="w-4 h-4 mr-3" />
            Delete {isMultiSelect ? `${selectionCount} items` : ''}
          </button>
        </li>
      </ul>
    </div>
  );
};