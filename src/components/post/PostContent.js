import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../App';
import {
  getFileFromStorage,
  getUserById,
  updatePostContent,
  deletePostById,
  getPostById,
  deletePostsByParentId,
} from '../../services/firebaseApp';
import './PostContent.css';

function PostContent({ postState, setPostState }) {
  const [author, setAuthor] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(postState.content);
  const { user } = useContext(UserContext);
  const inputElem = useRef(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    console.log(postState.id);
    await deletePostById(postState.id);
    const post = await getPostById(postState.id);
    await deletePostsByParentId(postState.childId);
    setPostState(post);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputCancel = () => {
    setEditMode(false);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const alteredPost = await updatePostContent(postState.id, input);
    setPostState(alteredPost);
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode) {
      inputElem.current.focus();
    }
  }, [editMode]);

  useEffect(() => {
    if (postState) {
      getUserById(postState.authorId).then((author) => {
        setAuthor(author);
        getFileFromStorage(author.avatar).then((url) => setAvatar(url));
      });

      if (postState.file) {
        getFileFromStorage(postState.file).then((url) => setFile(url));
      }
    }
  }, []);

  return (
    <>
      {author ? (
        <div className='postContent'>
          <img src={avatar} alt='avatar' className='avatar' />
          <p className='username'>{author.username}</p>
          <hr />
          {!editMode ? (
            <>
              {postState.authorId === user.id ? (
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
            <>
              <p className='content'>{postState.content}</p>
              {file ? (
                <img src={file} alt='post file' className='postFile' />
              ) : null}
            </>
          ) : (
            <form className='postEditForm' onSubmit={handleInputSubmit}>
              <input
                type='text'
                name='postEdit'
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

export default PostContent;
