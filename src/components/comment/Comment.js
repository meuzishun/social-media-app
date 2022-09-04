import React, { useEffect, useState, useRef } from 'react';
import CommentContent from './CommentContent';
import ReplyForm from '../reply/ReplyForm';
import Reply from '../reply/Reply';
import { getPostsByParentId } from '../../services/firebaseApp';
import styles from './Comment.module.css';

function Comment({ comment }) {
  const [commentState, setCommentState] = useState(null);
  const [replies, setReplies] = useState([]);
  const repliesContainer = useRef(null);
  const hideRepliesBtn = useRef(null);
  const showRepliesBtn = useRef(null);

  const getAndSetCommentReplies = () => {
    getPostsByParentId(comment.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  const handleShowRepliesClick = () => {
    // repliesContainer.current.classList.remove('hidden');
    repliesContainer.current.style = 'display: block;';
    // hideRepliesBtn.current.classList.remove('hidden');
    hideRepliesBtn.current.style = 'display: block;';
    // showRepliesBtn.current.classList.add('hidden');
    showRepliesBtn.current.style = 'display: none;';
  };

  const handleHideRepliesClick = () => {
    // repliesContainer.current.classList.add('hidden');
    repliesContainer.current.style = 'display: none;';
    // hideRepliesBtn.current.classList.add('hidden');
    hideRepliesBtn.current.style = 'display: none;';
    // showRepliesBtn.current.classList.remove('hidden');
    showRepliesBtn.current.style = 'display: block;';
  };

  useEffect(() => {
    setCommentState(comment);
    getAndSetCommentReplies();
  }, []);

  return (
    <div className={styles.comment}>
      {commentState ? (
        <>
          <CommentContent
            commentState={commentState}
            setCommentState={setCommentState}
          />
          <ReplyForm
            comment={comment}
            getAndSetCommentReplies={getAndSetCommentReplies}
          />
          {replies.length > 0 ? (
            <>
              <button
                type='button'
                className={styles.showCommentsBtn}
                ref={showRepliesBtn}
                onClick={handleShowRepliesClick}
              >
                show replies
              </button>
              <button
                type='button'
                className={`${styles.hideRepliesBtn} ${styles.hidden}`}
                ref={hideRepliesBtn}
                onClick={handleHideRepliesClick}
              >
                hide replies
              </button>
              <div
                className={`${styles.replies} ${styles.hidden}`}
                ref={repliesContainer}
              >
                {replies.map((reply) => (
                  <Reply key={reply.id} reply={reply} />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Comment;
