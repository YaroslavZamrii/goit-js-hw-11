import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36672580-7f9d3f18e062a4165a6faa824';

export default async function getImages(name, page) {
  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
