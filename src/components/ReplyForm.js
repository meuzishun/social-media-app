import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { addPost, addReplyIdToPostById } from '../services/firebaseApp';
import uniqid from 'uniqid';

function ReplyForm({ postId, setReplyState, setPost }) {
  const [replyContent, setReplyContent] = useState();
  const { user } = useContext(UserContext);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const reply = {
      author: user.id,
      content: replyContent,
      id: uniqid(),
      replies: [],
      timestamp: now.toISOString(),
    };
    await addPost(reply);
    const alteredPost = await addReplyIdToPostById(postId, reply.id);
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
