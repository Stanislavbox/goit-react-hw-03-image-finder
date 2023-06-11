import React, { Component } from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { arrImages, showModal } = this.props;

    return (
      <ImageGalleryList>
        {arrImages.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            showModal={showModal}
          />
        ))}
      </ImageGalleryList>
    );
  }
}
