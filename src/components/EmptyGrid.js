import React from 'react';
import image from '../assets/images/empty-grid.png';

import '../assets/css/style.css';

const EmptyGrid = () => {
  return (
    <div className='empty-grid-container'>
      <p>Bummer!</p>
      <p>
        Based on your search or filter selection(s), there are no results. Try selecting a different filter option.
      </p>
      <div className='image-container'>
        <img src={image} alt='Empty Restaurant'/>
      </div>
    </div>
  );
};

export default EmptyGrid;
