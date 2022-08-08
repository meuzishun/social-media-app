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
  addUser,
  getUserByUsername,
  addFriendToUserNetwork,
  deleteFriendFromUserNetwork,
  updateUserById,
  getUsersByIdList,
  addReplyIdToPostById,
  addPost,
  addPostIdToUserById,
  getPostById,
} from './services/firebaseApp';

//* Library imports
import uniqid from 'uniqid';
// import { fake_posts, fake_users } from './fake_data/fake_data';

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

  const authFunctions = {
    submitLogin: async (form) => {
      const user = await getUserByUsername(form.username);
      if (!user) {
        return 'no user found';
      }
      if (user.password !== form.password) {
        return 'incorrect password';
      }
      setUser(user);
      return 'login successful';

      //! MOCKED VERSION
      // const user = fake_users.find((user) => user.username === username);

      // if (!user) {
      //   alert('No user with that username');
      //   return;
      // }
      // if (user.password !== e.target.password.value) {
      //   alert('Incorrect password');
      //   return;
      // }
      // if (user && user.password === e.target.password.value) {
      //   setUser(user);
      // }
    },

    // submitSignup: async (form) => {
    //   const user = { ...form, id: uniqid(), friends: [], posts: [] };
    //   const newUser = await addUser(user);
    //   setUser(newUser);
    // },
  };

  const appFunctions = {
    // logoutUser: () => {
    //   setUser(null);
    //   navigate('/login');
    // },
    // findPostById: async (id) => {
    //   //! MOCKED VERSION
    //   // return fake_posts.find((post) => post.id === id);
    //   const post = await getPostById(id);
    //   return post;
    // },
    // updateUserProfile: async (newProfile) => {
    //   const alteredUser = await updateUserById(user.id, newProfile);
    //   setUser(alteredUser);
    //   return 'user altered';
    // },
    // submitAddFriend: async (username) => {
    //   const friend = await getUserByUsername(username);
    //   if (!friend) {
    //     return 'no user found';
    //   }
    //   if (user.friends.includes(friend.id)) {
    //     return 'user already in network';
    //   }
    //   const alteredUser = await addFriendToUserNetwork(user.id, friend.id);
    //   setUser(alteredUser);
    //   return 'friend added';
    // },
    // submitFriendRemove: async (friendId) => {
    //   if (!user.friends.includes(friendId)) {
    //     return 'friend not in network';
    //   }
    //   const alteredUser = await deleteFriendFromUserNetwork(user.id, friendId);
    //   setUser(alteredUser);
    //   return `friend with id ${friendId} has been removed`;
    // },
    // submitPost: async (postContent) => {
    //   const now = new Date();
    //   const postData = {
    //     author: user.id,
    //     content: postContent,
    //     id: uniqid(),
    //     replies: [],
    //     timestamp: now.toISOString(),
    //   };
    //   await addPost(postData);
    //   const alteredUser = await addPostIdToUserById(user.id, postData.id);
    //   setUser(alteredUser);
    // },
    // submitPostReply: async (postId, replyContent) => {
    //   //? Can this be housed in the ReplyForm component?
    //   const now = new Date();
    //   const reply = {
    //     author: user.id,
    //     content: replyContent,
    //     id: uniqid(),
    //     replies: [],
    //     timestamp: now.toISOString(),
    //   };
    //   await addPost(reply);
    //   const alteredPost = await addReplyIdToPostById(postId, reply.id);
    //   return alteredPost;
    // },
  };

  useEffect(() => {
    setNetwork([]);
    if (user && user.friends.length > 0) {
      getUsersByIdList(user.friends).then((friends) => setNetwork(friends));
      //! MOCKED VERSION
      // setNetwork(
      //   user.friends.map((id) => fake_users.find((user) => user.id === id))
      // );
    }

    setTimeline([]);
    if (user && user.posts.length > 0) {
      //* Put actual posts in timeline:
      // getPostsByIdList(user.posts).then((posts) => setTimeline(posts));
      //* Put post ids in timeline:
      setTimeline(user.posts);
      //! MOCKED VERSION
      // setTimeline(
      //   user.posts.map((id) => fake_posts.find((post) => post.id === id))
      // );
    }
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

  //? Is this still needed?
  useEffect(() => {
    if (!user) {
      setTimeline([]);
      setNetwork([]);
      setFeed([]);
    }
  }, [user]);

  //* FOR TESTING PURPOSES
  useEffect(() => {
    //! MOCKED VERSION
    // setUser(fake_users[0]);

    authFunctions.submitLogin({ username: 'meuzishun', password: 'password' });
    // navigate('/login');
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        {!user ? (
          <AuthFunctions.Provider value={authFunctions}>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </AuthFunctions.Provider>
        ) : (
          <AppFunctions.Provider value={appFunctions}>
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
          </AppFunctions.Provider>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
