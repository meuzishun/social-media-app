import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { UserContext } from '../../../App';
import { getUserByUsername } from '../../../services/firebaseApp';

function Login() {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const foundUser = await getUserByUsername(formState.username);
    if (!foundUser) {
      console.log('no user found');
    }
    if (foundUser.password !== formState.password) {
      console.log('incorrect password');
    }
    setUser(foundUser);
    console.log('login successful');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <Welcome />
      <h1>log in</h1>
      <form className='loginForm' onSubmit={handleLoginSubmit}>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          id='username'
          name='username'
          defaultValue={formState.username}
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
