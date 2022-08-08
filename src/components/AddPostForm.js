import React, { useContext, useState } from 'react';
// import { AppFunctions } from '../App';
import { UserContext } from '../App';
import { addPost, addPostIdToUserById } from '../services/firebaseApp';
import uniqid from 'uniqid';

function AddPostForm({ hideNewPostForm }) {
  const [inputState, setInputState] = useState(null);
  const { user, setUser } = useContext(UserContext);

  // const { submitPost } = useContext(AppFunctions);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    console.log(inputState);
    //TODO: format post and send to db... eventually
    // const submittedPost = await submitPost(inputState);
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
    // console.log(submittedPost);
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
