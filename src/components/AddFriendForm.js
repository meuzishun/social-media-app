import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import {
  getUserByUsername,
  addIdToUserFriendIds,
} from '../services/firebaseApp';
import './AddFriendForm.css';

function AddFriendForm({ handleAddState }) {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
  };

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    const friend = await getUserByUsername(usernameSearch);
    if (!friend) {
      console.log('no user found');
    }
    if (user.friendIds.includes(friend.id)) {
      console.log('user already in network');
    }
    const alteredUser = await addIdToUserFriendIds(user.id, friend.id);
    setUser(alteredUser);
    handleAddState();
    navigate('/network');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className='addFriendForm' onSubmit={handleAddFriendSubmit}>
      <label>search for username</label>
      <input
        type='text'
        id='username'
        name='username'
        ref={inputRef}
        defaultValue={usernameSearch}
        onChange={handleInputChange}
      />
      <button type='submit'>add to network</button>
      <button type='button' onClick={handleAddState}>
        cancel
      </button>
    </form>
  );
}

export default AddFriendForm;
