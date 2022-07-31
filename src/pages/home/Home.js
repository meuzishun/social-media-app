import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import Header from '../../components/Header';
import Profile from './profile/Profile';
import Network from './network/Network';
import Timeline from './timeline/Timeline';
import Feed from './feed/Feed';
import Footer from '../../components/Footer';

function Home({ user, changeUser }) {
  const navigate = useNavigate();
  const [friendPostIds, setFriendPostIds] = useState([]);

  const getFriendPostIds = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    let postIds = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (user.friends.includes(data.id)) {
        postIds = [...postIds, ...data.posts];
      }
    });
    setFriendPostIds(postIds);
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
          element={<Timeline userPostIds={user.posts} />}
        />
        <Route path='/feed' element={<Feed friendPostIds={friendPostIds} />} />
      </Routes>
      {/* <Navigate to='/profile' /> */}
      <Footer />
    </>
  );
}

export default Home;
