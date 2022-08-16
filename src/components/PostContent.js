import React, { useEffect, useState } from 'react';
import { getUserById, updatePostContent } from '../services/firebaseApp';

function PostContent({ postState, setPostState }) {
  const [authorName, setAuthorName] = useState(null);
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
      getUserById(postState.authorId).then((user) =>
        setAuthorName(user.username)
      );
    }
  }, []);

  return (
    <>
      {!editMode ? (
        <div className='postContent'>
          <p>
            <span>{authorName}:</span> {postState.content}
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
