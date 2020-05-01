import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Filter from './components/Filter';
import EmptyGrid from './components/EmptyGrid'

import './App.css';
import config from './data/config';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        'https://code-challenge.spectrumtoolbox.com/api/restaurants',
        {
          headers: {
            Authorization: 'Api-Key q3MNxtfep8Gt',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => data.sort((a, b) => (a.name > b.name ? 1 : -1)))
        .then((data) => {
          setRestaurants(data);
          setFilteredRestaurants(data);
        });
    }
    fetchData();
  }, [setRestaurants, setFilteredRestaurants]);

  const handleStateAbbr = (e) => {
    const stateAbbr = e.target.value;
    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.state === stateAbbr;
    });

    if (stateAbbr === 'ShowAll') {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(filteredRestaurants);
    }
  };

  return (
    <div className='App'>
      <div className='title'>Restaurants</div>
      <Filter
        instruction={'Show All States'}
        listValues={config.state}
        handleChange={handleStateAbbr}
      />
    {filteredRestaurants.length === 0 ? <EmptyGrid /> : <Grid header={config.header} data={filteredRestaurants}/>}
    </div>
  );
};

export default App;
