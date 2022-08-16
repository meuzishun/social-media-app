import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import uniqid from 'uniqid';
import { addPost } from '../services/firebaseApp';

function ReplyForm2({ reply, getAndSetReplyReplies }) {
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

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const postData = {
      id: uniqid(),
      parentId: reply.childId,
      childId: uniqid(),
      authorId: user.id,
      timestamp: now.toISOString(),
      content: input,
    };
    await addPost(postData);
    getAndSetReplyReplies();
    setInput(null);
    setDisplayForm(false);
  };

  return (
    <>
      {!displayForm ? (
        <button type='button' className='addBtn' onClick={handleAddClick}>
          add reply
        </button>
      ) : (
        <form className='addCommentForm' onSubmit={handleReplySubmit}>
          <label htmlFor='addComment'>reply</label>
          <input
            type='text'
            name='addReply'
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

export default ReplyForm2;
