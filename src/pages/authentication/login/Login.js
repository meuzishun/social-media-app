import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../../../components/Welcome';
import { UserContext } from '../../../App';
import { NotificationsContext } from '../../../App';
import { getUserById, signInFirebaseUser } from '../../../services/firebaseApp';
import styles from './Login.module.css';

function Login() {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { createNotification } = useContext(NotificationsContext);
  const emailInput = useRef(null);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidation(e.target)) {
      return;
    }
    let firebaseUser = null;
    try {
      firebaseUser = await signInFirebaseUser(
        formState.email,
        formState.password
      );
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
    if (!firebaseUser) {
      console.log('no firebase user found');
      e.target
        .querySelector('#email')
        .parentElement.append(createErrorMsg('No user found'));
      return;
    }
    const foundUser = await getUserById(firebaseUser.uid);
    setUser(foundUser);
    console.log('login successful');
    navigate('/feed');
    createNotification(`User ${foundUser.username} is signed in...`);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  return (
    <div className={styles.loginPage}>
      <Welcome />
      <h1 className={styles.loginHeading}>log in</h1>
      <form
        className={styles.loginForm}
        noValidate
        onSubmit={handleLoginSubmit}
      >
        <div className='emailContainer'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            onInput={validateInput}
            defaultValue={formState.email}
            onChange={handleInputChange}
            ref={emailInput}
          />
        </div>
        <div className='passwordContainer'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            onInput={validateInput}
            defaultValue={formState.password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
      <button type='button' onClick={handleSignupClick}>
        sign up
      </button>
    </div>
  );
}

export default Login;
