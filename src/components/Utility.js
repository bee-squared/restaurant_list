import React from 'react';

import '../assets/css/style.css';

const Utility = ({numItems, handleFilterReset, searchInput, currentState, currentGenre}) => {
  return (
    <div className='utility-container'>
        <div>Total: {numItems}</div>
        {searchInput !== '' || currentState !== 'ShowAll' || currentGenre !== 'ShowAll' ? <button onClick={handleFilterReset}>Clear All Filters</button> : null}
    </div>
  );
};

export default Utility;
