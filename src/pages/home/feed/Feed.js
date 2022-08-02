import React, { useContext } from 'react';
import { FeedContext } from '../../../App';
import Post from '../../../components/Post';

function Feed({ submitPostReply }) {
  const feed = useContext(FeedContext);

  return (
    <div>
      {feed
        ? feed.map((post) => (
            <Post key={post.id} post={post} submitPostReply={submitPostReply} />
          ))
        : null}
    </div>
  );
}

export default Feed;
