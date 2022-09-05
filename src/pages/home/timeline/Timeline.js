import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import AddPostForm from '../../../components/post/AddPostForm';
import Post from '../../../components/post/Post';
import { getPostsByAuthorId } from '../../../services/firebaseApp';
import styles from './Timeline.module.css';

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
    <div className={styles.timelinePage}>
      <div className={styles.timelineContainer}>
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
