import React from 'react';

import '../assets/css/style.css';

const GridHeader = (props) => {

  return (
    <div className='header'>{props.children}</div>
  )
}

export default GridHeader;