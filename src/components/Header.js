import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <header>
      <div>social media logo</div>
      <div className='userContainer'>
        <img src={user.avatar} alt='user avatar' />
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
      <button className='logoutButton' onClick={logoutUser}>
        log out
      </button>
    </header>
  );
}

export default Header;
