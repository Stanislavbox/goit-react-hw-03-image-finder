import React, { Component } from 'react';
import { nanoid } from 'nanoid'
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { arrImages, showModal } = this.props;

    return (
      <ImageGalleryList>
        {arrImages.map(image => (
          <ImageGalleryItem
            key={image.id = nanoid()}
            image={image}
            showModal={showModal}
          />
        ))}
      </ImageGalleryList>
    );
  }
}
