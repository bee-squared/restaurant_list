import React from 'react';
import GridRowDetail from './GridRowDetail';

import '../assets/css/style.css';

const GridRow = ({ restaurant }) => {

  return (
    <div className='grid-row'>
      <GridRowDetail fieldName='name' detail={restaurant[0]} />
      <GridRowDetail fieldName='city' detail={restaurant[1]} />
      <GridRowDetail fieldName='state' detail={restaurant[2]} />
      <GridRowDetail fieldName='telephone' detail={restaurant[3]} />
      <GridRowDetail key={restaurant.id} fieldName='genre' detail={restaurant[4]} />
    </div>
  );
};

export default GridRow;
