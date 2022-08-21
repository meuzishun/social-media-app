import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import Post from '../../../components/post/Post';
import { getPostsByAuthorId } from '../../../services/firebaseApp';
import './Feed.css';

function Feed() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState(null);

  const getAndSetNetworkPosts = async () => {
    const totalFriendPosts = await Promise.all(
      user.friendIds.map(async (friendId) => {
        const friendPosts = await getPostsByAuthorId(friendId);
        const startingPosts = friendPosts.filter(
          (post) => post.parentId === post.childId
        );
        return startingPosts;
      })
    );
    setPosts(totalFriendPosts.flat());
  };

  useEffect(() => {
    getAndSetNetworkPosts();
  }, []);

  return (
    <div className='feedPage'>
      <div className='feedContainer'>
        {posts ? posts.map((post) => <Post key={post.id} post={post} />) : null}
      </div>
    </div>
  );
}

export default Feed;
