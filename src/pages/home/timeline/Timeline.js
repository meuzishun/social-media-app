import React, { useContext } from 'react';
import Post from '../../../components/Post';
import { TimelineContext } from '../../../App';

function Timeline() {
  const timeline = useContext(TimelineContext);

  return (
    <div>
      {/* {console.log(timeline)} */}
      {timeline.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </div>
  );
}

export default Timeline;
