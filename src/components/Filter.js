import React from 'react';

const Filter = ({ instruction, listValues, handleChange }) => {
  return (
    <div className='filter'>
      <select className='select' onChange={handleChange} >
        <option value="ShowAll">{instruction}</option>
        {listValues.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
