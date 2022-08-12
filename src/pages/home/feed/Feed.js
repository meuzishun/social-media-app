import React from 'react';
import Post from '../../../components/Post';
import './Feed.css';

function Feed({ feed }) {
  return (
    <div className='feedContainer'>
      {feed
        ? feed.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Feed;
