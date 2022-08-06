import React, { useContext, useState } from 'react';
import AddPostForm from '../../../components/AddPostForm';
import Post from '../../../components/Post';
import { TimelineContext } from '../../../App';

function Timeline() {
  const [viewNewPostForm, setViewNewPostForm] = useState(false);
  const timeline = useContext(TimelineContext);

  const showNewPostForm = () => {
    setViewNewPostForm(true);
  };

  const hideNewPostForm = () => {
    setViewNewPostForm(false);
  };

  return (
    <div>
      {/* {console.log(timeline)} */}
      {viewNewPostForm ? (
        <AddPostForm hideNewPostForm={hideNewPostForm} />
      ) : (
        <button type='button' onClick={showNewPostForm}>
          add post
        </button>
      )}
      {timeline.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </div>
  );
}

export default Timeline;
