import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
// import { AuthFunctions } from '../../../App';
import { UserContext } from '../../../App';
import { getUserByUsername } from '../../../services/firebaseApp';

function Login() {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();
  // const { submitLogin } = useContext(AuthFunctions);
  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // const response = await submitLogin(formState);
    const foundUser = await getUserByUsername(formState.username);
    if (!foundUser) {
      return 'no user found';
    }
    if (foundUser.password !== formState.password) {
      return 'incorrect password';
    }
    setUser(foundUser);
    return 'login successful';
    // console.log(response);
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
