import React, { useEffect, useState, useRef } from 'react';
import {
  getUserById,
  updatePostContent,
  getFileFromStorage,
} from '../services/firebaseApp';
import './ReplyContent.css';

function ReplyContent({ replyState, setReplyState }) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [input, setInput] = useState(replyState.content);
  const [authorName, setAuthorName] = useState(null);
  const inputElem = useRef(null);

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
    const alteredReply = await updatePostContent(replyState.id, input);
    setReplyState(alteredReply);
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode) {
      inputElem.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    getUserById(replyState.authorId).then((user) => {
      setAuthorName(user.username);
      getFileFromStorage(user.avatar).then((url) => setAvatar(url));
    });
  });

  return (
    <>
      <div className='replyContent'>
        <img src={avatar} alt='avatar' className='avatar' />
        <p className='username'>{authorName}</p>
        <hr />
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
          <p className='content'>{replyState.content}</p>
        ) : (
          <form className='replyEditForm' onSubmit={handleInputSubmit}>
            <input
              type='text'
              name='replyEdit'
              defaultValue={input}
              onChange={handleInputChange}
              ref={inputElem}
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

export default ReplyContent;
