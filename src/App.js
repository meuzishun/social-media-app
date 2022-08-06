import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import {
  db,
  addUser,
  getUserById,
  getUserByUsername,
  addFriendToUserNetwork,
  deleteFriendFromUserNetwork,
  updateUserById,
  getUsersByIdList,
  getPostsByIdList,
  addReplyToPost,
  addReplyIdToPostById,
  addPost,
} from './services/firebaseApp';
import {
  doc,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import uniqid from 'uniqid';
import { fake_posts, fake_users } from './fake_data/fake_data';

export const UserContext = createContext();
export const NetworkContext = createContext();
export const TimelineContext = createContext();
export const FeedContext = createContext();
export const AuthFunctions = createContext();
export const AppFunctions = createContext();

function App() {
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

    submitSignup: async (form) => {
      const user = { ...form, id: uniqid(), friends: [], posts: [] };
      const newUser = await addUser(user);
      setUser(newUser);
    },
  };

  const appFunctions = {
    logoutUser: () => {
      setUser(null);
      navigate('/login');
    },

    findPostById: async (id) => {
      //! MOCKED VERSION
      // return fake_posts.find((post) => post.id === id);

      const docSnap = await getDoc(doc(db, 'posts', id));
      const post = docSnap.data();
      return post;
    },

    updateUserProfile: async (newProfile) => {
      const alteredUser = await updateUserById(user.id, newProfile);
      setUser(alteredUser);
      return 'user altered';
    },

    submitAddFriend: async (username) => {
      const friend = await getUserByUsername(username);
      if (!friend) {
        return 'no user found';
      }
      if (user.friends.includes(friend.id)) {
        return 'user already in network';
      }
      const alteredUser = await addFriendToUserNetwork(user.id, friend.id);
      setUser(alteredUser);
      return 'friend added';
    },

    submitFriendRemove: async (friendId) => {
      if (!user.friends.includes(friendId)) {
        return 'friend not in network';
      }
      const alteredUser = await deleteFriendFromUserNetwork(user.id, friendId);
      setUser(alteredUser);
      return `friend with id ${friendId} has been removed`;
    },

    submitPostReply: async (postId, replyContent) => {
      const now = new Date();
      const reply = {
        author: user.id,
        content: replyContent,
        id: uniqid(),
        replies: [],
        timestamp: now.toISOString(),
      };
      await addPost(reply);
      const alteredPost = await addReplyIdToPostById(postId, reply.id);
      return alteredPost;
    },
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

    // authFunctions.submitLogin({ username: 'meuzishun', password: 'password' });
    navigate('/login');
  }, []);

  return (
    <div className='App'>
      {!user ? (
        <AuthFunctions.Provider value={authFunctions}>
          <Authentication />
        </AuthFunctions.Provider>
      ) : (
        <AppFunctions.Provider value={appFunctions}>
          <UserContext.Provider value={user}>
            <NetworkContext.Provider value={network}>
              <TimelineContext.Provider value={timeline}>
                <FeedContext.Provider value={feed}>
                  <Home />
                </FeedContext.Provider>
              </TimelineContext.Provider>
            </NetworkContext.Provider>
          </UserContext.Provider>
        </AppFunctions.Provider>
      )}
    </div>
  );
}

export default App;
