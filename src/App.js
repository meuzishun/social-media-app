import React, { useEffect, useState, createContext } from 'react';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';
import { db } from './services/firebaseApp';
import { doc, onSnapshot } from 'firebase/firestore';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const changeUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
  };

  if (user) {
    onSnapshot(doc(db, 'users', user.id), (doc) => {
      // console.log(doc.data());
      changeUser(doc.data());
    });
  }

  return (
    <div className='App'>
      {!user ? (
        <Authentication changeUser={changeUser} />
      ) : (
        <UserContext.Provider value={user}>
          <Home changeUser={changeUser} />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
