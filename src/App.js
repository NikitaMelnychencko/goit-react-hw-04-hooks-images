import { Component } from 'react';
import Section from 'components/Section/Section';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchName: '',
    showModal: false,
    option: {},
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };
  toggleModal = (src, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      option: { imageSrc: src, imageAlt: alt },
    }));
  };
  render() {
    const { option, searchName, showModal } = this.state;
    return (
      <>
        <Section color={'#3f51b5'}>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </Section>
        <Section>
          <ImageGallery searchName={searchName} onClick={this.toggleModal} />
        </Section>
        {showModal && (
          <Modal
            src={option.imageSrc}
            alt={option.imageAlt}
            onClose={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={4000} />
      </>
    );
  }
}
export default App;
