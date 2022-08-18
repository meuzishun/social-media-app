import React, { useEffect, useState } from 'react';
import {
  getFileFromStorage,
  getUserById,
  updatePostContent,
} from '../services/firebaseApp';
import './PostContent.css';

function PostContent({ postState, setPostState }) {
  const [authorName, setAuthorName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(postState.content);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setEditMode(false);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const alteredPost = await updatePostContent(postState.id, input);
    setPostState(alteredPost);
    setEditMode(false);
  };

  useEffect(() => {
    if (postState) {
      getUserById(postState.authorId).then((user) => {
        setAuthorName(user.username);
        getFileFromStorage(user.avatar).then((url) => setAvatar(url));
      });
    }
  }, []);

  return (
    <>
      {!editMode ? (
        <div className='postContent'>
          <img src={avatar} alt='avatar' className='avatar' />
          <p className='username'>{authorName}</p>
          <p className='content'>{postState.content}</p>
          <button type='button' className='editBtn' onClick={handleEditClick}>
            edit
          </button>
          <button type='button' className='delBtn'>
            delete
          </button>
        </div>
      ) : (
        <form className='postEditForm' onSubmit={handleInputSubmit}>
          <label htmlFor='postEdit'>{authorName}</label>
          <input
            type='text'
            name='postEdit'
            defaultValue={input}
            onChange={handleInputChange}
          />
          <button type='submit'>submit</button>
          <button type='button' onClick={handleInputCancel}>
            cancel
          </button>
        </form>
      )}
    </>
  );
}

export default PostContent;
