import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <h1>sign up</h1>
      <form className='signupForm'>
        <label htmlFor='email'>email</label>
        <input type='email' id='email' name='email' />
        <label htmlFor='username'>create username</label>
        <input type='text' id='username' name='username' />
        <label htmlFor='password'>create password</label>
        <input type='password' id='password' name='password' />
        <label htmlFor='repassword'>retype password</label>
        <input type='password' id='repassword' name='repassword' />
        <button type='submit'>create account</button>
        <button type='button'>cancel</button>
      </form>
      <button>
        <Link to='/login'>log in</Link>
      </button>
    </div>
  );
}

export default Signup;
