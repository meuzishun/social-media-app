import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthFunctions } from '../../../App';

function Signup() {
  const [formState, setFormState] = useState({});
  const { submitSignup } = useContext(AuthFunctions);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    submitSignup(formState);
    setFormState({}); //! Either not changing the formState or not causing a rerender
  };

  return (
    <div>
      <h1>sign up</h1>
      <form className='signupForm' onSubmit={handleSignupSubmit}>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          id='email'
          name='email'
          defaultValue={formState.email}
          onChange={handleInputChange}
        />
        <label htmlFor='username'>create username</label>
        <input
          type='text'
          id='username'
          name='username'
          defaultValue={formState.username}
          onChange={handleInputChange}
        />
        <label htmlFor='password'>create password</label>
        <input
          type='password'
          id='password'
          name='password'
          defaultValue={formState.password}
          onChange={handleInputChange}
        />
        <label htmlFor='repassword'>retype password</label>
        <input
          type='password'
          id='repassword'
          name='repassword'
          defaultValue={formState.repassword}
          onChange={handleInputChange}
        />
        <button type='submit'>create account</button>
      </form>
      <Link to='/login'>
        <button>log in</button>
      </Link>
    </div>
  );
}

export default Signup;
