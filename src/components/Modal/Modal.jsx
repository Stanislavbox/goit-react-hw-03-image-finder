import React from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal');

export class Modal extends React.Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalHide();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.modalHide();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageUrl, modalHide } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackDrop}>
        <ModalWindow>
          <Image src={largeImageUrl} alt="" onClick={modalHide} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
