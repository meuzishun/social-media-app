import React from 'react';
import { Link } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';

function Login({ changeUser }) {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const querySnapshot = await getDocs(collection(db, 'users'));
    let user;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.username === username) {
        user = data;
        return;
      }
    });

    if (!user) {
      alert('No user with that username');
      return;
    }
    if (user.password !== e.target.password.value) {
      alert('Incorrect password');
      return;
    }
    if (user && user.password === e.target.password.value) {
      changeUser(user);
    }
  };

  return (
    <div>
      <Welcome />
      <h1>log in</h1>
      <form className='loginForm' onSubmit={handleLoginSubmit}>
        <label htmlFor='username'>username</label>
        <input type='text' id='username' name='username' />
        <label htmlFor='password'>password</label>
        <input type='password' id='password' name='password' />
        <button type='submit'>log in</button>
        <button type='button'>cancel</button>
      </form>
      <button>
        <Link to='/signup'>sign up</Link>
      </button>
    </div>
  );
}

export default Login;
