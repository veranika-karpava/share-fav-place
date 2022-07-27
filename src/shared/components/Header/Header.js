import React from 'react';

import './Header.scss';

const Header = ({ children }) => {
    return (
        <header className='header'>{children}</header>
    );
};

export default Header;