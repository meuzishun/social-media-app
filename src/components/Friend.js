import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { NotificationsContext } from '../App';
import {
  deleteFriendIdFromUser,
  getFileFromStorage,
} from '../services/firebaseApp';
import styles from './Friend.module.css';

function Friend({ friend }) {
  const { user, setUser } = useContext(UserContext);
  const { createNotification } = useContext(NotificationsContext);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleRemoveClick = async () => {
    if (!user.friendIds.includes(friend.id)) {
      console.log('friend not in network');
      return;
    }
    const alteredUser = await deleteFriendIdFromUser(user.id, friend.id);
    setUser(alteredUser);
    console.log(`friend with id ${friend.id} has been removed`);
    navigate('/network');
    createNotification(`${friend.username} removed from network`);
  };

  useEffect(() => {
    getFileFromStorage(friend.avatar).then((url) => setAvatar(url));
  }, []);

  return (
    <div className={styles.friendContainer}>
      <img src={avatar} alt='avatar' className={styles.avatar} />
      <h3 className={styles.username}>{friend.username}</h3>
      <p className={styles.name}>{friend.fullName}</p>
      <p className={styles.email}>{friend.email}</p>
      <p className={styles.bio}>{friend.bio}</p>
      <button onClick={handleRemoveClick} className={styles.removeButton}>
        remove friend
      </button>
    </div>
  );
}

export default Friend;
