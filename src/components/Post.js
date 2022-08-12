import React, { useEffect, useState } from 'react';
import ReplyForm from './ReplyForm';
import { getPostById, getUserById } from '../services/firebaseApp';
import './Post.css';

function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [replyState, setReplyState] = useState(false);

  const handleReplyClick = () => {
    setReplyState(true);
  };

  useEffect(() => {
    getPostById(postId)
      .then((post) => setPost(post))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (post) {
      getUserById(post.author).then((user) => setAuthorName(user.username));
    }
  }, [post]);

  return (
    <>
      {authorName ? (
        <div className='post'>
          <p>
            <span>{authorName}:</span> {post.content}
          </p>
          {replyState ? (
            <ReplyForm
              postId={post.id}
              setReplyState={setReplyState}
              setPost={setPost}
            />
          ) : (
            <button onClick={handleReplyClick}>reply</button>
          )}
          <div className='replies'>
            {post.replies.map((replyId) => (
              <Post key={replyId} postId={replyId} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Post;
