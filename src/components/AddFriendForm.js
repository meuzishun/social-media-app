import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import { AddState } from '../pages/home/network/Network';
import { getUsersByUsername } from '../services/firebaseApp';
import './AddFriendForm.css';
import SearchResult from './SearchResult';

function AddFriendForm() {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(UserContext);
  const handleAddState = useContext(AddState);
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

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <>
      <form className='addFriendForm' onSubmit={handleSearchSubmit}>
        <label>search for username</label>
        <input
          type='search'
          id='username'
          name='username'
          ref={searchInputRef}
          defaultValue={usernameSearch}
          onChange={handleInputChange}
        />
        <button type='submit'>search</button>
        <button type='button' onClick={handleAddState}>
          cancel
        </button>
      </form>
      {searchResults.length > 0 ? (
        <div className='searchResults'>
          {searchResults.map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default AddFriendForm;
