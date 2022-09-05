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
import styles from './ReplyContent.module.css';

function ReplyContent({ replyState, setReplyState }) {
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(replyState.content);
  const [author, setAuthor] = useState(null);
  const { user } = useContext(UserContext);
  const inputElem = useRef(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async () => {
    if (replyState.file) {
      await removeFileFromStorage(replyState.file);
    }
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

    if (replyState.file) {
      getFileFromStorage(replyState.file).then((url) => setFile(url));
    }
  }, []);

  return (
    <>
      {author ? (
        <div className={styles.replyContent}>
          <img src={avatar} alt='avatar' className={styles.avatar} />
          <p className={styles.username}>{author.username}</p>
          <hr />
          {!editMode ? (
            <>
              {replyState.authorId === user.id ? (
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
              <p className={styles.content}>{replyState.content}</p>
              {file ? (
                <img src={file} alt='post file' className={styles.postFile} />
              ) : null}
            </>
          ) : (
            <form className={styles.replyEditForm} onSubmit={handleInputSubmit}>
              <input
                type='text'
                name='replyEdit'
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

export default ReplyContent;
