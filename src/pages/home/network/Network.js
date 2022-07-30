import React from 'react';

function Network({ user }) {
  return (
    <div>
      {user.friends.map((friend) => (
        <p key={friend}>user id: {friend}</p>
      ))}
    </div>
  );
}

export default Network;
