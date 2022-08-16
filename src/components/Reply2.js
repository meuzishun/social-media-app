import React, { useState, useEffect } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import { getPostsByParentId } from '../services/firebaseApp';

function Reply2({ reply, getAndSetReplyReplies }) {
  const [replies, setReplies] = useState([]);

  const getAndSetReplyReplies2 = () => {
    getPostsByParentId(reply.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  useEffect(() => {
    getAndSetReplyReplies2();
  }, []);

  return (
    <div className='reply'>
      <ReplyContent
        reply={reply}
        getAndSetCommentReplies={getAndSetReplyReplies}
      />
      <ReplyForm2
        reply={reply}
        getAndSetReplyReplies={getAndSetReplyReplies2}
      />
      {replies ? (
        <div className='replies'>
          {replies.map((reply) => (
            <Reply2
              key={reply.id}
              reply={reply}
              getAndSetReplyReplies={getAndSetReplyReplies2}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Reply2;
