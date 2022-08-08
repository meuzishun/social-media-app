import React, { useState } from 'react';
import Friend from '../../../components/Friend';
import AddFriendForm from '../../../components/AddFriendForm';

function Network({ network }) {
  const [addFriendState, setAddFriendState] = useState(false);

  const handleAddState = () => {
    setAddFriendState(!addFriendState);
  };

  return (
    <div>
      {network.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}

      {addFriendState ? (
        <AddFriendForm handleAddState={handleAddState} />
      ) : (
        <button type='button' onClick={handleAddState}>
          add friend
        </button>
      )}
    </div>
  );
}

export default Network;
