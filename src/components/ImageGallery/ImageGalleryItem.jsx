import PropTypes from 'prop-types';
import s from './ImageGallery.module.scss';

const ImageGalleryItem = ({ srs, alt, onClick, largeImageURL, myRef }) => {
  return (
    <>
      {myRef ? (
        <li
          ref={myRef}
          className={s.Images}
          onClick={() => onClick(largeImageURL, alt)}
          loading="lazy"
        >
          <img className={s.ImageGalleryItem} src={srs} alt={alt} />
        </li>
      ) : (
        <li
          className={s.Images}
          onClick={() => onClick(largeImageURL, alt)}
          loading="lazy"
        >
          <img className={s.ImageGalleryItem} src={srs} alt={alt} />
        </li>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  srs: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  myRef: PropTypes.object,
};

export default ImageGalleryItem;
