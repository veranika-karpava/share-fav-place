import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.scss';

const SideDrawer = ({ show, onClick, children }) => {
    const nodeRef = useRef(null)
    const content = (
        <CSSTransition
            in={show}
            timeout={200}
            classNames='slide-in-left'
            nodeRef={nodeRef}
            mountOnEnter
            unmountOnExit>
            <aside className='header__side-drawer' onClick={onClick}>{children}</aside>
        </CSSTransition>);

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;