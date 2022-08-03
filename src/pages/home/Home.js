import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Profile from './profile/Profile';
import Network from './network/Network';
import Timeline from './timeline/Timeline';
import Feed from './feed/Feed';
import Footer from '../../components/Footer';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile');
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/network' element={<Network />} />
        <Route path='/timeline' element={<Timeline />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Home;
