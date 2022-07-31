import React, { useEffect, useState } from 'react';
import Post from '../../../components/Post';
import fake_posts from '../../../fake_data/fake_posts';

function Timeline({ user }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setUserPosts(fake_posts.filter((post) => post.author === user.id));
  }, []);

  return (
    <div>
      {userPosts
        ? userPosts.map((post) => {
            return <Post key={post} post={post} />;
          })
        : null}
    </div>
  );
}

export default Timeline;
