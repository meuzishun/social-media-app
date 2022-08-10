import React from 'react';
import Post from '../../../components/Post';

function Feed({ feed }) {
  return (
    <div>
      {feed
        ? feed.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Feed;
