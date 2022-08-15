//* React imports
import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//* Component imports
import Login from './pages/authentication/login/Login';
import Signup from './pages/authentication/signup/Signup';
import Header from './components/Header';
import Profile from './pages/home/profile/Profile';
import Network from './pages/home/network/Network';
import Timeline from './pages/home/timeline/Timeline';
import Feed from './pages/home/feed/Feed';
import Footer from './components/Footer';

import './App.css';

//* Database imports
import {
  getUserByUsername,
  getUsersByIdList,
  getPostsByAuthorId,
} from './services/firebaseApp';

//* Library imports
import uniqid from 'uniqid';
import { fake_posts, fake_users } from './fake_data/fake_data';

export const AuthFunctions = createContext();
export const AppFunctions = createContext();
export const UserContext = createContext();

function App() {
  //* Hooks
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/timeline');
    }
    setNetwork([]);
    // if (user && user.friends.length > 0) {
    //   getUsersByIdList(user.friends).then((friends) => setNetwork(friends));
    //   //! MOCKED VERSION
    //   // setNetwork(
    //   //   user.friends.map((id) => fake_users.find((user) => user.id === id))
    //   // );
    // }

    setTimeline([]);
    if (user) {
      getPostsByAuthorId(user.id).then((posts) => {
        setTimeline(posts);
      });
    }
    // if (user && user.posts.length > 0) {
    //   //* Put actual posts in timeline:
    //   // getPostsByIdList(user.posts).then((posts) => setTimeline(posts));
    //   //* Put post ids in timeline:
    //   setTimeline(user.posts);

    //   //! MOCKED VERSION
    //   // setTimeline(
    //   //   user.posts.map((id) => fake_posts.find((post) => post.id === id))
    //   // );
    // }
  }, [user]);

  useEffect(() => {
    setFeed([]);
    if (network.length > 0) {
      const friendPostIds = network.map((friend) => friend.posts).flat();
      //* Put actual posts in feed:
      // getPostsByIdList(friendPostIds).then((posts) => setFeed(posts));
      //* Put post ids in feed:
      setFeed(friendPostIds);
      //! MOCKED VERSION
      // setFeed(
      //   network
      //     .map((friend) => friend.posts)
      //     .flat()
      //     .map((id) => fake_posts.find((post) => post.id === id))
      // );
    }
  }, [network]);

  useEffect(() => {
    // ((async) => {
    //   navigate('/login');
    // })();

    //* FOR TESTING PURPOSES
    (async () => {
      const user = await getUserByUsername('meuzishun');
      setUser(user);
      navigate('/timeline');
    })();

    //! MOCKED VERSION
    // setUser(fake_users[0]);
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        {!user ? (
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        ) : (
          <>
            <Header user={user} />
            <Routes>
              <Route path='/profile' element={<Profile user={user} />} />
              <Route path='/network' element={<Network network={network} />} />
              <Route
                path='/timeline'
                element={<Timeline timeline={timeline} />}
              />
              <Route path='/feed' element={<Feed feed={feed} />} />
            </Routes>
            <Footer />
          </>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
