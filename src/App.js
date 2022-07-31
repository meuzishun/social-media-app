import React, { useState } from 'react';
import Authentication from './pages/authentication/Authentication';
import Home from './pages/home/Home';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const changeUser = (user) => {
    setUser(user);
  };

  return (
    <div className='App'>
      {!user ? (
        <Authentication changeUser={changeUser} />
      ) : (
        <Home user={user} changeUser={changeUser} />
      )}
    </div>
  );
}

export default App;
