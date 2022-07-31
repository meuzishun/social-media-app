import React, { useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';

function Network({ friendIds }) {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    let friends = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (friendIds.includes(data.id)) {
        friends = [...friends, data];
      }
    });
    setFriends(friends);
  };

  useEffect(() => {
    getFriends();
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
