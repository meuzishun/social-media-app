import React, { useState, createContext } from 'react';
import Friend from '../../../components/Friend';
import AddFriendForm from '../../../components/AddFriendForm';
import './Network.css';

export const AddState = createContext();

function Network({ network }) {
  const [addFriendState, setAddFriendState] = useState(false);

  const handleAddState = () => {
    setAddFriendState(!addFriendState);
  };

  return (
    <div className='networkPage'>
      <AddState.Provider value={handleAddState}>
        <div className='networkContainer'>
          {addFriendState ? (
            <AddFriendForm />
          ) : (
            <>
              <button type='button' onClick={handleAddState}>
                add friend
              </button>
              {network.map((friend) => (
                <Friend key={friend.id} friend={friend} />
              ))}
            </>
          )}
        </div>
      </AddState.Provider>
    </div>
  );
}

export default Network;
