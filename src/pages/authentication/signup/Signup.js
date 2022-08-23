import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { addUser, uploadFileToStorage } from '../../../services/firebaseApp';
import uniqid from 'uniqid';
import './Signup.css';

function Signup() {
  const [formState, setFormState] = useState({});
  const [fileState, setFileState] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const userId = uniqid();
    const avatarFilePath = `${userId}/avatar/${fileState.name}`;
    const user = {
      ...formState,
      id: userId,
      avatar: avatarFilePath,
      friendIds: [],
    };
    await uploadFileToStorage(fileState, user.avatar);
    const newUser = await addUser(user);
    setUser(newUser);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='signupPage'>
      <header>
        <h1>sign up</h1>
        <button type='button' className='loginBtn' onClick={handleLoginClick}>
          log in
        </button>
      </header>
      <form className='signupForm' onSubmit={handleSignupSubmit}>
        <label htmlFor='fullName'>full name</label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          defaultValue={formState.fullName}
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
        <label htmlFor='email'>email</label>
        <input
          type='email'
          id='email'
          name='email'
          defaultValue={formState.email}
          onChange={handleInputChange}
        />
        <label htmlFor='bio'>bio</label>
        <textarea
          id='bio'
          name='bio'
          onChange={handleInputChange}
          defaultValue={formState.bio}
        ></textarea>
        <label htmlFor='avatar'>avatar</label>
        <input
          type='file'
          id='avatar'
          name='avatar'
          accept='image/png, image/jpeg'
          onChange={handleFileChange}
          // defaultValue={userState.avatar}
        ></input>
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
    </div>
  );
}

export default Signup;
