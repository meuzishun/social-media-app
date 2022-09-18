import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { ModalContext } from '../../../App';
import { ModalTransitionContext } from '../../../components/Modal';
import { PopupContext } from '../../../App';
import AddPostForm from '../../../components/post/AddPostForm';
import Post from '../../../components/post/Post';
import { getPostsByAuthorId } from '../../../services/firebaseApp';
import styles from './Timeline.module.css';

function Timeline() {
  const { user } = useContext(UserContext);
  const { setDisplayModal } = useContext(ModalContext);
  const toggleModal = useContext(ModalTransitionContext);
  const { setPopupContent } = useContext(PopupContext);
  const [posts, setPosts] = useState(null);
  const [viewNewPostForm, setViewNewPostForm] = useState(false);

  const showNewPostForm = () => {
    setPopupContent(
      <AddPostForm
        hideNewPostForm={hideNewPostForm}
        getAndSetUserPosts={getAndSetUserPosts}
      />
    );
    setDisplayModal(true);
    setViewNewPostForm(true);
  };

  const hideNewPostForm = () => {
    console.log('get rid of it!');
    // toggleModal();
    // setViewNewPostForm(false);
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
        <button type='button' onClick={showNewPostForm}>
          add post
        </button>
        {posts ? posts.map((post) => <Post key={post.id} post={post} />) : null}
      </div>
    </div>
  );
}

export default Timeline;
