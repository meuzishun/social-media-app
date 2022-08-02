import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import { db } from './services/firebaseApp';
import { doc, onSnapshot } from 'firebase/firestore';
import uniqid from 'uniqid';
import { fake_posts, fake_users } from './fake_data/fake_data';

export const UserContext = createContext();
export const NetworkContext = createContext();
export const TimelineContext = createContext();
export const FeedContext = createContext();
export const LoginFunction = createContext();
export const LogoutFunction = createContext();
export const ChangeUserFunction = createContext();
export const SubmitReplyFunction = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [feed, setFeed] = useState([]);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    //! DO NOT REMOVE - FIREBASE CODE
    // const querySnapshot = await getDocs(collection(db, 'users'));
    // let user;
    // querySnapshot.forEach((doc) => {
    //   const data = doc.data();
    //   if (data.username === username) {
    //     user = data;
    //     return;
    //   }
    // });

    //! MOCKED VERSION
    const user = fake_users.find((user) => user.username === username);

    if (!user) {
      alert('No user with that username');
      return;
    }
    if (user.password !== e.target.password.value) {
      alert('Incorrect password');
      return;
    }
    if (user && user.password === e.target.password.value) {
      setUser(user);
    }
  };

  const changeUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  const submitPostReply = async (postId, content) => {
    const now = new Date();
    const reply = {
      author: user.id,
      content,
      id: uniqid(),
      replies: [],
      timestamp: now.toISOString(),
    };
    console.log(reply);
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
      setFeed(
        network
          .map((friend) => friend.posts)
          .flat()
          .map((id) => fake_posts.find((post) => post.id === id))
      );
    }
  }, [network]);

  //* FOR TESTING PURPOSES
  // useEffect(() => {
  //   setUser(fake_users[0]);
  // }, []);

  return (
    <div className='App'>
      <LoginFunction.Provider value={handleLoginSubmit}>
        <LogoutFunction.Provider value={logoutUser}>
          <SubmitReplyFunction.Provider value={submitPostReply}>
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
          </SubmitReplyFunction.Provider>
        </LogoutFunction.Provider>
      </LoginFunction.Provider>
    </div>
  );
}

export default App;
