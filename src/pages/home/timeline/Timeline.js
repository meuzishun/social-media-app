import React from 'react';
import Post from '../../../components/Post';

function Timeline({ userPostIds }) {
  return (
    <div>
      {userPostIds
        ? userPostIds.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Timeline;
