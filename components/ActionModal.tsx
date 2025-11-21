
import React, { useState, useEffect, useRef } from 'react';
import { ModalAction } from '../types';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  action: ModalAction;
  entityName?: string;
}

export const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, onSubmit, action, entityName }) => {
  const [name, setName] = useState(entityName || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(entityName || '');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, entityName]);

  if (!isOpen) {
    return null;
  }

  const getTitle = () => {
    switch (action) {
      case ModalAction.CREATE_FILE: return 'Create New File';
      case ModalAction.CREATE_FOLDER: return 'Create New Folder';
      case ModalAction.RENAME: return `Rename "${entityName}"`;
    }
  };
  
  const getButtonText = () => {
    switch (action) {
      case ModalAction.RENAME: return 'Rename';
      default: return 'Create';
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">{getTitle()}</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={action === ModalAction.CREATE_FILE ? "e.g., my-document.txt" : "e.g., My Folder"}
          />
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 dark:disabled:bg-slate-700"
              disabled={!name.trim()}
            >
              {getButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
