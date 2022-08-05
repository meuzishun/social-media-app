import React, { useState, useContext } from 'react';
import { AppFunctions } from '../App';

function ReplyForm({ postId, setReplyState }) {
  const [replyContent, setReplyContent] = useState();

  const { submitPostReply } = useContext(AppFunctions);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    //! This is a problem if the postId is a reply!
    submitPostReply(postId, replyContent);
    //TODO: maybe set a post state initially as a copy of the post? Then push reply to postState.replies and update the post on the backend with the post state?
    setReplyContent('');
    setReplyState(false);
  };

  const handleReplyCancel = () => {
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
