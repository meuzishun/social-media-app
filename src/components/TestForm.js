import React, { useContext } from 'react';
import { ModalContext } from '../App';
import { PopupContext } from '../App';

function TestForm() {
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);

  const handleCancelClick = () => {
    setPopupContent(null);
    setDisplayModal(false);
  };

  return (
    <div>
      <h3>I am a test heading</h3>
      <p>I am a test paragraph.</p>
      <button onClick={handleCancelClick}>cancel</button>
    </div>
  );
}

export default TestForm;
