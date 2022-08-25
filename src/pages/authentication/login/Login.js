import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { UserContext } from '../../../App';
import {
  getUserByUsername,
  getUserById,
  signInFirebaseUser,
} from '../../../services/firebaseApp';
import '../login/Login.css';

function Login() {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const firebaseUser = await signInFirebaseUser(
      formState.email,
      formState.password
    );
    if (!firebaseUser) {
      console.log('no firebase user found');
    }
    const foundUser = await getUserById(firebaseUser.uid);
    setUser(foundUser);
    console.log('login successful');
    navigate('/feed');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className='loginPage'>
      <Welcome />
      <h1 className='loginHeading'>log in</h1>
      <form className='loginForm' onSubmit={handleLoginSubmit}>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          id='email'
          name='email'
          defaultValue={formState.email}
          onChange={handleInputChange}
        />
        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          name='password'
          defaultValue={formState.password}
          onChange={handleInputChange}
        />
        <button type='submit'>log in</button>
      </form>
      <button type='button' onClick={handleSignupClick}>
        sign up
      </button>
    </div>
  );
}

export default Login;
