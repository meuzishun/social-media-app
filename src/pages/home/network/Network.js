import React, { useContext, useEffect, useState } from 'react';
import Friend from '../../../components/Friend';
import { NetworkContext } from '../../../App';

function Network() {
  const network = useContext(NetworkContext);

  return (
    <div>
      {console.log(network)}
      {network.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default Network;
