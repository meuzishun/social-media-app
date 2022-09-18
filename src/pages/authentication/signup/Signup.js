import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, NotificationsContext } from '../../../App';
import {
  addUser,
  createFirebaseUser,
  getCurrentFirebaseUser,
  uploadFileToStorage,
  updateCurrentFirebaseUser,
} from '../../../services/firebaseApp';
import styles from './Signup.module.css';

function Signup() {
  const [formState, setFormState] = useState({});
  const [fileState, setFileState] = useState(null);
  const signupForm = useRef(null);
  const { setUser } = useContext(UserContext);
  const { createNotification } = useContext(NotificationsContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileState(file);
  };

  const createErrorMsg = function (msg) {
    const err = document.createElement('span');
    err.classList.add('error-msg');
    err.textContent = msg;
    return err;
  };

  const deleteErrorMsg = function (input) {
    if (input.nextElementSibling) {
      input.parentElement.removeChild(
        input.parentElement.querySelector('.error-msg')
      );
    }
  };

  const deleteAllErrorMsgs = function (form) {
    form.querySelectorAll('input').forEach((input) => deleteErrorMsg(input));
  };

  const findError = function (input) {
    if (input.validity.valueMissing) {
      if (!input.nextElementSibling) {
        input.parentElement.append(
          createErrorMsg('Please enter a value for this input')
        );
      }
    }
    if (input.validity.typeMismatch) {
      if (!input.nextElementSibling) {
        input.parentElement.append(
          createErrorMsg('Please enter the correct type for this input')
        );
      }
    }
    if (input.validity.patternMismatch) {
      if (!input.nextElementSibling) {
        input.parentElement.append(createErrorMsg('Please use proper format'));
      }
    }
  };

  const checkInput = function (e) {
    const input = e.target;
    if (input.validity.valid) {
      deleteErrorMsg(input);
    }
  };

  const checkValidation = function (form) {
    let isFormValid = true;
    deleteAllErrorMsgs(form);
    const passwordInput = form.querySelector('#password');
    const passwordConfirmation = form.querySelector('#repassword');
    if (passwordInput.value !== passwordConfirmation.value) {
      if (!passwordConfirmation.nextElementSibling) {
        passwordConfirmation.parentElement.append(
          createErrorMsg('Passwords do not match')
        );
      }
      isFormValid = false;
    }
    form.querySelectorAll('input').forEach((input) => {
      if (!input.validity.valid) {
        findError(input);
        isFormValid = false;
      }
    });
    return isFormValid;
  };

  const validateInput = (e) => {
    const input = e.target;
    input.addEventListener('focusout', function (e) {
      checkInput(e);
      findError(input);
      input.addEventListener('input', checkInput);
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidation(e.target)) {
      return;
    }
    const userCredential = await createFirebaseUser(
      formState.email,
      formState.password
    );
    const avatarFilePath = `${userCredential.user.uid}/avatar/${fileState.name}`;
    await uploadFileToStorage(fileState, avatarFilePath);
    await updateCurrentFirebaseUser({
      displayName: formState.username,
      photoURL: avatarFilePath,
    });
    const firebaseUser = getCurrentFirebaseUser();
    const user = {
      fullName: formState.fullName,
      username: firebaseUser.displayName,
      email: firebaseUser.email,
      bio: formState.bio,
      avatar: firebaseUser.photoURL,
      id: firebaseUser.uid,
      friendIds: [],
    };
    const newUser = await addUser(user);
    setUser(newUser);
    navigate('/profile');
    createNotification(`User ${newUser.username} has been created...`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    signupForm.current.email.focus();
  }, []);

  return (
    <div className={styles.signupPage}>
      <header>
        <div className={styles.logoContainer}>
          <span
            className='iconify'
            data-icon='mdi-alpha-f-circle-outline'
          ></span>
          <h1>akebook</h1>
        </div>
        <button
          type='button'
          className={styles.loginBtn}
          onClick={handleLoginClick}
        >
          log in
        </button>
      </header>
      <h2>sign up</h2>
      <form
        className={styles.signupForm}
        noValidate
        ref={signupForm}
        onSubmit={handleSignupSubmit}
      >
        <div className={styles.emailContainer}>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            defaultValue={formState.email}
            onInput={validateInput}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.passwordContainer}>
          <label htmlFor='password'>create password</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            defaultValue={formState.password}
            onInput={validateInput}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.repasswordContainer}>
          <label htmlFor='repassword'>retype password</label>
          <input
            type='password'
            id='repassword'
            name='repassword'
            required
            defaultValue={formState.repassword}
            onInput={validateInput}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.fullNameContainer}>
          <label htmlFor='fullName'>full name</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            defaultValue={formState.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.usernameContainer}>
          <label htmlFor='username'>create username</label>
          <input
            type='text'
            id='username'
            name='username'
            defaultValue={formState.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.bioContainer}>
          <label htmlFor='bio'>bio</label>
          <textarea
            id='bio'
            name='bio'
            onChange={handleInputChange}
            defaultValue={formState.bio}
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
            required
          ></input>
        </div>
        <button type='submit'>create account</button>
      </form>
    </div>
  );
}

export default Signup;
