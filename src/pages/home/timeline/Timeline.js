import React from 'react';

function Timeline({ user }) {
  return (
    <div>
      {user.posts.map((post) => (
        <p key={post}>post id: {post}</p>
      ))}
    </div>
  );
}

export default Timeline;
