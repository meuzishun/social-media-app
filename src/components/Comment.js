import React, { useEffect, useState, useRef } from 'react';
import CommentContent from './CommentContent';
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import { getPostsByParentId } from '../services/firebaseApp';
import './Comment.css';

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
    setCommentState(comment);
    getAndSetCommentReplies();
  }, []);

  return (
    <div className='comment'>
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
