import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { addPost, addPostIdToUserById } from '../services/firebaseApp';
import uniqid from 'uniqid';
import './AddPostForm.css';

function AddPostForm({ hideNewPostForm, getAndSetUserPosts }) {
  const [inputState, setInputState] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const parentId = uniqid();
    const postData = {
      id: uniqid(),
      parentId: parentId,
      childId: parentId,
      authorId: user.id,
      timestamp: now.toISOString(),
      content: inputState,
    };
    await addPost(postData);
    // const alteredUser = await addPostIdToUserById(user.id, postData.id);
    // setUser(alteredUser);
    hideNewPostForm();
    getAndSetUserPosts();
  };

  return (
    <div className='addPostContainer'>
      <form onSubmit={handleAddPostSubmit}>
        <input
          type='text'
          name='postContent'
          defaultValue={inputState}
          onChange={handleInputChange}
        />
        <button type='submit'>submit</button>
      </form>
      <button type='button' onClick={hideNewPostForm}>
        cancel
      </button>
    </div>
  );
}

export default AddPostForm;
