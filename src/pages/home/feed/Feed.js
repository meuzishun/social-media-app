import React, { useContext } from 'react';
import { FeedContext } from '../../../App';
import Post from '../../../components/Post';

function Feed() {
  const feed = useContext(FeedContext);

  return (
    <div>
      {feed
        ? feed.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Feed;
