import React, { useState } from 'react';

function CommentForm2() {
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentContent = input;
    //! temporarily change the input
    setInput(null);
    setDisplayForm(false);
    console.log(commentContent);
  };

  return (
    <>
      {!displayForm ? (
        <button type='button' className='addBtn' onClick={handleAddClick}>
          add comment
        </button>
      ) : (
        <form className='addCommentForm' onSubmit={handleCommentSubmit}>
          <label htmlFor='addComment'>comment</label>
          <input
            type='text'
            name='addComment'
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

export default CommentForm2;
