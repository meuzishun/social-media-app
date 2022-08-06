import React, { useEffect, useState } from 'react';
import ReplyForm from './ReplyForm';
import { getPostById, getUserById } from '../services/firebaseApp';

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
    <div>
      {authorName ? (
        <div>
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
            {post.replies.map((replyId) => {
              return <Post key={replyId} postId={replyId} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
