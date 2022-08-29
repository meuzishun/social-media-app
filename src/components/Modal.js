import React from 'react';
import './Modal.css';

function Modal(props) {
  return <div className='modalBackground'>{props.children}</div>;
}

export default Modal;
