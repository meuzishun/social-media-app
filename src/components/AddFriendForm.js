import React, { useContext, useState } from 'react';
import { AppFunctions } from '../App';
import { UserContext } from '../App';
import {
  getUserByUsername,
  addFriendToUserNetwork,
} from '../services/firebaseApp';

function AddFriendForm({ handleAddState }) {
  const [usernameSearch, setUsernameSearch] = useState(null);

  // const { submitAddFriend } = useContext(AppFunctions);
  const { user, setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
  };

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    // const response = await submitAddFriend(usernameSearch);
    const friend = await getUserByUsername(usernameSearch);
    if (!friend) {
      console.log('no user found');
    }
    if (user.friends.includes(friend.id)) {
      console.log('user already in network');
    }
    const alteredUser = await addFriendToUserNetwork(user.id, friend.id);
    setUser(alteredUser);
    // return 'friend added';
    handleAddState();
    // console.log(response);
  };

  return (
    <form onSubmit={handleAddFriendSubmit}>
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
