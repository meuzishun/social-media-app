import React, { useEffect, useState } from 'react';
import { getUserById, updatePostContent } from '../services/firebaseApp';

function ReplyContent({ replyState, setReplyState }) {
  const [input, setInput] = useState(replyState.content);
  const [editMode, setEditMode] = useState(false);
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
    const alteredReply = await updatePostContent(replyState.id, input);
    setReplyState(alteredReply);
    setEditMode(false);
  };

  useEffect(() => {
    getUserById(replyState.authorId).then((user) =>
      setAuthorName(user.username)
    );
  });

  return (
    <>
      {!editMode ? (
        <div className='replyContent'>
          <p>
            <span>{authorName}:</span> {replyState.content}
          </p>
          <button type='button' className='editBtn' onClick={handleEditClick}>
            edit
          </button>
        </div>
      ) : (
        <form className='replyEditForm' onSubmit={handleInputSubmit}>
          <label htmlFor='replyEdit'>{authorName}</label>
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

export default ReplyContent;
