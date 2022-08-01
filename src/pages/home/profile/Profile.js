import React, { useEffect, useState } from 'react';
import { db } from '../../../services/firebaseApp';
import { doc, updateDoc } from 'firebase/firestore';

function Profile({ user }) {
  const [edit, setEdit] = useState(false);
  const [userState, setUserState] = useState(null);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (e) => {
    const userProp = e.target.name;
    const userValue = e.target.value;
    setUserState({ ...userState, [userProp]: userValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      fullName: form.fullName.value,
      username: form.username.value,
      email: form.email.value,
      bio: form.bio.value,
    });
    setEdit(false);
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
      {!userState ? null : !edit ? (
        <div>
          <h1>name: {userState.fullName}</h1>
          <h2>username: {userState.username}</h2>
          <p>email: {userState.email}</p>
          <p>bio: {userState.bio}</p>
          <img src={user.avatar} alt='user avatar' />
          <button onClick={toggleEdit}>edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor='fullName'>full name</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={userState.fullName}
            onChange={handleInputChange}
          />
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={userState.username}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={userState.email}
            onChange={handleInputChange}
          />
          <label htmlFor='bio'>bio</label>
          <textarea
            id='bio'
            name='bio'
            onChange={handleInputChange}
            value={userState.bio}
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
