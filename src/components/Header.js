import React from 'react';

function Header({ user, switchHomePage }) {
  return (
    <header>
      <div>social media logo</div>
      <p>{user.fullName}</p>
      <img src={user.avatar} alt='user avatar' />
      <nav>
        <ul>
          <li onClick={switchHomePage}>profile</li>
          <li onClick={switchHomePage}>network</li>
          <li onClick={switchHomePage}>timeline</li>
          <li onClick={switchHomePage}>feed</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
