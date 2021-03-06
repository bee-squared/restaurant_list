import React from 'react';

import '../assets/css/style.css';

const SearchBar = (props) => {
  const { handleChange, handleSubmit } = props;
  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <input id='search-input' placeholder='Search restaurants by name, city, or genre' onChange={handleChange} />
    </form>
  );
};

export default SearchBar;
