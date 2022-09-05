import React, { useState, useEffect, useRef } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import Reply2 from './Reply2';
import { getPostsByParentId } from '../../services/firebaseApp';
import styles from './Reply.module.css';

function Reply({ reply }) {
  const [replyState, setReplyState] = useState(null);
  const [replies, setReplies] = useState([]);
  const repliesContainer = useRef(null);
  const hideRepliesBtn = useRef(null);
  const showRepliesBtn = useRef(null);

  const getAndSetReplyReplies = () => {
    getPostsByParentId(reply.childId).then((posts) => {
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

  useEffect(() => {}, [repliesContainer]);

  useEffect(() => {
    setReplyState(reply);
    getAndSetReplyReplies();
  }, []);

  return (
    <div className={styles.reply}>
      {replyState ? (
        <>
          <ReplyContent replyState={replyState} setReplyState={setReplyState} />
          <ReplyForm2
            reply={reply}
            getAndSetReplyReplies={getAndSetReplyReplies}
          />
          {replies.length > 0 ? (
            <>
              <button
                type='button'
                className={styles.showRepliesBtn}
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

export default Reply;
