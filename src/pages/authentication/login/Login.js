import React from 'react';
import Welcome from '../../../components/Welcome';

function Login() {
  return (
    <div>
      <Welcome />
      <h1>login</h1>
      <form className='loginForm'>
        <label htmlFor='username'>username</label>
        <input type='text' id='username' name='username' />
        <label htmlFor='password'>password</label>
        <input type='password' id='password' name='password' />
        <button type='submit'>login</button>
        <button type='button'>cancel</button>
      </form>
    </div>
  );
}

export default Login;
