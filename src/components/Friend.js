import React, { useContext } from 'react';
import { AppFunctions } from '../App';

function Friend({ friend }) {
  const { submitFriendRemove } = useContext(AppFunctions);

  const handleRemoveClick = async () => {
    const response = await submitFriendRemove(friend.id);
    console.log(response);
  };

  return (
    <div>
      <p>
        {friend.fullName} ({friend.username})
      </p>
      <p>email: {friend.email}</p>
      <button onClick={handleRemoveClick}>remove friend</button>
    </div>
  );
}

export default Friend;
