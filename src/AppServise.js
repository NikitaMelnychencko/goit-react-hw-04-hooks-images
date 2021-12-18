const BASE = 'https://pixabay.com/api/';
const KEY = '23933594-99c5d6abfa76120a4e36d3057';

export default function fetchApi(value, page) {
  const url =
    BASE +
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Oops, something went wrong.`));
  });
}
