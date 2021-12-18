import { useState } from 'react';
import Section from 'components/Section/Section';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState({});

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };
  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setOption({ imageSrc: src, imageAlt: alt });
  };

  return (
    <>
      <Section color={'#3f51b5'}>
        <Searchbar onSubmit={handleFormSubmit} />
      </Section>
      <Section>
        <ImageGallery searchName={searchName} onClick={toggleModal} />
      </Section>
      {showModal && (
        <Modal
          src={option.imageSrc}
          alt={option.imageAlt}
          onClose={toggleModal}
        />
      )}
      <ToastContainer autoClose={4000} />
    </>
  );
};
export default App;
