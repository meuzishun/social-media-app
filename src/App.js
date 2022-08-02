import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import { db } from './services/firebaseApp';
import { doc, onSnapshot } from 'firebase/firestore';
import { fake_posts, fake_users } from './fake_data/fake_data';

export const UserContext = createContext();
export const NetworkContext = createContext();
export const TimelineContext = createContext();
export const FeedContext = createContext();
export const LogoutFunction = createContext();
export const ChangeUserFunction = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [feed, setFeed] = useState([]);

  const navigate = useNavigate();

  const changeUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  // if (user) {
  // onSnapshot(doc(db, 'users', user.id), (doc) => {
  //   // console.log(doc.data());
  //   changeUser(doc.data());
  // });
  // }

  useEffect(() => {
    if (user) {
      setNetwork(
        user.friends.map((id) => fake_users.find((user) => user.id === id))
      );
      setTimeline(
        user.posts.map((id) => fake_posts.find((post) => post.id === id))
      );
    }
  }, [user]);

  useEffect(() => {
    if (network) {
      // const friendPostIds = network.map((friend) => friend.posts).flat();
      // const friendPosts = network
      //   .map((friend) => friend.posts)
      //   .flat()
      //   .map((id) => fake_posts.find((post) => post.id === id));
      // console.log(friendPosts);
      setFeed(
        network
          .map((friend) => friend.posts)
          .flat()
          .map((id) => fake_posts.find((post) => post.id === id))
      );
    }
  }, [network]);

  useEffect(() => {
    setUser(fake_users[2]);
  }, []);

  return (
    <div className='App'>
      <LogoutFunction.Provider value={logoutUser}>
        {!user ? (
          <Authentication />
        ) : (
          <UserContext.Provider value={user}>
            <NetworkContext.Provider value={network}>
              <TimelineContext.Provider value={timeline}>
                <FeedContext.Provider value={feed}>
                  <Home />
                </FeedContext.Provider>
              </TimelineContext.Provider>
            </NetworkContext.Provider>
          </UserContext.Provider>
        )}
      </LogoutFunction.Provider>
    </div>
  );
}

export default App;
