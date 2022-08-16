import React, { useEffect, useState } from 'react';
import CommentContent from './CommentContent';
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import { getPostsByParentId } from '../services/firebaseApp';

function Comment({ comment }) {
  const [commentState, setCommentState] = useState(null);
  const [replies, setReplies] = useState([]);

  const getAndSetCommentReplies = () => {
    getPostsByParentId(comment.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
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
          {replies ? (
            <div className='replies'>
              {replies.map((reply) => (
                <Reply key={reply.id} reply={reply} />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Comment;
