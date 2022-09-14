import React, { useContext, useEffect } from 'react';
import { NotificationsContext } from '../App';
import { useTransition } from 'react-transition-state';
import './Notification.css';

function Notification({ data }) {
  const { notifications, setNotifications } = useContext(NotificationsContext);

  const [{ status, isMounted, isEnter }, toggle] = useTransition({
    timeout: 1000,
    initialEntered: false,
    mountOnEnter: true,
    preEnter: true,
    unmountOnExit: true,
    onStateChange: (e) => {
      console.log(e.current);
    },
  });

  useEffect(() => {
    if (!isMounted) {
      const inTimer = setTimeout(() => {
        toggle();
        clearTimeout(inTimer);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (status === 'entered') {
      const outTimer = setTimeout(() => {
        toggle();
        clearTimeout(outTimer);
        const index = notifications.indexOf(data);
        console.log(index);
        setNotifications(notifications.splice(index, 1));
      }, 3000);
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
