
import React from 'react';
import { Icon } from './Icon';

interface SelectionActionsBarProps {
  count: number;
  onMoveClick: () => void;
  onDeleteClick: () => void;
  onClearClick: () => void;
}

export const SelectionActionsBar: React.FC<SelectionActionsBarProps> = ({
  count,
  onMoveClick,
  onDeleteClick,
  onClearClick,
}) => {
  if (count === 0) {
    return null;
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()} 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-[90vw] z-40 bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md text-white rounded-xl shadow-2xl flex items-center gap-4 px-4 py-2 transition-transform duration-300 ease-in-out transform"
    >
      <span className="font-semibold text-sm flex-shrink-0">{count} item{count > 1 ? 's' : ''} selected</span>
      <div className="h-6 w-px bg-slate-600"></div>
      <div className="flex items-center gap-2">
        <button
          onClick={onMoveClick}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon name="move" className="w-4 h-4" />
          Move
        </button>
        <button
          onClick={onDeleteClick}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Icon name="delete" className="w-4 h-4" />
          Delete
        </button>
      </div>
      <div className="h-6 w-px bg-slate-600"></div>
       <button
          onClick={onClearClick}
          className="p-2 rounded-full text-slate-300 hover:bg-slate-700 transition-colors"
          aria-label="Clear selection"
        >
          <Icon name="close" className="w-5 h-5" />
        </button>
    </div>
  );
};
