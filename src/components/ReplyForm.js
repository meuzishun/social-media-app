import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { PostStateContext } from './Post';
import { addPost, addReplyIdToPostById } from '../services/firebaseApp';
import uniqid from 'uniqid';

function ReplyForm({ setAddReplyFormDisplay }) {
  const [replyContent, setReplyContent] = useState();
  const { user } = useContext(UserContext);
  const { postState, setPostState } = useContext(PostStateContext);

  const handleReplyFormChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplyFormCancel = () => {
    setReplyContent(null);
    setAddReplyFormDisplay(false);
  };

  const handleReplyFormSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const reply = {
      author: user.id,
      content: replyContent,
      id: uniqid(),
      replies: [],
      timestamp: now.toISOString(),
    };
    // await addPost(reply);
    // const alteredPost = await addReplyIdToPostById(postId, reply.id);
    // setPost(alteredPost);
    // setReplyContent('');
    // setReplyState(false);
  };

  return (
    <form className='replyForm' onSubmit={handleReplyFormSubmit}>
      <input
        type='text'
        name='content'
        defaultValue={replyContent}
        onChange={handleReplyFormChange}
      />
      <button type='submit'>submit</button>
      <button type='button' onClick={handleReplyFormCancel}>
        cancel
      </button>
    </form>
  );
}

export default ReplyForm;
