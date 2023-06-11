import axios from 'axios';

export async function getImages(searchValue, page) {
  const API_KEY = '35849876-3ddc90380cea496254cb66003';
  const API_URL = 'https://pixabay.com/api/';

  return await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });
}
