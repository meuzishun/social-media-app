import React from 'react';
import Post from '../../../components/Post';

function Timeline({ user }) {
  return (
    <div>
      {user.posts
        ? user.posts.map((post) => <Post key={post} postId={post} />)
        : null}
    </div>
  );
}

export default Timeline;
