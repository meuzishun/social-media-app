import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { PostStateContext } from './Post';
import { addCommentToPost } from '../services/firebaseApp';
import uniqid from 'uniqid';

function CommentForm({ setAddCommentFormDisplay, commentsArray }) {
  const [commentFormState, setCommentFormState] = useState(null);
  // const commentsCopy = [...commentsArray];
  // const [commentsState, setCommentsState] = useState(commentsArray);
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

  const handleCommentFormSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const newComment = {
      id: uniqid(),
      timestamp: now.toISOString(),
      authorId: user.id,
      content: commentFormState,
      replies: [],
    };
    changeComments([...commentsArray, newComment]);
    setCommentFormState(null);
    setAddCommentFormDisplay(false);
    // console.log(commentsState);
    // setCommentsState(commentsState.concat(newComment));
  };

  const changeComments = (newCommentsArray) => {
    const alteredPost = {
      ...postStateFromDatabase,
      comments: newCommentsArray,
    };
    setPostStateToDatabase(alteredPost);
  };

  // useEffect(() => {
  //   const alteredPost = {
  //     ...postStateFromDatabase,
  //     comments: [...commentsState],
  //   };
  //   console.log(alteredPost);
  //   // setPostStateToDatabase(alteredPost);
  //   // setCommentFormState(null);
  //   // setAddCommentFormDisplay(false);
  // }, [commentsState]);

  // useEffect(() => {
  //   setCommentsState(commentsArray);
  // }, []);

  return (
    <form className='addCommentForm' onSubmit={handleCommentFormSubmit}>
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
