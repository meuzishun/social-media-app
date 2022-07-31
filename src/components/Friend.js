import React from 'react';

function Friend({ friend }) {
  return (
    <div>
      <p>
        {friend.fullName} ({friend.username})
      </p>
      <p>email: {friend.email}</p>
    </div>
  );
}

export default Friend;
