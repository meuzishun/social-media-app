import React, { useContext } from 'react';
import { TimelineContext } from '../../../App';
import Post from '../../../components/Post';

function Timeline() {
  const timeline = useContext(TimelineContext);

  return (
    <div>
      {timeline
        ? timeline.map((post) => <Post key={post.id} post={post} />)
        : null}
    </div>
  );
}

export default Timeline;
