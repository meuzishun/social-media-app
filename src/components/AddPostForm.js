import React, { useState } from 'react';

function AddPostForm({ hideNewPostForm }) {
  const [inputState, setInputState] = useState(null);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = (e) => {
    e.preventDefault();
    console.log(inputState);
    //TODO: format post and send to db... eventually
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
