import React from 'react';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import '../assets/css/style.css';

const reduceGridDetail = (restaurant) => {
  let rowDetail = [];

  for (let key in restaurant) {
    switch (key) {
      case 'name':
        rowDetail[0] = restaurant[key];
        break;
      case 'city':
        rowDetail[1] = restaurant[key];
        break;
      case 'state':
        rowDetail[2] = restaurant[key];
        break;
      case 'telephone':
        rowDetail[3] = restaurant[key];
        break;
      case 'genre':
        rowDetail[4] = restaurant[key];
        break;
      default:
        break;
    }
  }
  return rowDetail;
};

const Grid = ({ header, data }) => {
  let reducedData = [data.map((restaurant) => reduceGridDetail(restaurant))];

  return (
    <div className='grid-container'>
      <div className='grid-header'>
        {header.map((headerColumn) => (
          <GridHeader key={headerColumn}>{headerColumn}</GridHeader>
        ))}
      </div>
        {reducedData.map((restaurants, idx1) => (
          restaurants.map((restaurant, idx2) => <GridRow key={restaurant.id + idx1.toString() +idx2.toString()} restaurant={restaurant} />)
        ))}
    </div>
  );
};

export default Grid;
