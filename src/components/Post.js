import React, { useEffect, useState, useContext } from 'react';
import { db } from '../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import { fake_users, fake_posts } from '../fake_data/fake_data';
import { AppFunctions } from '../App';

function Post({ post }) {
  const [author, setAuthor] = useState(null);
  const [replyState, setReplyState] = useState(false);
  const [replyContent, setReplyContent] = useState();

  const { findUserById } = useContext(AppFunctions);

  const { submitPostReply } = useContext(AppFunctions);

  const handleReplyClick = () => {
    setReplyState(true);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    submitPostReply(post, replyContent);
    setReplyContent('');
    setReplyState(false);
  };

  const handleReplyCancel = () => {
    setReplyContent('');
    setReplyState(false);
  };

  useEffect(() => {
    setAuthor(findUserById(post.author));
  }, []);

  return (
    <div>
      {author ? (
        <div>
          <p>
            <span>{author.username}:</span> {post.content}
          </p>
          {replyState ? (
            <form onSubmit={handleReplySubmit}>
              <input
                type='text'
                name='content'
                defaultValue={replyContent}
                onChange={handleReplyChange}
              />
              <button type='submit'>submit</button>
              <button type='button' onClick={handleReplyCancel}>
                cancel
              </button>
            </form>
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
