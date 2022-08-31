import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import { ModalContext } from '../../../App';
import { PopupContext } from '../../../App';
import { getFileFromStorage } from '../../../services/firebaseApp';
import './Profile.css';
import EditProfileForm from '../../../components/EditProfileForm';

function Profile() {
  const { user } = useContext(UserContext);
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);
  const [avatar, setAvatar] = useState(null);

  const showProfileEditForm = () => {
    setPopupContent(<EditProfileForm />);
    setDisplayModal(true);
  };

  useEffect(() => {
    getFileFromStorage(user.avatar).then((url) => setAvatar(url));
  }, [user]);

  return (
    <div className='profilePage'>
      {user ? (
        <div className='profileContainer'>
          <img src={avatar} alt='user avatar' />
          <h1>name: {user.fullName}</h1>
          <h2>username: {user.username}</h2>
          <p>email: {user.email}</p>
          <p>bio: {user.bio}</p>
          <button onClick={showProfileEditForm}>edit</button>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
