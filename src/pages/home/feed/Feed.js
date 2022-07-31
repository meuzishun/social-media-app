import React from 'react';
import Post from '../../../components/Post';

function Feed({ friendPostIds }) {
  return (
    <div>
      {friendPostIds
        ? friendPostIds.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Feed;
