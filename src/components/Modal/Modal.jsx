import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose(null, null);
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose(null, null);
    }
  };
  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <button
            type="button"
            className={s.Button}
            onClick={this.props.onClose}
          >
            Close
          </button>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
