import React from 'react';
import styles from './Welcome.module.css';

function Welcome() {
  return (
    <div className={styles.welcomeContainer}>
      <h2 className={styles.welcomeHeading}>Welcome to</h2>
      <div className={styles.title}>
        <span className='iconify' data-icon='mdi-alpha-f-circle-outline'></span>
        <h1>akebook!</h1>
      </div>
      <p className={styles.welcomeDescription}>
        A place to waste time, lose friends, and share your reactionary thoughts
        on controversial issues before you've had a chance think through them
        calmly.
      </p>
    </div>
  );
}

export default Welcome;
