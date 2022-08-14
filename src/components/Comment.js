import React, { useEffect, useState, useContext } from 'react';
import { PostStateContext } from './Post';
import ReplyForm from './ReplyForm';
import Reply from './Reply';

function Comment({ commentData }) {
  const [commentState, setCommentState] = useState(null);
  const [addReplyFormDisplay, setAddReplyFormDisplay] = useState(false);
  const { postState, setPostState } = useContext(PostStateContext);

  const handleCommentEditSubmit = () => {
    //TODO: remove old comment from post
    //TODO: add new comment to post
  };

  const handleAddReplyClick = () => {
    setAddReplyFormDisplay(true);
  };

  useEffect(() => {
    setCommentState(commentData);
  }, []);

  return (
    <div className='commentContainer'>
      <p>
        <span>{commentState.authorId}:</span> {commentState.content}
      </p>
      {addReplyFormDisplay ? (
        <ReplyForm setAddReplyFormDisplay={setAddReplyFormDisplay} />
      ) : (
        <button type='button' onClick={handleAddReplyClick}>
          add reply
        </button>
      )}
      {commentState.replies ? (
        <div className='replies'>
          {commentState.replies.map((reply) => (
            <Reply key={reply.id} replyData={reply} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
