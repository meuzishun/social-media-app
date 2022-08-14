import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { PostStateContext } from './Post';
import { addCommentToPost } from '../services/firebaseApp';
import uniqid from 'uniqid';

function CommentForm({ setAddCommentFormDisplay }) {
  const [commentFormState, setCommentFormState] = useState(null);
  const { user } = useContext(UserContext);
  const { postStateFromDatabase, setPostStateToDatabase } =
    useContext(PostStateContext);

  const handleCommentFormChange = (e) => {
    setCommentFormState(e.target.value);
  };

  const handleCommentFormCancel = () => {
    setCommentFormState(null);
    setAddCommentFormDisplay(false);
  };

  const handleCommentFormSubmit = async () => {
    const now = new Date();
    const comment = {
      id: uniqid(),
      timestamp: now.toISOString(),
      authorId: user.id,
      content: commentFormState,
      replies: [],
    };
    const alteredPost = {
      ...postStateFromDatabase,
      comments: [...postStateFromDatabase.comments, comment],
    };
    console.log(alteredPost);
    // setPostState();
  };

  return (
    <form onSubmit={handleCommentFormSubmit}>
      <input
        type='text'
        name='content'
        defaultValue={commentFormState}
        onChange={handleCommentFormChange}
      />
      <button type='submit'>submit</button>
      <button type='button' onClick={handleCommentFormCancel}>
        cancel
      </button>
    </form>
  );
}

export default CommentForm;
