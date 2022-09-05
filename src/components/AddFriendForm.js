import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import { ModalContext } from '../App';
import { PopupContext } from '../App';
import { getUsersByUsername } from '../services/firebaseApp';
import styles from './AddFriendForm.module.css';
import SearchResult from './SearchResult';

function AddFriendForm() {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(UserContext);
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);
  const searchInputRef = useRef(null);

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log(usernameSearch);
    const results = await getUsersByUsername(usernameSearch);
    const filteredResults = results.filter((result) => result.id !== user.id);
    setSearchResults(filteredResults);
  };

  const handleCancelClick = () => {
    setPopupContent(null);
    setDisplayModal(false);
  };

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <div className={styles.formContainer}>
      <form className={styles.addFriendForm} onSubmit={handleSearchSubmit}>
        <div className={styles.inputContainer}>
          <label>search for username</label>
          <input
            type='search'
            id='username'
            name='username'
            ref={searchInputRef}
            defaultValue={usernameSearch}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type='submit'>search</button>
          <button type='button' onClick={handleCancelClick}>
            cancel
          </button>
        </div>
      </form>
      {searchResults.length > 0 ? (
        <div className={styles.searchResults}>
          {searchResults.map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AddFriendForm;
