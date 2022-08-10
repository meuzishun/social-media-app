import React, { useContext } from 'react';
import { UserContext } from '../App';
import { deleteFriendFromUserNetwork } from '../services/firebaseApp';

function Friend({ friend }) {
  const { user, setUser } = useContext(UserContext);

  const handleRemoveClick = async () => {
    if (!user.friends.includes(friend.id)) {
      console.log('friend not in network');
      return;
    }
    const alteredUser = await deleteFriendFromUserNetwork(user.id, friend.id);
    setUser(alteredUser);
    console.log(`friend with id ${friend.id} has been removed`);
  };

  return (
    <div className='friendContainer'>
      <p>
        {friend.fullName} ({friend.username})
      </p>
      <p>email: {friend.email}</p>
      <button onClick={handleRemoveClick}>remove friend</button>
    </div>
  );
}

export default Friend;
