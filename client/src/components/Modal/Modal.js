import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from '../BackDrop/BackDrop';
import './Modal.scss';

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  formClass,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style} data-aos="zoom-in"
      data-aos-duration="500">
      <header className={`modal__header modal__header-${headerClass}`}>
        <h2 className="modal__title">{header}</h2>
      </header>
      <form
        onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}
        className={`modal__form modal__form-${formClass}`}
      >
        <div className={`model__content model__content-${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer modal__footer-${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
