import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../../App';
import {
  getUserById,
  updatePostContent,
  getFileFromStorage,
  deletePostById,
  getPostById,
  deletePostsByParentId,
  removeFileFromStorage,
} from '../../services/firebaseApp';
import styles from './CommentContent.module.css';

function CommentContent({ commentState, setCommentState }) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(commentState.content);
  const [author, setAuthor] = useState(null);
  const { user } = useContext(UserContext);
  const inputElem = useRef(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (commentState.file) {
      await removeFileFromStorage(commentState.file);
    }
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

    if (commentState.file) {
      getFileFromStorage(commentState.file).then((url) => setFile(url));
    }
  }, []);

  return (
    <>
      {author ? (
        <div className={styles.commentContent}>
          <img src={avatar} alt='avatar' className={styles.avatar} />
          <p className={styles.username}>{author.username}</p>
          <hr />
          {!editMode ? (
            <>
              {commentState.authorId === user.id ? (
                <>
                  <button
                    type='button'
                    className={styles.editBtn}
                    onClick={handleEditClick}
                  >
                    edit
                  </button>
                  <button
                    type='button'
                    className={styles.delBtn}
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
              <p className={styles.content}>{commentState.content}</p>
              {file ? (
                <img src={file} alt='post file' className={styles.postFile} />
              ) : null}
            </>
          ) : (
            <form
              className={styles.commentEditForm}
              onSubmit={handleInputSubmit}
            >
              <input
                type='text'
                name='commentEdit'
                defaultValue={input}
                onChange={handleInputChange}
                ref={inputElem}
              />
              <button type='submit' className={styles.submitBtn}>
                submit
              </button>
              <button
                type='button'
                className={styles.cancelBtn}
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
