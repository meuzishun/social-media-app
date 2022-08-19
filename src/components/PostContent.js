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
      <div className='postContent'>
        <img src={avatar} alt='avatar' className='avatar' />
        <p className='username'>{authorName}</p>
        {!editMode ? (
          <>
            <button type='button' className='editBtn' onClick={handleEditClick}>
              edit
            </button>
            <button type='button' className='delBtn'>
              delete
            </button>
          </>
        ) : null}
        {!editMode ? (
          <p className='content'>{postState.content}</p>
        ) : (
          <form className='postEditForm' onSubmit={handleInputSubmit}>
            {/* <label htmlFor='postEdit'>{authorName}</label> */}
            <input
              type='text'
              name='postEdit'
              defaultValue={input}
              onChange={handleInputChange}
            />
            <button type='submit' className='submitBtn'>
              submit
            </button>
            <button
              type='button'
              className='cancelBtn'
              onClick={handleInputCancel}
            >
              cancel
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default PostContent;
