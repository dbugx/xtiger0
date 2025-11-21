
import type { FolderEntity } from '../types';

export const initialDirectory: FolderEntity = {
  id: 'root',
  name: 'Home',
  type: 'folder',
  modified: '2023-10-26',
  children: [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      modified: '2023-10-25',
      children: [
        { id: '1-1', name: 'Project-Alpha.docx', type: 'file', size: '2.5MB', modified: '2023-10-22' },
        { id: '1-2', name: 'quarterly-report.pdf', type: 'file', size: '1.1MB', modified: '2023-10-20' },
        {
          id: '1-3',
          name: 'Archive',
          type: 'folder',
          modified: '2023-09-15',
          children: [
            { id: '1-3-1', name: 'old-files.zip', type: 'file', size: '15.7MB', modified: '2023-09-14' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Pictures',
      type: 'folder',
      modified: '2023-10-24',
      children: [
        { id: '2-1', name: 'vacation-photo.jpg', type: 'file', size: '4.8MB', modified: '2023-10-23' },
        { id: '2-2', name: 'logo.png', type: 'file', size: '150KB', modified: '2023-10-19' },
      ],
    },
    {
      id: '3',
      name: 'Music',
      type: 'folder',
      modified: '2023-10-21',
      children: [],
    },
    { id: '4', name: 'README.md', type: 'file', size: '1.2KB', modified: '2023-10-26' },
    { id: '5', name: 'config.json', type: 'file', size: '5KB', modified: '2023-10-18' },
    { id: '6', name: 'entity_DIR', type: 'folder', modified: '2023-10-27', children: [] },
  ],
};