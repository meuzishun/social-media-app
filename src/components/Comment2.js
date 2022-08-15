import React, { useContext, createContext } from 'react';
import { CommentContext } from './Post';
import CommentContent from './CommentContent';
import ReplyForm2 from './ReplyForm2';
import Reply2 from './Reply2';

export const ReplyContext = createContext();

function Comment2() {
  const { comment } = useContext(CommentContext);

  return (
    <div className='comment'>
      <CommentContent />
      <ReplyForm2 />
      {comment.replies ? (
        <div className='replies'>
          {comment.replies.map((reply) => (
            <ReplyContext.Provider value={reply}>
              <Reply2 key={reply.id} />
            </ReplyContext.Provider>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Comment2;
