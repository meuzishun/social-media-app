import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, logoutUser }) {
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
      <button onClick={logoutUser}>log out</button>
    </header>
  );
}

export default Header;
