import React, { useState, useEffect, useRef } from 'react';
import PostContent from './PostContent';
import CommentForm from '../comment/CommentForm';
import Comment from '../comment/Comment';
import styles from './Post.module.css';
import { getPostsByParentId } from '../../services/firebaseApp';

function Post({ post }) {
  const [postState, setPostState] = useState(null);
  const [comments, setComments] = useState([]);
  const commentsContainer = useRef(null);
  const hideCommentsBtn = useRef(null);
  const showCommentsBtn = useRef(null);

  const getAndSetPostComments = () => {
    getPostsByParentId(post.childId).then((posts) => {
      const comments = posts.filter((post) => post.parentId !== post.childId);
      setComments(comments);
    });
  };

  const handleShowCommentsClick = () => {
    // commentsContainer.current.classList.remove('hidden');
    commentsContainer.current.style = 'display: block;';
    // hideCommentsBtn.current.classList.remove('hidden');
    hideCommentsBtn.current.style = 'display: block;';
    // showCommentsBtn.current.classList.add('hidden');
    showCommentsBtn.current.style = 'display: none;';
  };

  const handleHideCommentsClick = () => {
    // commentsContainer.current.classList.add('hidden');
    commentsContainer.current.style = 'display: none;';
    // hideCommentsBtn.current.classList.add('hidden');
    hideCommentsBtn.current.style = 'display: none;';
    // showCommentsBtn.current.classList.remove('hidden');
    showCommentsBtn.current.style = 'display: block;';
  };

  useEffect(() => {
    setPostState(post);
    getAndSetPostComments();
  }, []);

  return (
    <>
      {postState ? (
        <div className={styles.post}>
          <PostContent postState={postState} setPostState={setPostState} />
          <CommentForm
            post={post}
            getAndSetPostComments={getAndSetPostComments}
          />
          {comments.length > 0 ? (
            <>
              <button
                type='button'
                className={styles.showCommentsBtn}
                ref={showCommentsBtn}
                onClick={handleShowCommentsClick}
              >
                show comments
              </button>
              <button
                type='button'
                className={`${styles.hideCommentsBtn} ${styles.hidden}`}
                ref={hideCommentsBtn}
                onClick={handleHideCommentsClick}
              >
                hide comments
              </button>
              <div
                className={`${styles.comments} ${styles.hidden}`}
                ref={commentsContainer}
              >
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default Post;
