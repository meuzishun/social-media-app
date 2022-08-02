import React, { useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import { fake_users, fake_posts } from '../../../fake_data/fake_data';

function Network({ friendIds }) {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    //! DO NOT REMOVE - FIREBASE CODE
    // const querySnapshot = await getDocs(collection(db, 'users'));
    // let friends = [];
    // querySnapshot.forEach((doc) => {
    //   const data = doc.data();
    //   if (friendIds.includes(data.id)) {
    //     friends = [...friends, data];
    //   }
    // });

    //! MOCKED VERSION
    const friends = friendIds.map((id) =>
      fake_users.find((user) => user.id === id)
    );

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
