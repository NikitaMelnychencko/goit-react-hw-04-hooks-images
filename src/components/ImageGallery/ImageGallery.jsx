import React, { PureComponent } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import fetchApi from 'AppServise';
import Button from 'components/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.scss';
class ImageGallery extends PureComponent {
  state = {
    image: [],
    status: 'idle',
    error: null,
    page: 1,
    myRef: React.createRef(),
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchName !== this.props.searchName ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.searchName !== this.props.searchName)
        this.setState({ image: [], status: 'pending' });
      fetchApi(this.props.searchName, this.state.page)
        .then(image => {
          if (image.hits.length === 0) {
            return Promise.reject(
              new Error(`No results were found for your search.`),
            );
          }
          image.hits[0] = { ...image.hits[0], myRef: this.state.myRef };
          this.setState({
            image: [...this.state.image, ...image.hits],
            status: 'resolved',
          });
          this.scrollInto(this.state.myRef);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  nextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  scrollInto = elem => {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  render() {
    const { image, status, error } = this.state;
    return (
      <>
        {status === 'idle' && <p>Input value</p>}
        {status === 'rejected' && <strong>{error.message}</strong>}
        {image.length > 0 && (
          <ul className={s.Galere}>
            {image.map(img => (
              <ImageGalleryItem
                key={img.id}
                onClick={this.props.onClick}
                srs={img.webformatURL}
                alt={img.tags}
                largeImageURL={img.largeImageURL}
                myRef={img.myRef}
              />
            ))}
          </ul>
        )}
        {status === 'pending' && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {status === 'resolved' && <Button onClick={this.nextPage} />}
      </>
    );
  }
}

export default ImageGallery;
