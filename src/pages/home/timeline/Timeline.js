import React, { useState } from 'react';
import AddPostForm from '../../../components/AddPostForm';
import Post from '../../../components/Post';
import './Timeline.css';

function Timeline({ timeline }) {
  const [viewNewPostForm, setViewNewPostForm] = useState(false);

  const showNewPostForm = () => {
    setViewNewPostForm(true);
  };

  const hideNewPostForm = () => {
    setViewNewPostForm(false);
  };

  return (
    <div className='timelineContainer'>
      {viewNewPostForm ? (
        <AddPostForm hideNewPostForm={hideNewPostForm} />
      ) : (
        <button type='button' onClick={showNewPostForm}>
          add post
        </button>
      )}
      {timeline.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </div>
  );
}

export default Timeline;
