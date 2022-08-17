import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import AddPostForm from '../../../components/AddPostForm';
import Post from '../../../components/Post';
import { getPostsByAuthorId } from '../../../services/firebaseApp';
import './Timeline.css';

function Timeline() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [viewNewPostForm, setViewNewPostForm] = useState(false);

  const showNewPostForm = () => {
    setViewNewPostForm(true);
  };

  const hideNewPostForm = () => {
    setViewNewPostForm(false);
  };

  const getAndSetUserPosts = () => {
    getPostsByAuthorId(user.id).then((posts) => {
      const userPosts = posts.filter((post) => post.parentId === post.childId);
      setPosts(userPosts);
    });
  };

  useEffect(() => {
    getAndSetUserPosts();
  }, []);

  return (
    <div className='timelinePage'>
      <div className='timelineContainer'>
        {viewNewPostForm ? (
          <AddPostForm
            hideNewPostForm={hideNewPostForm}
            getAndSetUserPosts={getAndSetUserPosts}
          />
        ) : (
          <button type='button' onClick={showNewPostForm}>
            add post
          </button>
        )}
        {posts ? posts.map((post) => <Post key={post.id} post={post} />) : null}
      </div>
    </div>
  );
}

export default Timeline;
