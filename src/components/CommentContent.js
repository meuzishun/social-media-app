import React, { useEffect, useState, useContext } from 'react';
import { CommentContext } from './Post';
import { getUserById } from '../services/firebaseApp';

function CommentContent() {
  const { comment } = useContext(CommentContext);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(comment.content);
  const [authorName, setAuthorName] = useState(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setEditMode(false);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const updatedCommentContent = input;
    //! temporarily change the input
    setInput(comment.content);
    setEditMode(false);
    console.log(updatedCommentContent);
  };

  useEffect(() => {
    getUserById(comment.authorId).then((user) => setAuthorName(user.username));
  });

  return (
    <>
      {!editMode ? (
        <div className='commentContent'>
          <p>
            <span>{authorName}:</span> {comment.content}
          </p>
          <button type='button' className='editBtn' onClick={handleEditClick}>
            edit
          </button>
        </div>
      ) : (
        <form className='commentEditForm' onSubmit={handleInputSubmit}>
          <label htmlFor='commentEdit'>{authorName}</label>
          <input
            type='text'
            name='commentEdit'
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

export default CommentContent;
