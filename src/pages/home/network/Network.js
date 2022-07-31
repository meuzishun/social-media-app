import React, { useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import fake_users from '../../../fake_data/fake_users';

function Network({ user }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const foundFriends = user.friends.map((friendId) =>
      fake_users.find((user) => user.id === friendId)
    );
    setFriends(foundFriends);
  }, []);

  return (
    <div>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default Network;
