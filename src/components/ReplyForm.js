import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import uniqid from 'uniqid';
import { addPost } from '../services/firebaseApp';
import './ReplyForm.css';

function ReplyForm({ comment, getAndSetCommentReplies }) {
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

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const postData = {
      id: uniqid(),
      parentId: comment.childId,
      childId: uniqid(),
      authorId: user.id,
      timestamp: now.toISOString(),
      content: input,
    };
    await addPost(postData);
    getAndSetCommentReplies();
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
        <button type='button' className='addReplyBtn' onClick={handleAddClick}>
          add reply
        </button>
      ) : (
        <form className='addReplyForm' onSubmit={handleReplySubmit}>
          <input
            type='text'
            name='addReply'
            placeholder='reply'
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

export default ReplyForm;
