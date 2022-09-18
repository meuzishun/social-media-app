//* React imports
import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//* Component imports
import Modal from './components/Modal';
import NotificationContainer from './components/NotificationContainer';
import Login from './pages/authentication/login/Login';
import Signup from './pages/authentication/signup/Signup';
import Header from './components/Header';
import Profile from './pages/home/profile/Profile';
import Network from './pages/home/network/Network';
import Timeline from './pages/home/timeline/Timeline';
import Feed from './pages/home/feed/Feed';
import Footer from './components/Footer';
import uniqid from 'uniqid';

import styles from './App.module.css';

//* Database imports
import {
  getUserById,
  getUserByUsername,
  getUsersByIdList,
  signInFirebaseUser,
} from './services/firebaseApp';

export const AuthFunctions = createContext();
export const AppFunctions = createContext();
export const UserContext = createContext();
export const ModalContext = createContext();
export const PopupContext = createContext();
export const NotificationsContext = createContext();

function App() {
  //* Hooks
  const [user, setUser] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [network, setNetwork] = useState([]);
  const navigate = useNavigate();

  const createNotification = (msg) => {
    setNotifications((prev) => {
      return [...prev, { message: msg, id: uniqid() }];
    });
  };

  const removeNotification = (notification) => {
    // console.log('removing notification...');
    const index = notifications.indexOf(notification);
    setNotifications((notifications) => {
      return [
        ...notifications.slice(0, index),
        ...notifications.slice(index + 1),
      ];
    });
  };

  useEffect(() => {
    setNetwork([]);
    if (user && user.friendIds.length > 0) {
      getUsersByIdList(user.friendIds).then((friends) => setNetwork(friends));
    }
  }, [user]);

  useEffect(() => {
    //* FOR TESTING PURPOSES
    // navigate('/signup');
    signInFirebaseUser('asmith@email.com', 'password')
      .then((firebaseUser) => {
        return getUserById(firebaseUser.uid);
      })
      .then((user) => {
        setUser(user);
        navigate('/network');
        setNotifications((prev) => {
          return [
            ...prev,
            { message: `User ${user.username} is signed in...`, id: 123 },
          ];
        });
      });
  }, []);

  useEffect(() => {
    // console.log(notifications); //? Why must we do this here? (see NotificationContainer.js)
  }, [notifications]);

  return (
    <div className={styles.App}>
      <ModalContext.Provider value={{ displayModal, setDisplayModal }}>
        <PopupContext.Provider value={{ popupContent, setPopupContent }}>
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationsContext.Provider
              value={{ notifications, createNotification, removeNotification }}
            >
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
                  {notifications.length > 0 && <NotificationContainer />}
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
            </NotificationsContext.Provider>
          </UserContext.Provider>
        </PopupContext.Provider>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
