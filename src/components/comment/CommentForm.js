import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../App';
import uniqid from 'uniqid';
import { addPost, uploadFileToStorage } from '../../services/firebaseApp';
import styles from './CommentForm.module.css';

function CommentForm({ post, getAndSetPostComments }) {
  const { user } = useContext(UserContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [input, setInput] = useState(null);
  const [fileState, setFileState] = useState(null);
  const inputElem = useRef(null);

  const handleAddClick = () => {
    setDisplayForm(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setDisplayForm(false);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const filename = fileState ? `${user.id}/files/${fileState.name}` : null;
    const postData = {
      id: uniqid(),
      parentId: post.childId,
      childId: uniqid(),
      authorId: user.id,
      timestamp: now.toISOString(),
      content: input,
      file: filename,
    };
    if (postData.file) {
      await uploadFileToStorage(fileState, postData.file);
    }
    await addPost(postData);
    getAndSetPostComments();
    setInput(null);
    setDisplayForm(false);
  };

  useEffect(() => {
    if (displayForm) {
      inputElem.current.focus();
    }
  }, [displayForm]);

  return (
    <>
      {!displayForm ? (
        <button
          type='button'
          className={styles.addCommentBtn}
          onClick={handleAddClick}
        >
          add comment
        </button>
      ) : (
        <form className={styles.addCommentForm} onSubmit={handleCommentSubmit}>
          <input
            type='text'
            name='addComment'
            className={styles.textInput}
            placeholder='comment'
            defaultValue={input}
            onChange={handleInputChange}
            ref={inputElem}
          />
          <input
            type='file'
            id='file'
            className={styles.fileInput}
            name='file'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
          ></input>
          <button type='submit' className={styles.submitBtn}>
            submit
          </button>
          <button
            type='button'
            className={styles.cancelBtn}
            onClick={handleInputCancel}
          >
            cancel
          </button>
        </form>
      )}
    </>
  );
}

export default CommentForm;
