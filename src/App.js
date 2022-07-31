import { useEffect, useState } from 'react';
import Login from './pages/authentication/login/Login';
import Signup from './pages/authentication/signup/Signup';
import Header from './components/Header';
import Profile from './pages/home/profile/Profile';
import Network from './pages/home/network/Network';
import Timeline from './pages/home/timeline/Timeline';
import Feed from './pages/home/feed/Feed';
import Footer from './components/Footer';
import './App.css';
import fake_users from './fake_data/fake_users';
import posts from './fake_data/fake_posts';

function App() {
  const [authPage, setAuthPage] = useState('login');
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(fake_users[0]);
  const [friendIds, setFriendIds] = useState([]);
  const [userPostIds, setUserPostIds] = useState([]);
  // const [friendPostIds, setFriendPostIds] = useState([]);
  const [homePage, setHomePage] = useState('profile');

  const switchAuth = () => {
    if (authPage === 'login') setAuthPage('signup');
    if (authPage === 'signup') setAuthPage('login');
  };

  const switchHomePage = (e) => {
    setHomePage(e.target.innerText);
  };

  useEffect(() => {
    setFriendIds(user.friends);
    setUserPostIds(user.posts);
  }, [user]);

  return (
    <div className='App'>
      {!user ? (
        authPage === 'login' ? (
          <Login switchAuth={switchAuth} />
        ) : (
          <Signup switchAuth={switchAuth} />
        )
      ) : (
        <>
          <Header user={user} switchHomePage={switchHomePage} />
          {homePage === 'profile' ? (
            <Profile user={user} />
          ) : homePage === 'network' ? (
            <Network friendIds={friendIds} />
          ) : homePage === 'timeline' ? (
            <Timeline userPostIds={userPostIds} />
          ) : homePage === 'feed' ? (
            <Feed friendIds={friendIds} />
          ) : null}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
