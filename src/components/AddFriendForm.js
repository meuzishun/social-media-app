import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import {
  getUserByUsername,
  getUsersByUsername,
  addIdToUserFriendIds,
  getFileFromStorage,
} from '../services/firebaseApp';
import './AddFriendForm.css';
import SearchResult from './SearchResult';

function AddFriendForm({ handleAddState }) {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    // const friend = await getUserByUsername(usernameSearch);
    const friend = await getUserByUsername(e.target.dataset.username);
    if (!friend) {
      console.log('no user found');
      return;
    }
    if (user.friendIds.includes(friend.id)) {
      console.log('user already in network');
      return;
    }
    if (friend.id === user.id) {
      console.log('cannot add yourself');
      return;
    }
    const alteredUser = await addIdToUserFriendIds(user.id, friend.id);
    setUser(alteredUser);
    handleAddState();
    navigate('/network');
  };

  const setAvatarUrl = async (file) => {
    const url = await getFileFromStorage(file);
    return url;
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
            <SearchResult
              key={result.id}
              result={result}
              handleAddFriendSubmit={handleAddFriendSubmit}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default AddFriendForm;
