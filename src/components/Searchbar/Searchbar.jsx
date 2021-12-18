import { nanoid } from 'nanoid';
import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.scss';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.warn('Input value!');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };
  render() {
    return (
      <div className="searchbar">
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <FiSearch />
          </button>
          <label htmlFor={nanoid()} className={s.SearchFormButtonLabel}>
            Search pictures
          </label>
          <input
            id={nanoid()}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
