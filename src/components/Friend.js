import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import {
  deleteFriendFromUserNetwork,
  getFileFromStorage,
} from '../services/firebaseApp';
import './Friend.css';

function Friend({ friend }) {
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  const handleRemoveClick = async () => {
    if (!user.friends.includes(friend.id)) {
      console.log('friend not in network');
      return;
    }
    const alteredUser = await deleteFriendFromUserNetwork(user.id, friend.id);
    setUser(alteredUser);
    console.log(`friend with id ${friend.id} has been removed`);
  };

  useEffect(() => {
    getFileFromStorage(friend.avatar).then((url) => setAvatar(url));
  }, []);

  return (
    <div className='friendContainer'>
      <img src={avatar} alt='avatar' className='avatar' />
      <h3 className='username'>{friend.username}</h3>
      <p className='name'>{friend.fullName}</p>
      <p className='email'>{friend.email}</p>
      <p className='bio'>{friend.bio}</p>
      <button onClick={handleRemoveClick} className='removeButton'>
        remove friend
      </button>
    </div>
  );
}

export default Friend;
