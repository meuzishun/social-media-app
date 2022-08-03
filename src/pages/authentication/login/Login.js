import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { db } from '../../../services/firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import { AppFunctions } from '../../../App';

function Login() {
  const [formState, setFormState] = useState({});
  const { submitLogin } = useContext(AppFunctions);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    submitLogin(formState);
    setFormState({}); //! Either not changing the formState or not causing a rerender
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
      <Link to='/signup'>
        <button>sign up</button>
      </Link>
    </div>
  );
}

export default Login;
