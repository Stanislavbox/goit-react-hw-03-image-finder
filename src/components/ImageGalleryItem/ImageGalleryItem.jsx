import React from 'react';
import {
  StyledImageGalleryItem,
  GalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, showModal }) => {
  const { webformatURL, tags, largeImageURL } = image;

  const handleClick = () => {
    showModal(largeImageURL);
  };

  return (
    <StyledImageGalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={handleClick} />
    </StyledImageGalleryItem>
  );
};
