import React from 'react';

function Friend({ friend }) {
  const handleRemoveClick = () => {
    console.log(friend.id);
  };

  return (
    <div>
      <p>
        {friend.fullName} ({friend.username})
      </p>
      <p>email: {friend.email}</p>
      <button onClick={handleRemoveClick}>remove friend</button>
    </div>
  );
}

export default Friend;
