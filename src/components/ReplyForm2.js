import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import uniqid from 'uniqid';
import { addPost, uploadFileToStorage } from '../services/firebaseApp';
import './ReplyForm.css';

function ReplyForm2({ reply, getAndSetReplyReplies }) {
  const { user } = useContext(UserContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [input, setInput] = useState(null);
  const [fileState, setFileState] = useState(null);
  const inputElem = useRef(null);

  const handleAddClick = () => {
    setDisplayForm(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setDisplayForm(false);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const filename = fileState ? fileState.name : null;
    const postData = {
      id: uniqid(),
      parentId: reply.childId,
      childId: uniqid(),
      authorId: user.id,
      timestamp: now.toISOString(),
      content: input,
      file: filename,
    };
    if (postData.file) {
      await uploadFileToStorage(fileState, postData.file);
    }
    await addPost(postData);
    getAndSetReplyReplies();
    setInput(null);
    setDisplayForm(false);
  };

  useEffect(() => {
    if (displayForm) {
      inputElem.current.focus();
    }
  }, [displayForm]);

  return (
    <>
      {!displayForm ? (
        <button type='button' className='addReplyBtn' onClick={handleAddClick}>
          add reply
        </button>
      ) : (
        <form className='addReplyForm' onSubmit={handleReplySubmit}>
          <input
            type='text'
            name='addReply'
            className='textInput'
            placeholder='reply'
            defaultValue={input}
            onChange={handleInputChange}
            ref={inputElem}
          />
          <input
            type='file'
            id='file'
            className='fileInput'
            name='file'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            // defaultValue={userState.avatar}
          ></input>
          <button type='submit' className='submitBtn'>
            submit
          </button>
          <button
            type='button'
            className='cancelBtn'
            onClick={handleInputCancel}
          >
            cancel
          </button>
        </form>
      )}
    </>
  );
}

export default ReplyForm2;
