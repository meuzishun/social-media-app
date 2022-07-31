import React, { useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import fake_users from '../../../fake_data/fake_users';

function Network({ friendIds }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(
      friendIds.map((friendId) =>
        fake_users.find((user) => user.id === friendId)
      )
    );
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
