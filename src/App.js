import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import { db } from './services/firebaseApp';
import {
  doc,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
  getDoc,
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
      // console.log(form);
      // e.preventDefault();
      // const username = e.target.username.value;
      //! DO NOT REMOVE - FIREBASE CODE
      // const querySnapshot = await getDocs(collection(db, 'users'));
      // let user;
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   if (data.username === form.username) {
      //     // user = data;
      //     setUser(data);
      //     return;
      //   }
      // });
      // console.log(user);
      // setUser(user);

      let response;

      const q = query(
        collection(db, 'users'),
        where('username', '==', form.username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        response = 'no user';
      }

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.password !== form.password) {
          response = 'wrong password';
        } else {
          response = 'success';
          setUser(user);
        }
      });

      return response;

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
    submitSignup: (form) => {
      console.log(form);
    },
  };

  const appFunctions = {
    logoutUser: () => {
      setUser(null);
      navigate('/login');
    },
    editUserProfile: async (newProfile) => {
      console.log(newProfile);
      // const userRef = doc(db, 'users', user.id);
      // await updateDoc(userRef, newProfile);
    },
    findUserById: async (id) => {
      //! MOCKED VERSION
      // return fake_users.find((user) => user.id === id);

      const docSnap = await getDoc(doc(db, 'users', id));
      const user = docSnap.data();
      return user;
    },
    findPostById: async (id) => {
      //! MOCKED VERSION
      // return fake_posts.find((post) => post.id === id);

      const docSnap = await getDoc(doc(db, 'posts', id));
      const post = docSnap.data();
      return post;
    },
    submitPostReply: async (post, replyContent) => {
      const now = new Date();
      const reply = {
        author: user.id,
        content: replyContent,
        id: uniqid(),
        replies: [],
        timestamp: now.toISOString(),
      };
      console.log(post, reply);
      //? Just add reply to post's replies and update the data?
      //! DO NOT REMOVE - FIREBASE CODE
      // post reply to posts
      // setDoc(doc(db, 'posts', reply.id), reply);
      // // add reply to original post replies
      // const originalPostDoc = doc(db, 'posts', postId);
      // const originalPostSnap = await getDoc(originalPostDoc);
      // const originalPostData = originalPostSnap.data();
      // originalPostData.replies = [...originalPostData.replies, reply.id];
      // updateDoc(originalPostDoc, originalPostData);
      //TODO: refresh timeline somehow
    },
  };

  useEffect(() => {
    if (user) {
      //! MOCKED VERSION
      // setTimeline(
      //   user.posts.map((id) => fake_posts.find((post) => post.id === id))
      // );
      const timelineQuery = query(
        collection(db, 'posts'),
        where('id', 'in', user.posts)
      );
      getDocs(timelineQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          setTimeline((prev) => {
            return [...prev, post];
          });
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      //! MOCKED VERSION
      // setNetwork(
      //   user.friends.map((id) => fake_users.find((user) => user.id === id))
      // );

      const networkQuery = query(
        collection(db, 'users'),
        where('id', 'in', user.friends)
      );
      getDocs(networkQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          setNetwork((prev) => {
            return [...prev, user];
          });
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (network.length > 0) {
      //! MOCKED VERSION
      // setFeed(
      //   network
      //     .map((friend) => friend.posts)
      //     .flat()
      //     .map((id) => fake_posts.find((post) => post.id === id))
      // );

      const friendPosts = network.map((friend) => friend.posts).flat();
      const feedQuery = query(
        collection(db, 'posts'),
        where('id', 'in', friendPosts)
      );
      getDocs(feedQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          setFeed((prev) => {
            return [...prev, post];
          });
        });
      });
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

    authFunctions.submitLogin({ username: 'JMH2', password: 'password' });
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
