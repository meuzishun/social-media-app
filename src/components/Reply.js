import React, { useState, useEffect } from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm2 from './ReplyForm2';
import Reply2 from './Reply2';
import { getPostsByParentId } from '../services/firebaseApp';

function Reply({ reply }) {
  const [replyState, setReplyState] = useState(null);
  const [replies, setReplies] = useState([]);

  const getAndSetReplyReplies = () => {
    getPostsByParentId(reply.childId).then((posts) => {
      const replies = posts.filter((post) => post.parentId !== post.childId);
      setReplies(replies);
    });
  };

  useEffect(() => {
    setReplyState(reply);
    getAndSetReplyReplies();
  }, []);

  return (
    <div className='reply'>
      {replyState ? (
        <>
          <ReplyContent replyState={replyState} setReplyState={setReplyState} />
          <ReplyForm2
            reply={reply}
            getAndSetReplyReplies={getAndSetReplyReplies}
          />
          {replies ? (
            <div className='replies'>
              {replies.map((reply) => (
                <Reply2 key={reply.id} reply={reply} />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Reply;
