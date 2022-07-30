import React from 'react';

function Post({ post }) {
  return (
    <div>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>
    </div>
  );
}

export default Post;
