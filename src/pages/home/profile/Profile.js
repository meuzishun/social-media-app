import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import {
  getCurrentFirebaseUser,
  getFileFromStorage,
  updateCurrentFirebaseUser,
  updateUserById,
  uploadFileToStorage,
} from '../../../services/firebaseApp';
import './Profile.css';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [userState, setUserState] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [fileState, setFileState] = useState(null);

  const toggleEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleInputChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  const handleProfileEditSubmit = async (e) => {
    e.preventDefault();
    const currentFirebaseUser = getCurrentFirebaseUser();
    const updatedUser = { ...userState };
    if (fileState) {
      const avatarFilePath = `${user.id}/avatar/${fileState.name}`;
      updatedUser.avatar = avatarFilePath;
      await uploadFileToStorage(fileState, updatedUser.avatar);
    }
    await updateCurrentFirebaseUser({
      photoURL: updatedUser.avatar,
      displayName: updatedUser.username,
      email: updatedUser.email,
    });
    const alteredUser = await updateUserById(updatedUser.id, updatedUser);
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
            <label htmlFor='avatar'>avatar</label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              accept='image/png, image/jpeg'
              onChange={handleFileChange}
              // defaultValue={userState.avatar}
            ></input>
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
