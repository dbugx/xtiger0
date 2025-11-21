
export interface FileEntity {
  id: string;
  name: string;
  type: 'file';
  size: string;
  modified: string;
}

export interface FolderEntity {
  id: string;
  name: string;
  type: 'folder';
  children: (FileEntity | FolderEntity)[];
  modified: string;
}

export type EntityDir = FileEntity | FolderEntity;

export enum ModalAction {
  CREATE_FILE = 'CREATE_FILE',
  CREATE_FOLDER = 'CREATE_FOLDER',
  RENAME = 'RENAME',
}

export type SortBy = 'name' | 'modified' | 'size';
export type SortOrder = 'asc' | 'desc';
