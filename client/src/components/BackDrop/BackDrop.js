import React from 'react';
import { createPortal } from 'react-dom';

import './BackDrop.scss';

const BackDrop = ({ onClick }) => {

  return createPortal(
    <div
      className="header__backdrop"
      onClick={onClick}
      aria-hidden="true"
    >
    </div>,
    document.getElementById('backdrop-hook')
  );
};

export default BackDrop;
