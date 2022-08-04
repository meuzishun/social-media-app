import React, { useContext, useState } from 'react';
import { AppFunctions } from '../App';

function AddFriendForm({ handleAddState }) {
  const [usernameSearch, setUsernameSearch] = useState(null);

  const { submitAddFriend } = useContext(AppFunctions);

  const handleInputChange = (e) => {
    setUsernameSearch(e.target.value);
  };

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    const response = await submitAddFriend(usernameSearch);
    console.log(response);
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
