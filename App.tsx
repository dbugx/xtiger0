import React, { useState, useCallback, useMemo } from 'react';
import { useDirectory } from './hooks/useDirectory';
import type { EntityDir, FileEntity, FolderEntity, SortBy, SortOrder } from './types';
import { ModalAction } from './types';
import { parseSize, isImageFile } from './utils';
import { Breadcrumbs } from './components/Breadcrumbs';
import { FolderItem } from './components/FolderItem';
import { FileItem } from './components/FileItem';
import { Icon } from './components/Icon';
import { ActionModal } from './components/ActionModal';
import { EntityContextMenu } from './components/EntityContextMenu';
import { AnalyzeImageModal } from './components/AnalyzeImageModal';
import { SearchResultItem } from './components/SearchResultItem';
import { FilePreviewPane } from './components/FilePreviewPane';
import { GalleryView } from './components/GalleryView';
import { SelectionActionsBar } from './components/SelectionActionsBar';
import { MoveItemsModal } from './components/MoveItemsModal';

type ViewMode = 'grid' | 'gallery';

export default function App() {
  const {
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
  } = useDirectory();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: ModalAction | null;
    entity?: EntityDir;
  }>({ isOpen: false, action: null });
  
  const [contextMenu, setContextMenu] = useState<{
    entity: EntityDir;
    position: { x: number; y: number };
  } | null>(null);

  const [analyzeModalState, setAnalyzeModalState] = useState<{
    isOpen: boolean;
    entity?: FileEntity;
  }>({ isOpen: false });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ entity: EntityDir; path: string[] }[] | null>(null);

  const [sort, setSort] = useState<{ by: SortBy; order: SortOrder }>({ by: 'name', order: 'asc' });
  
  const [previewFile, setPreviewFile] = useState<FileEntity | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);

  const currentFolder = getCurrentFolder();

  const sortedFolders = useMemo(() => {
    if (!currentFolder) return [];
    const folders = currentFolder.children.filter((item): item is FolderEntity => item.type === 'folder');
    const orderMultiplier = sort.order === 'asc' ? 1 : -1;
    return folders.sort((a, b) => {
        switch (sort.by) {
            case 'modified':
                return (new Date(b.modified).getTime() - new Date(a.modified).getTime()) * orderMultiplier;
            case 'name':
            default:
                return a.name.localeCompare(b.name) * orderMultiplier;
        }
    });
  }, [currentFolder, sort]);

  const sortedFiles = useMemo(() => {
    if (!currentFolder) return [];
    const files = currentFolder.children.filter((item): item is FileEntity => item.type === 'file');
    const orderMultiplier = sort.order === 'asc' ? 1 : -1;
    return files.sort((a, b) => {
        switch (sort.by) {
            case 'size':
                return (parseSize(a.size) - parseSize(b.size)) * orderMultiplier;
            case 'modified':
                return (new Date(b.modified).getTime() - new Date(a.modified).getTime()) * orderMultiplier;
            case 'name':
            default:
                return a.name.localeCompare(b.name) * orderMultiplier;
        }
    });
  }, [currentFolder, sort]);


  const handleFolderDoubleClick = useCallback((folderId: string) => {
    setPreviewFile(null);
    setSelectedIds([]);
    navigateTo([...path, folderId]);
  }, [path, navigateTo]);
  
  const handleEntityClick = (e: React.MouseEvent, entity: EntityDir) => {
      e.stopPropagation();
      const { id } = entity;
      const allEntities = [...sortedFolders, ...sortedFiles];

      if (e.shiftKey && lastClickedId) {
          const lastIndex = allEntities.findIndex(item => item.id === lastClickedId);
          const currentIndex = allEntities.findIndex(item => item.id === id);
          
          if (lastIndex !== -1 && currentIndex !== -1) {
              const start = Math.min(lastIndex, currentIndex);
              const end = Math.max(lastIndex, currentIndex);
              const rangeIds = allEntities.slice(start, end + 1).map(item => item.id);
              
              if (e.ctrlKey || e.metaKey) {
                  setSelectedIds(prev => [...new Set([...prev, ...rangeIds])]);
              } else {
                  setSelectedIds(rangeIds);
              }
          }
      } else if (e.ctrlKey || e.metaKey) {
          setSelectedIds(prev => 
              prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
          );
          setLastClickedId(id);
      } else {
          setPreviewFile(entity.type === 'file' && (!selectedIds.includes(id) || selectedIds.length <= 1) ? entity : null);
          setSelectedIds([id]);
          setLastClickedId(id);
      }
  };
  
  const handleContainerClick = () => {
    setContextMenu(null);
    setPreviewFile(null);
    setSelectedIds([]);
    setLastClickedId(null);
  }

  const handleOpenModal = (action: ModalAction, entity?: EntityDir) => {
    setModalState({ isOpen: true, action, entity });
    setContextMenu(null);
  };
  
  const handleCloseModal = () => {
    setModalState({ isOpen: false, action: null });
  };

  const handleOpenAnalyzeModal = (entity: FileEntity) => {
    setAnalyzeModalState({ isOpen: true, entity });
    setContextMenu(null);
  };
  
  const handleCloseAnalyzeModal = () => {
    setAnalyzeModalState({ isOpen: false });
  };
  
  const handleSubmitModal = (name: string) => {
    if (modalState.action === ModalAction.CREATE_FILE) {
      createFile(name);
    } else if (modalState.action === ModalAction.CREATE_FOLDER) {
      createFolder(name);
    } else if (modalState.action === ModalAction.RENAME && modalState.entity) {
      renameEntity(modalState.entity.id, name);
    }
    handleCloseModal();
  };
  
  const handleContextMenu = (event: React.MouseEvent, entity: EntityDir) => {
    event.preventDefault();
    event.stopPropagation();
    if (!selectedIds.includes(entity.id)) {
      setSelectedIds([entity.id]);
    }
    setContextMenu({ entity, position: { x: event.clientX, y: event.clientY } });
  };

  const handleDelete = () => {
    const itemsToDelete = selectedIds.length > 0
      ? [...sortedFolders, ...sortedFiles].filter(e => selectedIds.includes(e.id))
      : contextMenu ? [contextMenu.entity] : [];

    if (itemsToDelete.length === 0) {
      setContextMenu(null);
      return;
    }
    
    const names = itemsToDelete.map(i => i.name).slice(0, 3).join('", "');
    const confirmationMessage = `Are you sure you want to delete ${itemsToDelete.length} item(s)?\n("${names}${itemsToDelete.length > 3 ? '...' : ''}")`;

    if (window.confirm(confirmationMessage)) {
      itemsToDelete.forEach(item => deleteEntity(item.id));
      if (previewFile && selectedIds.includes(previewFile.id)) {
        setPreviewFile(null);
      }
      setSelectedIds([]);
    }
    setContextMenu(null);
  }

  const handleMove = (destinationPath: string[]) => {
    if(moveEntities(selectedIds, destinationPath)) {
        setSelectedIds([]);
    }
    setIsMoveModalOpen(false);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIds([]);

    if (query.trim() === '') {
        setSearchResults(null);
    } else {
        const results = searchDirectory(query);
        setSearchResults(results);
    }
  };

  const handleSearchResultClick = (result: { entity: EntityDir, path: string[] }) => {
    setSearchQuery('');
    setSearchResults(null);
    setPreviewFile(null);
    setSelectedIds([]);
    if (result.entity.type === 'folder') {
      navigateTo([...result.path, result.entity.id]);
    } else {
      navigateTo(result.path);
    }
  };

  const hasImages = useMemo(() => sortedFiles.some(file => isImageFile(file.name)), [sortedFiles]);
  
  // When view mode changes, if gallery is chosen, clear file selection unless it's an image
  React.useEffect(() => {
    if (viewMode === 'gallery' && previewFile && !isImageFile(previewFile.name)) {
        setPreviewFile(null);
    }
  }, [viewMode, previewFile]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200" onClick={handleContainerClick}>
      <div className="flex">
        <div className={`flex-grow transition-all duration-300 ${previewFile ? 'w-[calc(100%-24rem)]' : 'w-full'}`}>
            <div className={`container mx-auto px-4 py-6 transition-padding duration-300 ${selectedIds.length > 0 ? 'pb-28' : ''}`}>
                <h1 className="text-5xl font-bold text-center text-slate-600 dark:text-slate-300 mb-12">Directory Explorer</h1>
                <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-4 z-30 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div className="flex-none"><Breadcrumbs path={getFolderPath()} onNavigate={(p) => { setSelectedIds([]); navigateTo(p); }} /></div>

                <div className="flex-grow w-full sm:w-auto sm:mx-4 order-3 sm:order-2">
                    <div className="relative">
                    <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                    <input
                        type="search"
                        placeholder="Search all files..."
                        className="w-full bg-slate-200/50 dark:bg-slate-700/50 border border-transparent dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    </div>
                </div>

                <div className="flex items-center gap-4 order-2 sm:order-3">
                    {hasImages && (
                        <>
                        <div className="flex items-center bg-slate-200/50 dark:bg-slate-700/50 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'}`}
                                aria-label="Grid View"
                            >
                                <Icon name="view-grid" className="w-5 h-5"/>
                            </button>
                             <button 
                                onClick={() => setViewMode('gallery')}
                                className={`p-1.5 rounded-md ${viewMode === 'gallery' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'}`}
                                aria-label="Gallery View"
                            >
                                <Icon name="gallery" className="w-5 h-5"/>
                            </button>
                        </div>
                         <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                        </>
                    )}
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-by" className="text-sm sr-only sm:not-sr-only text-slate-600 dark:text-slate-400">Sort:</label>
                        <div className="relative">
                            <select
                                id="sort-by"
                                value={sort.by}
                                onChange={(e) => setSort({ ...sort, by: e.target.value as SortBy })}
                                className="bg-slate-200/50 dark:bg-slate-700/50 border-transparent rounded-lg text-sm font-medium py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="name">Name</option>
                                <option value="modified">Date</option>
                                <option value="size">Size</option>
                            </select>
                        </div>
                        <button 
                            onClick={() => setSort({ ...sort, order: sort.order === 'asc' ? 'desc' : 'asc' })}
                            className="p-2 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            aria-label={`Sort ${sort.order === 'asc' ? 'descending' : 'ascending'}`}
                        >
                            <Icon name={sort.order === 'asc' ? 'sort-asc' : 'sort-desc'} className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleOpenModal(ModalAction.CREATE_FILE);}} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200">
                        <Icon name="add-file" className="w-4 h-4" />
                        <span className="hidden sm:inline">New File</span>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleOpenModal(ModalAction.CREATE_FOLDER);}} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                        <Icon name="add-folder" className="w-4 h-4" />
                        <span className="hidden sm:inline">New Folder</span>
                        </button>
                    </div>
                </div>
                </header>

                <main className="mt-6">
                {searchResults !== null ? (
                    <div>
                    <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Search'}
                    </h2>
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {searchResults.map((result) => (
                            <SearchResultItem
                            key={`${result.path.join('/')}-${result.entity.id}`}
                            result={result}
                            onNavigate={handleSearchResultClick}
                            onContextMenu={handleContextMenu}
                            getEntityPath={getEntityPath}
                            />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                        <Icon name="search" className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-700" />
                        <p className="mt-4 text-slate-500 dark:text-slate-400">No results found.</p>
                        </div>
                    )}
                    </div>
                ) : currentFolder && (
                    viewMode === 'gallery' && hasImages ? (
                        <GalleryView
                            images={sortedFiles.filter(f => isImageFile(f.name))}
                            onImageClick={(e, img) => handleEntityClick(e, img)}
                            onContextMenu={handleContextMenu}
                            selectedImageId={selectedIds.find(id => sortedFiles.some(f => f.id === id && isImageFile(f.name)))}
                        />
                    ) : currentFolder.children.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {sortedFolders.map(folder => (
                            <FolderItem 
                                key={folder.id} 
                                folder={folder} 
                                onClick={(e) => handleEntityClick(e, folder)}
                                onDoubleClick={handleFolderDoubleClick} 
                                onContextMenu={handleContextMenu}
                                isSelected={selectedIds.includes(folder.id)}
                            />
                        ))}
                        {sortedFiles.map(file => (
                            <FileItem 
                                key={file.id} 
                                file={file} 
                                onClick={(e) => handleEntityClick(e, file)} 
                                onContextMenu={handleContextMenu} 
                                isSelected={selectedIds.includes(file.id)}
                            />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                        <Icon name="folder" className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-700" />
                        <p className="mt-4 text-slate-500 dark:text-slate-400">This folder is empty.</p>
                        </div>
                    )
                )}
                </main>
            </div>
        </div>
        <FilePreviewPane file={previewFile} onClose={() => setPreviewFile(null)} />
      </div>
      
      <SelectionActionsBar
        count={selectedIds.length}
        onMoveClick={() => setIsMoveModalOpen(true)}
        onDeleteClick={handleDelete}
        onClearClick={() => setSelectedIds([])}
      />
      
      {modalState.isOpen && modalState.action && (
        <ActionModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
          action={modalState.action}
          entityName={modalState.entity?.name}
        />
      )}

      {contextMenu && (
        <EntityContextMenu
          entity={contextMenu.entity}
          selectionCount={selectedIds.length}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          onRename={() => { setPreviewFile(null); handleOpenModal(ModalAction.RENAME, contextMenu.entity)}}
          onDelete={handleDelete}
          onMove={() => { setIsMoveModalOpen(true); setContextMenu(null); }}
          onAnalyze={() => { setPreviewFile(null); handleOpenAnalyzeModal(contextMenu.entity as FileEntity)}}
        />
      )}

      <AnalyzeImageModal 
        isOpen={analyzeModalState.isOpen}
        onClose={handleCloseAnalyzeModal}
        file={analyzeModalState.entity}
      />
      
      <MoveItemsModal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        onMove={handleMove}
        directory={directory}
        itemsToMove={selectedIds}
        currentPath={path}
      />
    </div>
  );
}