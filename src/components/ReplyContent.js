import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../App';
import {
  getUserById,
  updatePostContent,
  getFileFromStorage,
  deletePostById,
  getPostById,
  deletePostsByParentId,
} from '../services/firebaseApp';
import './ReplyContent.css';

function ReplyContent({ replyState, setReplyState }) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [input, setInput] = useState(replyState.content);
  const [author, setAuthor] = useState(null);
  const { user } = useContext(UserContext);
  const inputElem = useRef(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    console.log(replyState.id);
    await deletePostById(replyState.id);
    const post = await getPostById(replyState.id);
    await deletePostsByParentId(replyState.childId);
    setReplyState(post);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setEditMode(false);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const alteredReply = await updatePostContent(replyState.id, input);
    setReplyState(alteredReply);
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode) {
      inputElem.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    getUserById(replyState.authorId).then((author) => {
      setAuthor(author);
      getFileFromStorage(author.avatar).then((url) => setAvatar(url));
    });
  }, []);

  return (
    <>
      {author ? (
        <div className='replyContent'>
          <img src={avatar} alt='avatar' className='avatar' />
          <p className='username'>{author.username}</p>
          <hr />
          {!editMode ? (
            <>
              {replyState.authorId === user.id ? (
                <>
                  <button
                    type='button'
                    className='editBtn'
                    onClick={handleEditClick}
                  >
                    edit
                  </button>
                  <button
                    type='button'
                    className='delBtn'
                    onClick={handleDeleteClick}
                  >
                    delete
                  </button>
                </>
              ) : null}
            </>
          ) : null}
          {!editMode ? (
            <p className='content'>{replyState.content}</p>
          ) : (
            <form className='replyEditForm' onSubmit={handleInputSubmit}>
              <input
                type='text'
                name='replyEdit'
                defaultValue={input}
                onChange={handleInputChange}
                ref={inputElem}
              />
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
        </div>
      ) : null}
    </>
  );
}

export default ReplyContent;
