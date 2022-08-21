import React, { useState, useEffect, useRef } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import { getPostsByParentId } from '../../services/firebaseApp';

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
    repliesContainer.current.classList.remove('hidden');
    hideRepliesBtn.current.classList.remove('hidden');
    showRepliesBtn.current.classList.add('hidden');
  };

  const handleHideRepliesClick = () => {
    repliesContainer.current.classList.add('hidden');
    hideRepliesBtn.current.classList.add('hidden');
    showRepliesBtn.current.classList.remove('hidden');
  };

  useEffect(() => {
    setReplyState(reply);
    getAndSetReplyReplies2();
  }, []);

  return (
    <div className='reply'>
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
                className='showCommentsBtn'
                ref={showRepliesBtn}
                onClick={handleShowRepliesClick}
              >
                show replies
              </button>
              <button
                type='button'
                className='hideRepliesBtn hidden'
                ref={hideRepliesBtn}
                onClick={handleHideRepliesClick}
              >
                hide replies
              </button>
              <div className='replies hidden' ref={repliesContainer}>
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
