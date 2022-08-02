import React, { useContext } from 'react';
import { FeedContext } from '../../../App';
import Post from '../../../components/Post';

function Feed() {
  const feed = useContext(FeedContext);

  return (
    <div>
      {feed ? feed.map((post) => <Post key={post.id} post={post} />) : null}
    </div>
  );
}

export default Feed;
