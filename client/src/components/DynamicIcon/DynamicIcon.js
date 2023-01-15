import React from 'react';

import { icons } from '../../data/icons.data';

const DynamicIcon = ({ name, className }) => {
    const DynamicIcon = icons[name];
    return <DynamicIcon className={className} />
};

export default DynamicIcon;