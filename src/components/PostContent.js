import React, { useEffect, useState } from 'react';
import { getUserById, updatePostContent } from '../services/firebaseApp';

function PostContent({ post, getAndSetUserPosts }) {
  const [authorName, setAuthorName] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(post.content);

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
    await updatePostContent(post.id, input);
    getAndSetUserPosts();
    setEditMode(false);
  };

  useEffect(() => {
    if (post) {
      getUserById(post.authorId).then((user) => setAuthorName(user.username));
    }
  }, []);

  return (
    <>
      {!editMode ? (
        <div className='postContent'>
          <p>
            <span>{authorName}:</span> {post.content}
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
