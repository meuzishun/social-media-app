import React, { useEffect, useState, useContext } from 'react';
import ReplyForm from './ReplyForm';
import { AppFunctions } from '../App';
import { getUserById } from '../services/firebaseApp';

function Post({ post }) {
  const [author, setAuthor] = useState(null);
  const [replyState, setReplyState] = useState(false);

  const handleReplyClick = () => {
    setReplyState(true);
  };

  useEffect(() => {
    getUserById(post.author)
      .then((author) => setAuthor(author))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {author ? (
        <div>
          <p>
            <span>{author.username}:</span> {post.content}
          </p>
          {replyState ? (
            <ReplyForm postId={post.id} setReplyState={setReplyState} />
          ) : (
            <button onClick={handleReplyClick}>reply</button>
          )}
          <div className='replies'>
            {post.replies.map((reply) => {
              return <Post key={reply.id} post={reply} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
