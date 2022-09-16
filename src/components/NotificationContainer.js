import React, { useContext, useEffect } from 'react';
import styles from './NotificationContainer.module.css';
import Notification from './Notification';
import { NotificationsContext } from '../App';

function NotificationContainer() {
  const { notifications } = useContext(NotificationsContext);

  // useEffect(() => {
  //   console.log(notifications); //? Why does this not work?
  // }, [notifications]);

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notification) => (
        <Notification key={notification.id} data={notification} />
      ))}
    </div>
  );
}

export default NotificationContainer;
