import React, { useEffect, useState } from 'react';
import Post from '../../../components/Post';
import fake_posts from '../../../fake_data/fake_posts';
import fake_users from '../../../fake_data/fake_users';

function Feed({ user }) {
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    const friends = user.friends.map((friend) =>
      fake_users.find((user) => user.id === friend)
    );
    const friendPosts = friends.map((friend) => friend.posts);
    setFriendPosts(friendPosts.flat());
  }, []);

  return (
    <div>
      {friendPosts
        ? friendPosts.map((post) => <Post key={post} postId={post} />)
        : null}
    </div>
  );
}

export default Feed;
