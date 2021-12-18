import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import fetchApi from 'AppServise';
import Button from 'components/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.scss';
const reducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return {
        ...state,
        image: [],
        status: 'pending',
        searchName: action.payload,
      };
    case 'resolved':
      return {
        ...state,
        image: [...state.image, ...action.payload],
        status: 'resolved',
      };
    case 'rejected':
      return {
        ...state,
        error: action.payload,
        status: 'rejected',
      };
    case 'nextPage':
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      throw new Error();
  }
};

const ImageGallery = ({ searchName, onClick }) => {
  const [state, dispatch] = useReducer(reducer, {
    searchName: '',
    image: [],
    status: 'idle',
    error: null,
    page: 1,
    myRef: React.createRef(),
  });

  useEffect(() => {
    if (!searchName) {
      return;
    }
    if (searchName !== state.searchName)
      dispatch({ type: 'pending', payload: searchName });
    fetchApi(searchName, state.page)
      .then(image => {
        if (image.hits.length === 0) {
          return Promise.reject(
            new Error(`No results were found for your search.`),
          );
        }
        image.hits[0] = { ...image.hits[0], myRef: state.myRef };
        dispatch({ type: 'resolved', payload: image.hits });
        scrollInto(state.myRef);
      })
      .catch(error => dispatch({ type: 'rejected', payload: error }));
  }, [searchName, state.myRef, state.page, state.searchName]);

  const nextPage = () => {
    dispatch({ type: 'nextPage' });
  };

  function scrollInto(elem) {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
  return (
    <>
      {state.status === 'idle' && <p>Input value</p>}
      {state.status === 'rejected' && <strong>{state.error.message}</strong>}
      {state.image.length > 0 && (
        <ul className={s.Galere}>
          {state.image.map(img => (
            <ImageGalleryItem
              key={img.id}
              onClick={onClick}
              srs={img.webformatURL}
              alt={img.tags}
              largeImageURL={img.largeImageURL}
              myRef={img.myRef}
            />
          ))}
        </ul>
      )}
      {state.status === 'pending' && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {state.status === 'resolved' && <Button onClick={nextPage} />}
    </>
  );
};
ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGallery;
