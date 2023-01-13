import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.scss';

const SideDrawer = ({ show, onClick, children }) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      <aside
        className="header__side-drawer"
        onClick={onClick}
        aria-hidden="true"
      >
        {children}
      </aside>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
