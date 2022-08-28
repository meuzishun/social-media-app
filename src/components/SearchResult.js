import React, { useEffect, useState } from 'react';
import { getFileFromStorage } from '../services/firebaseApp';
import './SearchResult.css';

export default function SearchResult({ result, handleAddFriendSubmit }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getFileFromStorage(result.avatar).then((url) => setAvatarUrl(url));
  }, []);

  return (
    <div className='singleResult'>
      <img src={avatarUrl} alt='userAvatar' />
      <p className='userSearch'>{result.username}</p>
      <button onClick={handleAddFriendSubmit} data-username={result.username}>
        add friend
      </button>
    </div>
  );
}
