import React, { useContext } from 'react';
import Post from '../../../components/Post';
import { TimelineContext } from '../../../App';

function Timeline() {
  const timeline = useContext(TimelineContext);

  return (
    <div>
      {console.log(timeline)}
      {timeline.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Timeline;
