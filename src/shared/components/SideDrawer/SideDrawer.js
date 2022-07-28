import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';



import './SideDrawer.scss';

const SideDrawer = (props) => {
    const nodeRef = useRef(null)
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames='slide-in-left'
            nodeRef={nodeRef}
            mountOnEnter
            unmountOnExit>
            <aside className='header__side-drawer' onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>);

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;