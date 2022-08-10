import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { addPost, addPostIdToUserById } from '../services/firebaseApp';
import uniqid from 'uniqid';

function AddPostForm({ hideNewPostForm }) {
  const [inputState, setInputState] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const postData = {
      author: user.id,
      content: inputState,
      id: uniqid(),
      replies: [],
      timestamp: now.toISOString(),
    };
    await addPost(postData);
    const alteredUser = await addPostIdToUserById(user.id, postData.id);
    setUser(alteredUser);
    hideNewPostForm();
  };

  return (
    <div>
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
