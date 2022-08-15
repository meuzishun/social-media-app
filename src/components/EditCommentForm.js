import React, { useState, useContext, useEffect } from 'react';
import { PostStateContext } from './Post';

function EditCommentForm({
  authorName,
  commentsArray,
  commentData,
  setDisplayCommentEditForm,
}) {
  const [inputState, setInputState] = useState(commentData.content);

  const { postStateFromDatabase, setPostStateToDatabase } =
    useContext(PostStateContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputState(e.target.value);
  };

  const handleInputCancel = () => {
    setInputState(null);
    setDisplayCommentEditForm(false);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const alteredComment = { ...commentData, content: inputState };
    console.log(alteredComment);
    //TODO: Replace old comment with new one
    const alteredComments = commentsArray.map((comment) =>
      comment.id === alteredComment.id ? alteredComment : comment
    );
    console.log(alteredComments);
    //TODO: run changeComments
    changeComments(alteredComments);
  };

  const changeComments = (newCommentsArray) => {
    const alteredPost = {
      ...postStateFromDatabase,
      comments: newCommentsArray,
    };
    setPostStateToDatabase(alteredPost);
    setDisplayCommentEditForm(false);
  };

  return (
    <form className='commentEditForm' onSubmit={handleInputSubmit}>
      <label htmlFor='commentEdit'>{authorName}</label>
      <input
        type='text'
        name='postEdit'
        defaultValue={inputState}
        onChange={handleInputChange}
      />
      <button type='submit'>submit</button>
      <button type='button' onClick={handleInputCancel}>
        cancel
      </button>
    </form>
  );
}

export default EditCommentForm;
