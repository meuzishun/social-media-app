import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import {
  getFileFromStorage,
  updateUserById,
} from '../../../services/firebaseApp';
import './Profile.css';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const toggleEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const handleProfileEditSubmit = async (e) => {
    e.preventDefault();
    const alteredUser = await updateUserById(user.id, userState);
    setUser(alteredUser);
    setEditProfile(false);
  };

  const handleCancelClick = () => {
    setUserState(user);
    toggleEdit();
  };

  useEffect(() => {
    getFileFromStorage(user.avatar).then((url) => setAvatar(url));
  }, [userState]);

  useEffect(() => {
    setUserState(user);
  }, []);

  return (
    <div className='profilePage'>
      <>
        {!userState ? null : !editProfile ? (
          <div className='profileContainer'>
            <img src={avatar} alt='user avatar' />
            <h1>name: {user.fullName}</h1>
            <h2>username: {user.username}</h2>
            <p>email: {user.email}</p>
            <p>bio: {user.bio}</p>
            <button onClick={toggleEdit}>edit</button>
          </div>
        ) : (
          <form className='profileForm' onSubmit={handleProfileEditSubmit}>
            <label htmlFor='fullName'>full name</label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              defaultValue={userState.fullName}
              onChange={handleInputChange}
            />
            <label htmlFor='username'>username</label>
            <input
              type='text'
              id='username'
              name='username'
              defaultValue={userState.username}
              onChange={handleInputChange}
            />
            <label htmlFor='email'>email</label>
            <input
              type='email'
              id='email'
              name='email'
              defaultValue={userState.email}
              onChange={handleInputChange}
            />
            <label htmlFor='bio'>bio</label>
            <textarea
              id='bio'
              name='bio'
              onChange={handleInputChange}
              defaultValue={userState.bio}
            ></textarea>
            <button type='submit'>submit</button>
            <button type='button' onClick={handleCancelClick}>
              cancel
            </button>
          </form>
        )}
      </>
    </div>
  );
}

export default Profile;
