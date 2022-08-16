import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/firebaseApp';

function ReplyContext({ reply }) {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(reply.content);
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
    const updatedReplyContext = input;
    //! temporarily change the input
    setInput(reply.content);
    setEditMode(false);
    console.log(updatedReplyContext);
  };

  useEffect(() => {
    getUserById(reply.authorId).then((user) => setAuthorName(user.username));
  });

  return (
    <>
      {!editMode ? (
        <div className='replyContent'>
          <p>
            <span>{authorName}:</span> {reply.content}
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

export default ReplyContext;
