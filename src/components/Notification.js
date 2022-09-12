import React, { useContext, useEffect } from 'react';
import { NotificationsContext } from '../App';
import { useTransition } from 'react-transition-state';
import './Notification.css';

function Notification({ data }) {
  const { notifications, setNotifications } = useContext(NotificationsContext);

  const [{ status, isMounted, isEnter }, toggle] = useTransition({
    timeout: 1000,
    initialEntered: true,
    preEnter: true,
    unmountOnExit: true,
  });

  useEffect(() => {
    console.log(notifications);
    const index = notifications.indexOf(data);
    const timer = setTimeout(() => {
      toggle();
      setNotifications((prev) => {
        console.log(prev);
        const altered = prev.splice(index, 1);
        return altered;
      });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isMounted && (
        <div className={`notification ${status}`}>
          <p>{data.message}</p>
          <p>{data.id}</p>
        </div>
      )}
    </>
  );
}

export default Notification;
