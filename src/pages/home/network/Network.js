import React, { useContext, useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import { NetworkContext } from '../../../App';

function Network() {
  const network = useContext(NetworkContext);
  // const [friends, setFriends] = useState([]);

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
    // const friends = friendIds.map((id) =>
    //   fake_users.find((user) => user.id === id)
    // );
    // setFriends(friends);
  };

  // useEffect(() => {
  //   getFriends();
  // }, []);

  return (
    <div>
      {network.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default Network;
