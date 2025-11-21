
import { useState, useCallback } from 'react';
import { initialDirectory } from '../data/mockData';
import type { FolderEntity, EntityDir } from '../types';

const findEntityByPath = (
  root: FolderEntity,
  path: string[]
): FolderEntity | null => {
  let current: FolderEntity | EntityDir = root;
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    if (current.type === 'folder' && current.id === segment) {
      if (i === path.length - 1) {
        return current;
      }
      const nextSegment = path[i + 1];
      const foundChild = current.children.find((child) => child.id === nextSegment);
      if (foundChild && foundChild.type === 'folder') {
        current = foundChild;
      } else if (i < path.length - 1) {
        return null; 
      }
    }
  }
  return current.type === 'folder' ? current : null;
};

export const useDirectory = () => {
  const [directory, setDirectory] = useState<FolderEntity>(initialDirectory);
  const [path, setPath] = useState<string[]>(['root']);

  const navigateTo = useCallback((newPath: string[]) => {
    setPath(newPath);
  }, []);

  const getCurrentFolder = (): FolderEntity | null => {
    return findEntityByPath(directory, path);
  };
  
  const getFolderPath = (): { id: string, name: string }[] => {
      const folderPath: { id: string, name: string }[] = [];
      let current: FolderEntity | undefined = directory;
      folderPath.push({ id: current.id, name: current.name });
      
      for(let i = 1; i < path.length; i++){
          const segmentId = path[i];
          current = current?.children.find(c => c.id === segmentId && c.type === 'folder') as FolderEntity | undefined;
          if(current){
              folderPath.push({ id: current.id, name: current.name });
          } else {
              break;
          }
      }
      return folderPath;
  }
  
  const getEntityPath = useCallback((pathIds: string[]): { id: string, name: string }[] => {
      const folderPath: { id: string, name: string }[] = [];
      let current: FolderEntity | undefined = directory;
      if (!current || pathIds[0] !== 'root') return [];

      folderPath.push({ id: current.id, name: current.name });
      
      for(let i = 1; i < pathIds.length; i++){
          const segmentId = pathIds[i];
          current = current?.children.find(c => c.id === segmentId && c.type === 'folder') as FolderEntity | undefined;
          if(current){
              folderPath.push({ id: current.id, name: current.name });
          } else {
              break;
          }
      }
      return folderPath;
  }, [directory]);

  // Stubbed functions (Backend functionality removed)
  const createFile = useCallback((name: string) => {
    console.log('Functionality disabled: createFile');
  }, []);

  const createFolder = useCallback((name: string) => {
    console.log('Functionality disabled: createFolder');
  }, []);

  const renameEntity = useCallback((id: string, newName: string) => {
    console.log('Functionality disabled: renameEntity');
  }, []);

  const deleteEntity = useCallback((id: string) => {
    console.log('Functionality disabled: deleteEntity');
  }, []);

  const moveEntities = useCallback((entityIdsToMove: string[], destinationPath: string[]) => {
      console.log('Functionality disabled: moveEntities');
      return false;
  }, []);


  const searchDirectory = useCallback((query: string): { entity: EntityDir, path: string[] }[] => {
    console.log('Functionality disabled: searchDirectory');
    return [];
  }, []);

  return {
    directory,
    path,
    navigateTo,
    getCurrentFolder,
    getFolderPath,
    getEntityPath,
    createFile,
    createFolder,
    renameEntity,
    deleteEntity,
    moveEntities,
    searchDirectory,
  };
};
