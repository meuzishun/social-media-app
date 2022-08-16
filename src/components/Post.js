import React, { useState, useEffect } from 'react';
import PostContent from './PostContent';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './Post.css';
import { getPostsByParentId } from '../services/firebaseApp';

function Post({ post, getAndSetUserPosts }) {
  const [comments, setComments] = useState([]);

  const getAndSetPostComments = () => {
    getPostsByParentId(post.childId).then((posts) => {
      const comments = posts.filter((post) => post.parentId !== post.childId);
      setComments(comments);
    });
  };

  useEffect(() => {
    getAndSetPostComments();
  }, []);

  return (
    <div className='post'>
      <PostContent post={post} getAndSetUserPosts={getAndSetUserPosts} />
      <CommentForm post={post} getAndSetPostComments={getAndSetPostComments} />
      {comments ? (
        <div className='comments'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              getAndSetPostComments={getAndSetPostComments}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Post;
