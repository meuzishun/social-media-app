import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h1>name: {user.fullName}</h1>
      <h2>username: {user.username}</h2>
      <p>id: {user.id}</p>
      <p>email: {user.email}</p>
      <p>bio: {user.bio}</p>
      <img src={user.avatar} alt='user avatar' />
    </div>
  );
}

export default Profile;
