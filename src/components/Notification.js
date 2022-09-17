import React, { useContext, useEffect } from 'react';
import { NotificationsContext } from '../App';
import { useTransition } from 'react-transition-state';
import './Notification.css';

function Notification({ data }) {
  const { removeNotification } = useContext(NotificationsContext);

  const [{ status, isMounted }, toggle] = useTransition({
    timeout: 1000,
    initialEntered: false,
    mountOnEnter: false,
    preEnter: true,
    unmountOnExit: true,
    onStateChange: (e) => {
      console.log(e.current);
    },
  });

  useEffect(() => {
    console.log(status);

    if (status === 'exited') {
      const inTimer = setTimeout(() => {
        toggle();
        clearTimeout(inTimer);
      }, 250);
    }

    if (status === 'entered') {
      const inTimer = setTimeout(() => {
        toggle();
        clearTimeout(inTimer);
      }, 2000);
    }

    if (status === 'unmounted') {
      removeNotification(data);
    }
  }, [status]);

  return (
    <>
      {isMounted && (
        <div className={`notification ${status}`}>
          <p>{data.message}</p>
        </div>
      )}
    </>
  );
}

export default Notification;
