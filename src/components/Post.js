import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';

function Post({ postId, submitPostReply }) {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [reply, setReply] = useState(false);

  const getPost = async () => {
    let posts = [];
    const postsQuery = await getDocs(collection(db, 'posts'));
    postsQuery.forEach((doc) => {
      const data = doc.data();
      posts = [...posts, data];
    });
    const post = posts.find((post) => post.id === postId);
    let users = [];
    const usersQuery = await getDocs(collection(db, 'users'));
    usersQuery.forEach((doc) => {
      const data = doc.data();
      users = [...users, data];
    });
    const user = users.find((user) => user.id === post.author);
    setPost(post);
    setUser(user);
  };

  const handleReplyClick = () => {
    setReply(true);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    submitPostReply(post.id, e.target.content.value);
    setReply(false);
  };

  const handleReplyCancel = () => {
    setReply(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {post ? (
        <div>
          <p>
            <span>{user.username}:</span> {post.content}
          </p>
          {reply ? (
            <form onSubmit={handleReplySubmit}>
              <input type='text' name='content' />
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
              return (
                <Post
                  key={reply}
                  postId={reply}
                  submitPostReply={submitPostReply}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
