
import React from 'react';
import type { FileEntity } from '../types';
import { getMockImageDataUrl } from '../utils';
import { Icon } from './Icon';

interface GalleryViewProps {
  images: FileEntity[];
  onImageClick: (event: React.MouseEvent, file: FileEntity) => void;
  onContextMenu: (event: React.MouseEvent, entity: FileEntity) => void;
  selectedImageId?: string | null;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ images, onImageClick, onContextMenu, selectedImageId }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <Icon name="image" className="w-24 h-24 mx-auto text-slate-300 dark:text-slate-700" />
        <p className="mt-4 text-slate-500 dark:text-slate-400">No images in this folder.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {images.map((image) => {
        const isSelected = selectedImageId === image.id;
        return (
          <div
            key={image.id}
            onClick={(e) => onImageClick(e, image)}
            onContextMenu={(e) => onContextMenu(e, image)}
            className={`group relative aspect-square cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ring-offset-2 dark:ring-offset-slate-900 ${
              isSelected ? 'ring-2 ring-blue-500' : 'ring-0'
            }`}
          >
            <img
              src={getMockImageDataUrl(image.name)}
              alt={image.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-2 w-full">
              <p className="text-white text-xs font-semibold truncate">{image.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
