import React, { useEffect, useState } from 'react';
import CommentContent from './CommentContent';
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import { getPostsByParentId } from '../services/firebaseApp';

function Comment({ comment, getAndSetPostComments }) {
  const [replies, setReplies] = useState([]);

  const getAndSetCommentReplies = () => {
    getPostsByParentId(comment.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  useEffect(() => {
    getAndSetCommentReplies();
  }, []);

  return (
    <div className='comment'>
      <CommentContent
        comment={comment}
        getAndSetPostComments={getAndSetPostComments}
      />
      <ReplyForm
        comment={comment}
        getAndSetCommentReplies={getAndSetCommentReplies}
      />
      {replies ? (
        <div className='replies'>
          {replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              getAndSetCommentReplies={getAndSetCommentReplies}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
