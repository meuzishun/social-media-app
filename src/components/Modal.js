import React, { useEffect, createContext, useContext } from 'react';
import { useTransition } from 'react-transition-state';
import { ModalContext } from '../App';
import { PopupContext } from '../App';
import './Modal.css';

export const ModalTransitionContext = createContext();

function Modal(props) {
  const { setDisplayModal } = useContext(ModalContext);
  const { setPopupContent } = useContext(PopupContext);
  const [{ status, isMounted }, toggleModal] = useTransition({
    timeout: 500,
    initialEntered: false,
    mountOnEnter: false,
    preEnter: true,
    unmountOnExit: true,
  });

  useEffect(() => {
    if (status === 'exited') {
      toggleModal();
    }

    if (status === 'unmounted') {
      setPopupContent(null);
      setDisplayModal(false);
    }
  }, [status]);

  return (
    <>
      {isMounted ? (
        <ModalTransitionContext.Provider value={toggleModal}>
          <div className={`modalBackground ${status}`}>{props.children}</div>
        </ModalTransitionContext.Provider>
      ) : null}
    </>
  );
}

export default Modal;
