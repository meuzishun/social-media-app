import React, { useContext, useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import AddFriendForm from '../../../components/AddFriendForm';
import { NetworkContext } from '../../../App';

function Network({ network }) {
  const [addFriendState, setAddFriendState] = useState(false);

  // const network = useContext(NetworkContext);

  const handleAddState = () => {
    setAddFriendState(!addFriendState);
  };

  return (
    <div>
      {/* {console.log(network)} */}
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
