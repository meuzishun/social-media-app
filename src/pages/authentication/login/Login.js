import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import { LoginFunction } from '../../../App';

function Login() {
  const handleLoginSubmit = useContext(LoginFunction);

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
