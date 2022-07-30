import React from 'react';
import Welcome from '../../../components/Welcome';

function Login({ switchAuth }) {
  return (
    <div>
      <Welcome />
      <h1>log in</h1>
      <form className='loginForm'>
        <label htmlFor='username'>username</label>
        <input type='text' id='username' name='username' />
        <label htmlFor='password'>password</label>
        <input type='password' id='password' name='password' />
        <button type='submit'>log in</button>
        <button type='button'>cancel</button>
      </form>
      <button onClick={switchAuth}>sign up</button>
    </div>
  );
}

export default Login;
