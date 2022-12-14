import React, { useState, useEffect, useRef } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import { getPostsByParentId } from '../../services/firebaseApp';
import styles from './Reply.module.css';

function Reply2({ reply }) {
  const [replyState, setReplyState] = useState(null);
  const [replies, setReplies] = useState([]);
  const repliesContainer = useRef(null);
  const hideRepliesBtn = useRef(null);
  const showRepliesBtn = useRef(null);

  const getAndSetReplyReplies2 = () => {
    getPostsByParentId(reply.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  const handleShowRepliesClick = () => {
    repliesContainer.current.style = 'display: block;';
    hideRepliesBtn.current.style = 'display: block;';
    showRepliesBtn.current.style = 'display: none;';
  };

  const handleHideRepliesClick = () => {
    repliesContainer.current.style = 'display: none;';
    hideRepliesBtn.current.style = 'display: none;';
    showRepliesBtn.current.style = 'display: block;';
  };

  useEffect(() => {
    setReplyState(reply);
    getAndSetReplyReplies2();
  }, []);

  return (
    <div className={styles.reply}>
      {replyState ? (
        <>
          <ReplyContent replyState={replyState} setReplyState={setReplyState} />
          <ReplyForm2
            reply={reply}
            getAndSetReplyReplies={getAndSetReplyReplies2}
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
                  <Reply2 key={reply.id} reply={reply} />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Reply2;
