import React from 'react';
import './Avatar.scss'

const Avatar = ({ className, style, path, name, width }) => {
    return (
        <div className={`avatar__${className}`} style={style}>
            <img src={path} alt={name} style={{ width: width, height: width }} className='avatar__image' />
        </div>
    );
};

export default Avatar;