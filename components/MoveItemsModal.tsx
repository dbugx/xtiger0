
import React, { useState, useMemo } from 'react';
import type { FolderEntity } from '../types';
import { Icon } from './Icon';
import { FolderTreeItem } from './FolderTreeItem';

interface MoveItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (destinationPath: string[]) => void;
  directory: FolderEntity;
  itemsToMove: string[];
  currentPath: string[];
}

export const MoveItemsModal: React.FC<MoveItemsModalProps> = ({
  isOpen,
  onClose,
  onMove,
  directory,
  itemsToMove,
  currentPath,
}) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const disabledPaths = useMemo(() => {
    const paths = new Set<string>();
    const foldersToMove = itemsToMove.filter(id => id.startsWith('folder-'));
    
    for (const folderId of foldersToMove) {
      const folderPath = [...currentPath, folderId].join('/');
      paths.add(folderPath);
    }
    return paths;
  }, [itemsToMove, currentPath]);

  const handleSubmit = () => {
    if (selectedPath.length > 0) {
      onMove(selectedPath);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col max-h-[80vh]"
      >
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Move {itemsToMove.length} item{itemsToMove.length > 1 ? 's' : ''} to...</h2>
        
        <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 overflow-y-auto border border-slate-200 dark:border-slate-700">
            <FolderTreeItem
                folder={directory}
                currentPath={[directory.id]}
                selectedPath={selectedPath}
                onSelectPath={setSelectedPath}
                disabledPaths={disabledPaths}
                level={0}
            />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 dark:disabled:bg-slate-700"
            disabled={selectedPath.length === 0}
          >
            Move Here
          </button>
        </div>
      </div>
    </div>
  );
};
