import React, { useState, useContext, useEffect } from 'react';
import { PostStateContext } from './Post';

function EditPostForm({ setPostEditFormDisplay }) {
  const [inputState, setInputState] = useState(null);

  const { postStateFromDatabase, setPostStateToDatabase, authorName } =
    useContext(PostStateContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputState(e.target.value);
  };

  const handleInputCancel = () => {
    setInputState(null);
    setPostEditFormDisplay(false);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const alteredPost = { ...postStateFromDatabase, content: inputState };
    setPostStateToDatabase(alteredPost);
    setPostEditFormDisplay(false);
  };

  useEffect(() => {
    setInputState(postStateFromDatabase.content);
  }, []);

  return (
    <form className='postEditForm' onSubmit={handleInputSubmit}>
      <label htmlFor='postEdit'>{authorName}</label>
      <input
        type='text'
        name='postEdit'
        defaultValue={inputState}
        onChange={handleInputChange}
      />
      <button type='submit'>submit</button>
      <button type='button' onClick={handleInputCancel}>
        cancel
      </button>
    </form>
  );
}

export default EditPostForm;
