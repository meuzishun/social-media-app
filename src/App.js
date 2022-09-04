//* React imports
import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//* Component imports
import Modal from './components/Modal';
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
import { getUserByUsername, getUsersByIdList } from './services/firebaseApp';

export const AuthFunctions = createContext();
export const AppFunctions = createContext();
export const UserContext = createContext();
export const ModalContext = createContext();
export const PopupContext = createContext();

function App() {
  //* Hooks
  const [user, setUser] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [network, setNetwork] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNetwork([]);
    if (user && user.friendIds.length > 0) {
      getUsersByIdList(user.friendIds).then((friends) => setNetwork(friends));
    }
  }, [user]);

  useEffect(() => {
    //* FOR TESTING PURPOSES
    // navigate('/signup');
    (async () => {
      const user = await getUserByUsername('Andrew');
      setUser(user);
      navigate('/timeline');
    })();
  }, []);

  return (
    <div className='App'>
      <ModalContext.Provider value={{ displayModal, setDisplayModal }}>
        <PopupContext.Provider value={{ popupContent, setPopupContent }}>
          <UserContext.Provider value={{ user, setUser }}>
            {displayModal ? (
              <Modal>{popupContent ? popupContent : null}</Modal>
            ) : null}
            {!user ? (
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            ) : (
              <>
                <Header />
                <Routes>
                  <Route path='/profile' element={<Profile />} />
                  <Route
                    path='/network'
                    element={<Network network={network} />}
                  />
                  <Route path='/timeline' element={<Timeline />} />
                  <Route path='/feed' element={<Feed />} />
                </Routes>
                <Footer />
              </>
            )}
          </UserContext.Provider>
        </PopupContext.Provider>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
