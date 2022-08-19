import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import uniqid from 'uniqid';
import { addPost } from '../services/firebaseApp';

function CommentForm({ post, getAndSetPostComments }) {
  const { user } = useContext(UserContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [input, setInput] = useState(null);

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

  return (
    <>
      {!displayForm ? (
        <>
          {/* <button type='button' className='showComments'>
            show comments
          </button> */}
          <button type='button' className='addBtn' onClick={handleAddClick}>
            add comment
          </button>
        </>
      ) : (
        <form className='addCommentForm' onSubmit={handleCommentSubmit}>
          {/* <label htmlFor='addComment'>comment</label> */}
          <input
            type='text'
            name='addComment'
            placeholder='comment'
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

export default CommentForm;
