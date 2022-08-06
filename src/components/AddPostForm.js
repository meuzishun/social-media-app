import React, { useContext, useState } from 'react';
import { AppFunctions } from '../App';

function AddPostForm({ hideNewPostForm }) {
  const [inputState, setInputState] = useState(null);

  const { submitPost } = useContext(AppFunctions);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    console.log(inputState);
    //TODO: format post and send to db... eventually
    const submittedPost = await submitPost(inputState);
    console.log(submittedPost);
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
