import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { AuthFunctions } from '../../../App';

function Login() {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();
  const { submitLogin } = useContext(AuthFunctions);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    //TODO: check to make sure password and repassword match
    //TODO: other form validation
    //TODO: delete repassword prop
    const response = await submitLogin(formState);
    console.log(response);
    // setFormState({}); //! Either not changing the formState or not causing a rerender
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
