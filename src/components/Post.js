import React, { useEffect, useState } from 'react';
import fake_posts from '../fake_data/fake_posts';
import fake_users from '../fake_data/fake_users';

function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const post = fake_posts.find((post) => post.id === postId);
    const user = fake_users.find((user) => user.id === post.author);
    setPost(post);
    setUser(user);
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
