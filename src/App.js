import { useState } from 'react';
import Login from './pages/authentication/login/Login';
import Signup from './pages/authentication/signup/Signup';
import Header from './components/Header';
import Profile from './pages/home/profile/Profile';
import Network from './pages/home/network/Network';
import Timeline from './pages/home/timeline/Timeline';
import Feed from './pages/home/feed/Feed';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      {!user ? (
        <>
          <Login />
          <Signup />
        </>
      ) : (
        <>
          <Header />
          <Profile />
          <Network />
          <Timeline />
          <Feed />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
