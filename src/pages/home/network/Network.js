import React, { useContext } from 'react';
import { ModalContext } from '../../../App';
import { PopupContext } from '../../../App';
import Friend from '../../../components/Friend';
import AddFriendForm from '../../../components/AddFriendForm';
import styles from './Network.module.css';

function Network({ network }) {
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);

  const handleFriendSearch = () => {
    setPopupContent(<AddFriendForm />);
    setDisplayModal(true);
  };

  return (
    <div className={styles.networkPage}>
      <div className={styles.networkContainer}>
        <button type='button' onClick={handleFriendSearch}>
          add friend
        </button>
        {network.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}

export default Network;
