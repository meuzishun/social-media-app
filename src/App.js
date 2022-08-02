import React, { useEffect, useState, createContext } from 'react';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import { db } from './services/firebaseApp';
import { doc, onSnapshot } from 'firebase/firestore';
import { fake_posts, fake_users } from './fake_data/fake_data';

export const UserContext = createContext();
export const NetworkContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState(fake_users[0]);
  const [network, setNetwork] = useState([]);
  // const [userPosts, setUserPosts] = useState([]);
  const [friendPosts, setFriendPosts] = useState([]);

  const changeUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
  };

  // if (user) {
  // onSnapshot(doc(db, 'users', user.id), (doc) => {
  //   // console.log(doc.data());
  //   changeUser(doc.data());
  // });
  // }

  useEffect(() => {
    if (user) {
      const friendIds = user.friends;
      const friendProfiles = friendIds.map((id) =>
        fake_users.find((user) => user.id === id)
      );
      // console.log(friendProfiles);
      setNetwork(friendProfiles);
    }
  }, [user]);

  useEffect(() => {
    if (network) {
      const friendPostIds = network.map((friend) => friend.posts).flat();
      const friendPosts = friendPostIds.map((id) =>
        fake_posts.find((post) => post.id === id)
      );
      console.log(friendPosts);
    }
  }, [network]);

  useEffect(() => {
    changeUser(fake_users[0]);
  }, []);

  return (
    <div className='App'>
      {!user ? (
        <Authentication changeUser={changeUser} />
      ) : (
        <UserContext.Provider value={user}>
          <NetworkContext.Provider value={network}>
            <Home changeUser={changeUser} />
          </NetworkContext.Provider>
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
