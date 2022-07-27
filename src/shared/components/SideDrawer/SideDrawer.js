import React from 'react';

import './SideDrawer.scss';

const SideDrawer = ({ children }) => {

    return (
        <aside className='header__side-drawer'>
            {children}
        </aside>
    );
};

export default SideDrawer;