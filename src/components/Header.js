import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { getFileFromStorage } from '../services/firebaseApp';
import styles from './Header.module.css';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    getFileFromStorage(user.avatar).then((url) => setAvatar(url));
  });

  return (
    <header>
      <div className={styles.logo}>
        <span className='iconify' data-icon='mdi-alpha-f-circle-outline'></span>
        <h1>akebook</h1>
      </div>
      <div className={styles.userContainer}>
        {avatar ? <img src={avatar} alt='user avatar' /> : null}
        <p>{user.username}</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/profile'>profile</Link>
          </li>
          <li>
            <Link to='/network'>network</Link>
          </li>
          <li>
            <Link to='/timeline'>timeline</Link>
          </li>
          <li>
            <Link to='/feed'>feed</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.logoutButton} onClick={logoutUser}>
        log out
      </button>
    </header>
  );
}

export default Header;
