import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './service/image-service';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import LoadMore from './Button/Button';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    per_page: 12,
    totalHits: null,
    images: [],
    isLoading: false,
    error: null,
    isEmpty: false,
    isShowButton: false,
    largeImageUrl: '',
    isModalOpen: false,
  };

  targetElement = null;

  lockScroll = () => {
    disableBodyScroll(this.targetElement);
  };

  unlockScroll = () => {
    enableBodyScroll(this.targetElement);
  };

  componentDidMount() {
    this.targetElement = document.querySelector('#root');
    clearAllBodyScrollLocks();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [], page: 1, isEmpty: false }, () => {
        this.handleSubmit(query, this.state.page);
      });
    } else if (prevState.page !== page) {
      this.handleSubmit(query, page);
    }
  }

  handleSubmit = async searchInput => {
    const { page, per_page } = this.state;

    if (!searchInput) {
      this.setState({ error: 'There is nothing in the search field' });
      return;
    }

    try {
      this.setState({ query: searchInput, isLoading: true, error: null });
      const result = await getImages(searchInput, page);
      const arrImages = result.data.hits;
      const { totalHits } = result.data;

      if (page === 1) {
        if (!arrImages.length) {
          this.setState({ isEmpty: true });
        }
        this.setState({
          images: arrImages,
          isShowButton: page < Math.ceil(totalHits / per_page),
          totalHits: totalHits,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...arrImages],
          isShowButton: page < Math.ceil(totalHits / per_page),
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = largeImageUrl => {
    this.setState({ largeImageUrl, isModalOpen: true }, this.lockScroll());
  };

  closeModal = () => {
    this.setState({ isModalOpen: false }, this.unlockScroll());
  };

  handleClickButton = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const {
      totalHits,
      images,
      isLoading,
      error,
      isEmpty,
      isShowButton,
      largeImageUrl,
      isModalOpen,
    } = this.state;

    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery arrImages={images} showModal={this.openModal} />
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal modalHide={this.closeModal} largeImageUrl={largeImageUrl}>
            <img src={largeImageUrl} alt="Ooops!" />
          </Modal>
        )}
        {isEmpty && <p>No images</p>}
        {error && <p>{error}</p>}
        {isShowButton && <LoadMore onClick={this.handleClickButton} />}
        {totalHits === images.length && <p>These are all pictures</p>}
      </div>
    );
  }
}
