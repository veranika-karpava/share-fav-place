import React from 'react';

import './Avatar.scss';

const Avatar = ({ style, image, name, width }) => {
  return (
    <div className="avatar" style={style}>
      <img
        src={image}
        alt={name}
        style={{ width: width, height: width }}
        className="avatar__image"
      />
    </div>
  );
};

export default Avatar;
