import React from 'react';
import styles from './Modal.module.css';

function Modal(props) {
  return <div className={styles.modalBackground}>{props.children}</div>;
}

export default Modal;
