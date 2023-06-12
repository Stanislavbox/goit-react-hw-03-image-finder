import React from 'react';
import { LoadMoreButton } from './Button.styled';

const LoadMore = ({ onClick }) => (
  <LoadMoreButton onClick={onClick}>
    Load More...
  </LoadMoreButton>
);

export default LoadMore;