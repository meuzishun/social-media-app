import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, LogoutFunction } from '../App';

function Header() {
  const user = useContext(UserContext);
  const logout = useContext(LogoutFunction);
  const navigate = useNavigate();

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
