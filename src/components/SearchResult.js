import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { ModalContext } from '../App';
import { PopupContext } from '../App';
import { NotificationsContext } from '../App';
import {
  getFileFromStorage,
  getUserByUsername,
  addIdToUserFriendIds,
} from '../services/firebaseApp';
import styles from './SearchResult.module.css';

export default function SearchResult({ result }) {
  const { user, setUser } = useContext(UserContext);
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);
  const { createNotification } = useContext(NotificationsContext);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  const handleAddFriendSubmit = async (e) => {
    e.preventDefault();
    const friend = await getUserByUsername(e.target.dataset.username);
    if (!friend) {
      console.log('no user found');
      createNotification('no user found');
      return;
    }
    if (user.friendIds.includes(friend.id)) {
      console.log('user already in network');
      createNotification('user already in network');
      return;
    }
    if (friend.id === user.id) {
      console.log('cannot add yourself');
      createNotification('cannot add yourself');
      return;
    }
    const alteredUser = await addIdToUserFriendIds(user.id, friend.id);
    setUser(alteredUser);
    setPopupContent(null);
    setDisplayModal(false);
    navigate('/network');
    createNotification(`${friend.username} added to network`);
  };

  useEffect(() => {
    getFileFromStorage(result.avatar).then((url) => setAvatarUrl(url));
  }, []);

  return (
    <div className={styles.singleResult}>
      {avatarUrl ? <img src={avatarUrl} alt='userAvatar' /> : null}
      <p className={styles.userSearch}>{result.username}</p>
      <button onClick={handleAddFriendSubmit} data-username={result.username}>
        add friend
      </button>
    </div>
  );
}
