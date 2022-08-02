import React from 'react';
import Post from '../../../components/Post';

function Timeline({ user, submitPostReply }) {
  return (
    <div>
      {user
        ? user.posts.map((postId) => (
            <Post
              key={postId}
              postId={postId}
              submitPostReply={submitPostReply}
            />
          ))
        : null}
    </div>
  );
}

export default Timeline;
