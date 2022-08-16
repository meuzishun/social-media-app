import React, { useState, useEffect } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import Reply2 from './Reply2';
import { getPostsByParentId } from '../services/firebaseApp';

function Reply({ reply, getAndSetCommentReplies }) {
  const [replies, setReplies] = useState([]);

  const getAndSetReplyReplies = () => {
    getPostsByParentId(reply.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  useEffect(() => {
    getAndSetReplyReplies();
  }, []);

  return (
    <div className='reply'>
      <ReplyContent
        reply={reply}
        getAndSetCommentReplies={getAndSetCommentReplies}
      />
      <ReplyForm2 reply={reply} getAndSetReplyReplies={getAndSetReplyReplies} />
      {replies ? (
        <div className='replies'>
          {replies.map((reply) => (
            <Reply2
              key={reply.id}
              reply={reply}
              getAndSetReplyReplies={getAndSetReplyReplies}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Reply;
