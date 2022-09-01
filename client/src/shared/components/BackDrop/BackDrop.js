import React from 'react';
import ReactDOM from 'react-dom';

import './BackDrop.scss'

const BackDrop = ({ onClick }) => {
    return ReactDOM.createPortal(
        <div className='header__backdrop' onClick={onClick}></div>, document.getElementById('backdrop-hook')
    )
}

export default BackDrop;