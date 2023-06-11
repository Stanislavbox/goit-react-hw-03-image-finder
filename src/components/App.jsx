import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './service/image-service';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { LoadMoreButton } from './Button/Button';

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

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ images: [], page: 1, isEmpty: false }, () => {
        this.handleSubmit(query, page);
      });
    }
  }

  handleSubmit = async searchInput => {
    const { page, per_page } = this.state;

    if (!searchInput) {
      this.setState({ error: 'There is nothing in the search field' });
      return;
    }

    this.setState({ query: searchInput, isLoading: true, error: null });
    try {
      const result = await getImages(searchInput, page);
      const arrImages = result.data.hits;
      const { totalHits } = result.data;
      const newState = {
        isShowButton: page < Math.ceil(totalHits / per_page),
        isLoading: false,
      };

      if (page === 1) {
        if (!arrImages.length) {
          this.setState({ isLoading: false });
          return;
        }
        this.setState({
          images: arrImages,
          totalHits: totalHits,
          ...newState,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...arrImages],
          ...newState,
        }));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  openModal = largeImageUrl => {
    this.setState({ largeImageUrl, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      // query,
      // page,
      // per_page,
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
        {isEmpty && <p>Sorry. There are no images ... 😭</p>}
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {isShowButton && (
          <LoadMoreButton onClick={this.handleClickBtn}>
            Load More...
          </LoadMoreButton>
        )}
        {totalHits === images.length && <p>That's all, folks!</p>}
      </div>
    );
  }
}
