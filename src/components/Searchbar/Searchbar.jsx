import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      toast.warn('Input value!');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <div className="searchbar">
      <form className={s.SearchForm} onSubmit={handleSubmit}>
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
          value={searchName}
          onChange={handleNameChange}
        />
      </form>
    </div>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
