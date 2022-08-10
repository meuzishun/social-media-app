import React, { useState } from 'react';
import Friend from '../../../components/Friend';
import AddFriendForm from '../../../components/AddFriendForm';
import './Network.css';

function Network({ network }) {
  const [addFriendState, setAddFriendState] = useState(false);

  const handleAddState = () => {
    setAddFriendState(!addFriendState);
  };

  return (
    <div className='networkContainer'>
      {addFriendState ? (
        <AddFriendForm handleAddState={handleAddState} />
      ) : (
        <button type='button' onClick={handleAddState}>
          add friend
        </button>
      )}
      {network.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default Network;
