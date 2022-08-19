import React, { useState, useEffect, useRef } from 'react';
import PostContent from './PostContent';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './Post.css';
import { getPostsByParentId } from '../services/firebaseApp';

function Post({ post }) {
  const [postState, setPostState] = useState(null);
  const [comments, setComments] = useState([]);
  const commentsContainer = useRef(null);
  const showCommentsBtn = useRef(null);

  const getAndSetPostComments = () => {
    getPostsByParentId(post.childId).then((posts) => {
      const comments = posts.filter((post) => post.parentId !== post.childId);
      setComments(comments);
    });
  };

  const handleShowCommentsClick = () => {
    commentsContainer.current.classList.remove('hidden');
    showCommentsBtn.current.classList.add('hidden');
  };

  const handleHideCommentsClick = () => {
    commentsContainer.current.classList.add('hidden');
    showCommentsBtn.current.classList.remove('hidden');
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
              <div className='comments hidden' ref={commentsContainer}>
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
              <button
                type='button'
                className='showCommentsBtn'
                ref={showCommentsBtn}
                onClick={handleShowCommentsClick}
              >
                show comments
              </button>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

export default Post;
