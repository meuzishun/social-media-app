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
import './CommentContent.css';

function CommentContent({ commentState, setCommentState }) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [input, setInput] = useState(commentState.content);
  const [author, setAuthor] = useState(null);
  const { user } = useContext(UserContext);
  const inputElem = useRef(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    console.log(commentState.id);
    await deletePostById(commentState.id);
    const post = await getPostById(commentState.id);
    await deletePostsByParentId(commentState.childId);
    setCommentState(post);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setEditMode(false);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const alteredComment = await updatePostContent(commentState.id, input);
    setCommentState(alteredComment);
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode) {
      inputElem.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    getUserById(commentState.authorId).then((author) => {
      setAuthor(author);
      getFileFromStorage(author.avatar).then((url) => setAvatar(url));
    });
  }, []);

  return (
    <>
      {author ? (
        <div className='commentContent'>
          <img src={avatar} alt='avatar' className='avatar' />
          <p className='username'>{author.username}</p>
          <hr />
          {!editMode ? (
            <>
              {commentState.authorId === user.id ? (
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
            <p className='content'>{commentState.content}</p>
          ) : (
            <form className='commentEditForm' onSubmit={handleInputSubmit}>
              <input
                type='text'
                name='commentEdit'
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

export default CommentContent;
