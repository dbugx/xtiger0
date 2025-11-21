
import React, { useState, useEffect, useCallback } from 'react';
import type { FileEntity } from '../types';
import { getMockImageDataUrl } from '../utils';
import { Icon } from './Icon';

interface AnalyzeImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  file?: FileEntity;
}

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const AnalyzeImageModal: React.FC<AnalyzeImageModalProps> = ({ isOpen, onClose, file }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    if (isOpen && file) {
      // Reset state when modal opens for a new file
      setPrompt('');
      setResult('');
      setError('');
      setLoading(false);
      setImageDataUrl(getMockImageDataUrl(file.name));
    }
  }, [isOpen, file]);
  
  const handleGenerate = useCallback(async () => {
    // Functionality disabled
    setError('AI Analysis is currently disabled for deployment testing.');
  }, []);

  if (!isOpen || !file) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6 flex flex-col gap-4 max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate">Analyze: <span className="font-mono">{file.name}</span></h2>
        
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-y-auto pr-2">
            <div className="w-full md:w-1/2">
                <img src={imageDataUrl} alt={file.name} className="rounded-lg object-contain w-full h-auto" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 min-h-[150px] overflow-y-auto">
                   {loading && <div className="flex items-center justify-center h-full"><Spinner /></div>}
                   {error && <p className="text-red-500">{error}</p>}
                   {result && <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{result}</p>}
                   {!loading && !result && !error && <p className="text-slate-400">Your analysis will appear here...</p>}
                </div>
            </div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="flex gap-3 items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ask something about the image..."
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 disabled:bg-purple-300 dark:disabled:bg-purple-800 flex items-center gap-2"
            disabled={!prompt.trim() || loading}
          >
            {loading ? <Spinner /> : <Icon name="spark" className="w-4 h-4"/>}
            Generate
          </button>
        </form>

        <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
};
