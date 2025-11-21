import React, { useEffect, useState } from 'react';
import type { FileEntity } from '../types';
import { Icon, FileIcon } from './Icon';
import { getMockImageDataUrl, isImageFile, getMockFileContent } from '../utils';

interface FilePreviewPaneProps {
  file: FileEntity | null;
  onClose: () => void;
}

export const FilePreviewPane: React.FC<FilePreviewPaneProps> = ({ file, onClose }) => {
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');

  useEffect(() => {
    if (file) {
      if (isImageFile(file.name)) {
        setImageDataUrl(getMockImageDataUrl(file.name));
        setTextContent('');
      } else {
        setTextContent(getMockFileContent(file.name));
        setImageDataUrl('');
      }
    }
  }, [file]);

  const paneVisibilityClasses = file ? 'translate-x-0' : 'translate-x-full';

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-slate-800 shadow-2xl border-l border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out z-20 flex flex-col ${paneVisibilityClasses}`}
      onClick={(e) => e.stopPropagation()}
    >
      {file ? (
        <>
          <header className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <FileIcon fileName={file.name} className="w-8 h-8 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold truncate text-slate-800 dark:text-slate-100" title={file.name}>
                    {file.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {file.size} &middot; Modified: {file.modified}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close preview"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex-grow p-4 overflow-y-auto">
            {imageDataUrl ? (
              <div className="w-full h-auto bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                 <img src={imageDataUrl} alt={`Preview of ${file.name}`} className="max-w-full max-h-full object-contain rounded-lg" />
              </div>
            ) : (
                <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-slate-100 dark:bg-slate-900 p-4 rounded-lg font-mono">
                    {textContent}
                </pre>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};