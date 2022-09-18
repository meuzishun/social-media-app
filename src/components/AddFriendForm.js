import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import { ModalTransitionContext } from './Modal';
import { getUsersByUsername } from '../services/firebaseApp';
import styles from './AddFriendForm.module.css';
import SearchResult from './SearchResult';

function AddFriendForm() {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(UserContext);
  const toggleModal = useContext(ModalTransitionContext);
  const searchInputRef = useRef(null);

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
    setSearchAttempted(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log(usernameSearch);
    const results = await getUsersByUsername(usernameSearch);
    const filteredResults = results.filter((result) => result.id !== user.id);
    setSearchResults(filteredResults);
    setSearchAttempted(true);
  };

  const handleCancelClick = () => {
    toggleModal();
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
      ) : searchAttempted ? (
        <p className={styles.noResultsMsg}>No users found</p>
      ) : null}
    </div>
  );
}

export default AddFriendForm;
