import React, { useState } from 'react';
import AddPostForm from '../../../components/AddPostForm';
import Post from '../../../components/Post';

function Timeline({ timeline }) {
  const [viewNewPostForm, setViewNewPostForm] = useState(false);

  const showNewPostForm = () => {
    setViewNewPostForm(true);
  };

  const hideNewPostForm = () => {
    setViewNewPostForm(false);
  };

  return (
    <div>
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
