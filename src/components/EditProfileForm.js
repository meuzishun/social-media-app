import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { ModalContext } from '../App';
import { PopupContext } from '../App';
import {
  updateCurrentFirebaseUser,
  updateUserById,
  uploadFileToStorage,
} from '../services/firebaseApp';
import styles from './EditProfileForm.module.css';

function EditProfileForm() {
  const { user, setUser } = useContext(UserContext);
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);
  const [userState, setUserState] = useState(user);
  const [fileState, setFileState] = useState(null);

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
    setPopupContent(null);
    setDisplayModal(false);
  };

  const handleCancelClick = () => {
    setUserState(user); //? Is this needed?
    setPopupContent(null);
    setDisplayModal(false);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Edit Profile</h3>
      <form className={styles.profileForm} onSubmit={handleProfileEditSubmit}>
        <div className={styles.fullNameContainer}>
          <label htmlFor='fullName'>full name</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            defaultValue={userState.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.usernameContainer}>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            name='username'
            defaultValue={userState.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.emailContainer}>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            name='email'
            defaultValue={userState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.bioContainer}>
          <label htmlFor='bio'>bio</label>
          <textarea
            id='bio'
            name='bio'
            onChange={handleInputChange}
            defaultValue={userState.bio}
          ></textarea>
        </div>
        <div className={styles.avatarContainer}>
          <label htmlFor='avatar'>avatar</label>
          <input
            type='file'
            id='avatar'
            name='avatar'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
          ></input>
        </div>
        <div className={styles.btnContainer}>
          <button type='submit'>submit</button>
          <button type='button' onClick={handleCancelClick}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
