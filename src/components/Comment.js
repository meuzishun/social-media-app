import React, { useEffect, useState, useContext } from 'react';
import { PostStateContext } from './Post';
import { getUserById } from '../services/firebaseApp';
import EditCommentForm from './EditCommentForm';
import ReplyForm from './ReplyForm';
import Reply from './Reply';
import './Comment.css';

function Comment({ commentData }) {
  const [commentState, setCommentState] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [displayCommentEditForm, setDisplayCommentEditForm] = useState(false);
  const [displayAddReplyForm, setDisplayAddReplyForm] = useState(false);
  const { postStateFromDatabase, setPostStateToDatabase } =
    useContext(PostStateContext);

  const handleEditCommentClick = (e) => {
    e.preventDefault();
    setDisplayCommentEditForm(true);
  };

  const handleCommentEditSubmit = () => {
    //TODO: remove old comment from post
    //TODO: add new comment to post
  };

  const handleAddReplyClick = () => {
    setDisplayAddReplyForm(true);
  };

  useEffect(() => {
    setCommentState(commentData);
  }, []);

  useEffect(() => {
    if (commentState) {
      getUserById(commentState.authorId).then((user) =>
        setAuthorName(user.username)
      );
    }
  }, [commentState]);

  return (
    <div className='commentContainer'>
      {!commentState ? null : !displayCommentEditForm ? (
        <p>
          <span>{authorName}:</span> {commentState.content}
        </p>
      ) : (
        <EditCommentForm
          authorName={authorName}
          commentsArray={postStateFromDatabase.comments}
          commentData={commentState}
          setDisplayCommentEditForm={setDisplayCommentEditForm}
        />
      )}

      {!displayCommentEditForm && !displayAddReplyForm ? (
        <>
          <button
            type='button'
            className='editBtn'
            onClick={handleEditCommentClick}
          >
            edit
          </button>

          <button
            type='button'
            className='addBtn'
            onClick={handleAddReplyClick}
          >
            add reply
          </button>
        </>
      ) : null}

      {displayAddReplyForm ? (
        <ReplyForm setAddReplyFormDisplay={setDisplayAddReplyForm} />
      ) : null}

      {/* {commentState.replies ? (
        <div className='replies'>
          {commentState.replies.map((reply) => (
            <Reply key={reply.id} replyData={reply} />
          ))}
        </div>
      ) : null} */}
    </div>
  );
}

export default Comment;
