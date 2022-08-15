import React, { useContext, useState } from 'react';
import { PostStateContext } from './Post';

function PostContent() {
  const { postStateFromDatabase, authorName } = useContext(PostStateContext);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(postStateFromDatabase.content);

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
    const updatedPostContent = input;
    //! temporarily change the input
    setInput(postStateFromDatabase.content);
    setEditMode(false);
    console.log(updatedPostContent);
    console.log(postStateFromDatabase);
  };

  return (
    <>
      {!editMode ? (
        <div className='postContent'>
          <p>
            <span>{authorName}:</span> {postStateFromDatabase.content}
          </p>
          <button type='button' className='editBtn' onClick={handleEditClick}>
            edit
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
