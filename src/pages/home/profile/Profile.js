import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import { updateUserById } from '../../../services/firebaseApp';
import './Profile.css';

function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const [userState, setUserState] = useState(null);
  const { user, setUser } = useContext(UserContext);

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
    setUserState(user);
  }, []);

  return (
    <>
      {!userState ? null : !editProfile ? (
        <div className='profileContainer'>
          <h1>name: {user.fullName}</h1>
          <h2>username: {user.username}</h2>
          <p>email: {user.email}</p>
          <p>bio: {user.bio}</p>
          <img src={user.avatar} alt='user avatar' />
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
  );
}

export default Profile;
