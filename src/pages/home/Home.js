import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseApp';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import Header from '../../components/Header';
import Profile from './profile/Profile';
import Network from './network/Network';
import Timeline from './timeline/Timeline';
import Feed from './feed/Feed';
import Footer from '../../components/Footer';
import uniqid from 'uniqid';
import { fake_users, fake_posts } from '../../fake_data/fake_data';

function Home({ changeUser }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [friendPostIds, setFriendPostIds] = useState([]);

  const getFriendPostIds = async () => {
    //! DO NOT REMOVE - FIREBASE CODE
    // const querySnapshot = await getDocs(collection(db, 'users'));
    // let postIds = [];
    // querySnapshot.forEach((doc) => {
    //   const data = doc.data();
    //   if (user.friends.includes(data.id)) {
    //     postIds = [...postIds, ...data.posts];
    //   }
    // });

    //! MOCKED VERSION
    const friendPostIds = user.friends
      .map((id) => fake_users.find((user) => user.id === id))
      .map((profile) => profile.posts)
      .flat();

    setFriendPostIds(friendPostIds);
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

  useEffect(() => {
    getFriendPostIds();
  }, [user]);

  useEffect(() => {
    navigate('/profile');
  }, []);

  return (
    <>
      <Header user={user} changeUser={changeUser} />
      <Routes>
        <Route path='/profile' element={<Profile user={user} />} />
        <Route path='/network' element={<Network friendIds={user.friends} />} />
        <Route
          path='/timeline'
          element={<Timeline user={user} submitPostReply={submitPostReply} />}
        />
        <Route
          path='/feed'
          element={
            <Feed
              friendPostIds={friendPostIds}
              submitPostReply={submitPostReply}
            />
          }
        />
      </Routes>
      {/* <Navigate to='/profile' /> */}
      <Footer />
    </>
  );
}

export default Home;
