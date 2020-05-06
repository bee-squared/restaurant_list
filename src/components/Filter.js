import React from 'react';

import '../assets/css/style.css';

const Filter = ({ name, instruction, listValues, handleChange }) => {
  return (
    <div className='filter'>
      <select id={name} className='select' onChange={handleChange} >
        <option value="ShowAll">{instruction}</option>
        {listValues.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
