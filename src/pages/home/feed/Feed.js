import React, { useEffect, useState } from 'react';
import Post from '../../../components/Post';
import fake_posts from '../../../fake_data/fake_posts';
import fake_users from '../../../fake_data/fake_users';

function Feed({ friendPostIds }) {
  // const [friendPosts, setFriendPosts] = useState([]);

  // useEffect(() => {
  // const friends = friendIds.map((friendId) =>
  //   fake_users.find((user) => user.id === friendId)
  // );
  // const friendPosts = friends.map((friend) => friend.posts);
  // setFriendPosts(friendPosts.flat());
  // setFriendPosts(
  // friendPostIds.map((postId) =>
  // fake_posts.find((post) => post.id === postId)
  // )
  // );
  // }, []);

  return (
    <div>
      {friendPostIds
        ? friendPostIds.map((postId) => <Post key={postId} postId={postId} />)
        : null}
    </div>
  );
}

export default Feed;
