import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import {
  getUserByUsername,
  addFriendToUserNetwork,
} from '../services/firebaseApp';
import './AddFriendForm.css';

function AddFriendForm({ handleAddState }) {
  const [usernameSearch, setUsernameSearch] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
  };

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    const friend = await getUserByUsername(usernameSearch);
    if (!friend) {
      console.log('no user found');
    }
    if (user.friends.includes(friend.id)) {
      console.log('user already in network');
    }
    const alteredUser = await addFriendToUserNetwork(user.id, friend.id);
    setUser(alteredUser);
    handleAddState();
  };

  return (
    <form className='addFriendForm' onSubmit={handleAddFriendSubmit}>
      <label>search for username</label>
      <input
        type='text'
        id='username'
        name='username'
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
