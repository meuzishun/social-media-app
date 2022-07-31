import React, { useEffect, useState } from 'react';
import { db } from '../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';

function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

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
          <div className='replies'>
            {post.replies.map((reply) => {
              return <Post key={reply} postId={reply} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
