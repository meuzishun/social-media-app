import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user, changeUser }) {
  const navigate = useNavigate();
  const logout = () => {
    changeUser(null);
    navigate('/login');
  };
  return (
    <header>
      <div>social media logo</div>
      <p>{user.fullName}</p>
      <img src={user.avatar} alt='user avatar' />
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
      <button onClick={logout}>log out</button>
    </header>
  );
}

export default Header;
