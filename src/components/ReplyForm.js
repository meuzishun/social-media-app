import React, { useState, useContext } from 'react';
import { AppFunctions } from '../App';

function ReplyForm({ postId, setReplyState, setPost }) {
  const [replyContent, setReplyContent] = useState();

  const { submitPostReply } = useContext(AppFunctions);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const alteredPost = await submitPostReply(postId, replyContent);
    setPost(alteredPost);
    setReplyContent('');
    setReplyState(false);
  };

  const handleReplyCancel = () => {
    setReplyContent('');
    setReplyState(false);
  };
  return (
    <form onSubmit={handleReplySubmit}>
      <input
        type='text'
        name='content'
        defaultValue={replyContent}
        onChange={handleReplyChange}
      />
      <button type='submit'>submit</button>
      <button type='button' onClick={handleReplyCancel}>
        cancel
      </button>
    </form>
  );
}

export default ReplyForm;
