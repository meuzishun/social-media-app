import React, { useContext } from 'react';
// import { AppFunctions } from '../App';
import { UserContext } from '../App';
import { deleteFriendFromUserNetwork } from '../services/firebaseApp';

function Friend({ friend }) {
  // const { submitFriendRemove } = useContext(AppFunctions);
  const { user, setUser } = useContext(UserContext);

  const handleRemoveClick = async () => {
    // await submitFriendRemove(friend.id);
    if (!user.friends.includes(friend.id)) {
      // return 'friend not in network';
      console.log('friend not in network');
      return;
    }
    const alteredUser = await deleteFriendFromUserNetwork(user.id, friend.id);
    setUser(alteredUser);
    // return `friend with id ${friendId} has been removed`;
    console.log(`friend with id ${friend.id} has been removed`);
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
