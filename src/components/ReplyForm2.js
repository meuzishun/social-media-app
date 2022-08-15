import React, { useState } from 'react';

function ReplyForm2() {
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

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const replyContent = input;
    //! temporarily change the input
    setInput(null);
    setDisplayForm(false);
    console.log(replyContent);
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
