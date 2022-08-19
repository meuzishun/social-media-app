import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../App';
import uniqid from 'uniqid';
import { addPost } from '../services/firebaseApp';
import './CommentForm.css';

function CommentForm({ post, getAndSetPostComments }) {
  const { user } = useContext(UserContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [input, setInput] = useState(null);
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const postData = {
      id: uniqid(),
      parentId: post.childId,
      childId: uniqid(),
      authorId: user.id,
      timestamp: now.toISOString(),
      content: input,
    };
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
          className='addCommentBtn'
          onClick={handleAddClick}
        >
          add comment
        </button>
      ) : (
        <form className='addCommentForm' onSubmit={handleCommentSubmit}>
          <input
            type='text'
            name='addComment'
            placeholder='comment'
            defaultValue={input}
            onChange={handleInputChange}
            ref={inputElem}
          />
          <button type='submit' className='submitBtn'>
            submit
          </button>
          <button
            type='button'
            className='cancelBtn'
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
