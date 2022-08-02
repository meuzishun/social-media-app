import React from 'react';
import Post from '../../../components/Post';

function Feed({ friendPostIds, submitPostReply }) {
  return (
    <div>
      {friendPostIds
        ? friendPostIds.map((postId) => (
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

export default Feed;
