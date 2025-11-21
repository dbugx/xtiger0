import React from 'react';

type IconName = 'folder' | 'file' | 'document' | 'image' | 'archive' | 'code' | 'add-folder' | 'add-file' | 'edit' | 'delete' | 'more' | 'spark' | 'search' | 'sort-asc' | 'sort-desc' | 'close' | 'view-grid' | 'gallery' | 'move';

interface IconProps {
  name: IconName;
  className?: string;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ICONS: Record<IconName, React.ReactElement> = {
  folder: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  ),
  file: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  ),
  document: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  image: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  archive: (
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0a2 2 0 00-2-2H6a2 2 0 00-2 2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m4-4h8" />
  ),
  code: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  ),
  'add-folder': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  ),
  'add-file': (
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  edit: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  ),
  delete: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  ),
  more: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
  ),
  spark: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 2.25l.217.434a1.25 1.25 0 001.116.666l.491.034a1.25 1.25 0 011.229 1.228l.035.491a1.25 1.25 0 00.666 1.116l.434.217a1.25 1.25 0 010 2.232l-.434.217a1.25 1.25 0 00-.666 1.116l-.035.491a1.25 1.25 0 01-1.229 1.229l-.491.034a1.25 1.25 0 00-1.116.666l-.217.434a1.25 1.25 0 01-2.232 0l-.217-.434a1.25 1.25 0 00-1.116-.666l-.491-.034a1.25 1.25 0 01-1.229-1.229l-.035-.491a1.25 1.25 0 00-.666-1.116l-.434-.217a1.25 1.25 0 010-2.232l.434-.217a1.25 1.25 0 00.666-1.116l.035-.491a1.25 1.25 0 011.229-1.229l.491-.034a1.25 1.25 0 001.116-.666l.217-.434a1.25 1.25 0 012.232 0z" />
  ),
  search: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  ),
  'sort-asc': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  ),
  'sort-desc': (
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4 4m0 0l4-4m-4 4V4" />
  ),
  close: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  ),
  'view-grid': (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  ),
  gallery: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  move: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v2m-3 7h6m-3-3l3 3-3 3" />
  ),
};

const getFileIconName = (fileName: string): IconName => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'doc':
        case 'docx':
        case 'pdf':
        case 'txt':
        case 'md':
            return 'document';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
            return 'image';
        case 'zip':
        case 'rar':
        case '7z':
            return 'archive';
        case 'js':
        case 'jsx':
        case 'ts':
        case 'tsx':
        case 'html':
        case 'css':
        case 'json':
            return 'code';
        default:
            return 'file';
    }
}

export const FileIcon: React.FC<{fileName: string; className?: string}> = ({fileName, className}) => {
    return <Icon name={getFileIconName(fileName)} className={className} />;
}


export const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'w-6 h-6'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {ICONS[name]}
    </svg>
  );
};