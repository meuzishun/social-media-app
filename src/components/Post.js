import React, { useState, useEffect } from 'react';
import PostContent from './PostContent';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './Post.css';
import { getPostsByParentId } from '../services/firebaseApp';

function Post({ post }) {
  const [postState, setPostState] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const getAndSetPostComments = () => {
    getPostsByParentId(post.childId).then((posts) => {
      const comments = posts.filter((post) => post.parentId !== post.childId);
      setComments(comments);
    });
  };

  const handleShowCommentsClick = () => {
    setShowComments(true);
  };

  const handleHideCommentsClick = () => {
    setShowComments(false);
  };

  useEffect(() => {
    setPostState(post);
    getAndSetPostComments();
  }, []);

  return (
    <div className='post'>
      {postState ? (
        <>
          <PostContent postState={postState} setPostState={setPostState} />
          <CommentForm
            post={post}
            getAndSetPostComments={getAndSetPostComments}
          />
          {comments ? (
            <>
              {showComments ? (
                <div className='comments'>
                  {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                  <button
                    type='button'
                    className='hideCommentsBtn'
                    onClick={handleHideCommentsClick}
                  >
                    hide comments
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  className='showCommentsBtn'
                  onClick={handleShowCommentsClick}
                >
                  show comments
                </button>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Post;
