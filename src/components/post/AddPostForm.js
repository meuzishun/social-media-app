import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { addPost, uploadFileToStorage } from '../../services/firebaseApp';
import uniqid from 'uniqid';
import './AddPostForm.css';

function AddPostForm({ hideNewPostForm, getAndSetUserPosts }) {
  const [inputState, setInputState] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [fileState, setFileState] = useState(null);

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const parentId = uniqid();
    const filename = fileState ? fileState.name : null;
    const postData = {
      id: uniqid(),
      parentId: parentId,
      childId: parentId,
      authorId: user.id,
      timestamp: now.toISOString(),
      content: inputState,
      file: filename,
    };
    if (postData.file) {
      await uploadFileToStorage(fileState, postData.file);
    }
    await addPost(postData);
    hideNewPostForm();
    getAndSetUserPosts();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  return (
    <div className='addPostContainer'>
      <form onSubmit={handleAddPostSubmit}>
        <label htmlFor='postContent'>content</label>
        <input
          type='text'
          name='postContent'
          id='postContent'
          defaultValue={inputState}
          onChange={handleInputChange}
        />
        <label htmlFor='file'>add image</label>
        <input
          type='file'
          id='file'
          name='file'
          accept='image/png, image/jpeg'
          onChange={handleFileChange}
          // defaultValue={userState.avatar}
        ></input>
        <div className='btnContainer'>
          <button type='submit'>submit</button>
          <button type='button' onClick={hideNewPostForm}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPostForm;
