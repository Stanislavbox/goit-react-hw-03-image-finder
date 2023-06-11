import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from './service/image-service';
// import { getImages } from './service/image-service';

export class App extends Component {
  state = {
    // query: '',
    // page: 1,
    // images: [],
    // isLoading: false,
    // error: null,
    // isEmpty: false,
    // isShowButton: false,
  };


  handleSubmit = async searchInput => {
    const result = await getImages(searchInput)
    console.log(result)
  };

  // getImages = async (query, page) => {
  //   console.log('query, page', query, page);
  // };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
