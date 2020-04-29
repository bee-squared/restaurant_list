import React from 'react';

const GridRowDetail = ({ fieldName, detail }) => {

  let splitGenres = [];

  if (fieldName === 'genre') {
    splitGenres = detail.split(',');
  }
return <div className='grid-detail'>{fieldName === 'genre' ? splitGenres.map((genre) => <div key={genre} className='detail'>{genre}</div>) : <div className='detail'>{detail}</div>}</div>
};

export default GridRowDetail;
