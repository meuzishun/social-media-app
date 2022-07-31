import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Profile from './profile/Profile';
import Network from './network/Network';
import Timeline from './timeline/Timeline';
import Feed from './feed/Feed';
import Footer from '../../components/Footer';
import fake_users from '../../fake_data/fake_users';

function Home({ user, changeUser }) {
  const navigate = useNavigate();
  const [friendPostIds, setFriendPostIds] = useState([]);

  useEffect(() => {
    setFriendPostIds(
      user.friends
        .map((friendId) => fake_users.find((user) => user.id === friendId))
        .reduce((prev, currentFriend) => [...prev, ...currentFriend.posts], [])
    );
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
