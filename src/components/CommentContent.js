import React, { useEffect, useState } from 'react';
import { getUserById, updatePostContent } from '../services/firebaseApp';

function CommentContent({ commentState, setCommentState }) {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(commentState.content);
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

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const alteredComment = await updatePostContent(commentState.id, input);
    setCommentState(alteredComment);
    setEditMode(false);
  };

  useEffect(() => {
    getUserById(commentState.authorId).then((user) =>
      setAuthorName(user.username)
    );
  });

  return (
    <>
      {!editMode ? (
        <div className='commentContent'>
          <p>
            <span>{authorName}:</span> {commentState.content}
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
