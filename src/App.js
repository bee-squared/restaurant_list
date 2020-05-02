import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Filter from './components/Filter';
import EmptyGrid from './components/EmptyGrid';

import './App.css';
import config from './data/config';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentState, setCurrentState] = useState('ShowAll');
  const [currentGenre, setCurrentGenre] = useState('ShowAll');
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
        .then((sortedData) => {
          let allGenres = [];
          sortedData.forEach((restaurant) => {
            let restaurantGenres = restaurant.genre.split(',');
            restaurantGenres.forEach((genre) => {
              if (!allGenres.includes(genre)) {
                allGenres.push(genre);
              }
            });
            allGenres.sort((a, b) => (a > b ? 1 : -1));
            setGenres([...allGenres]);
          });
          return sortedData;
        })
        .then((sortedData) => {
          setRestaurants(sortedData);
          setFilteredRestaurants(sortedData);
        });
    }
    fetchData();
  }, [setRestaurants, setFilteredRestaurants, setGenres]);

  const handleStateAbbr = (e) => {
    const stateAbbr = e.target.value;
    setCurrentState(stateAbbr);
    resetFilters('states', stateAbbr);
  };

  const handleGenre = (e) => {
    const genre = e.target.value;
    setCurrentGenre(genre);
    resetFilters('genres', genre);
  };

  const resetFilters = (filter, value) => {
    let newFilteredRestaurantList = restaurants;

    if (filter === 'states' && value !== 'ShowAll') {
      newFilteredRestaurantList = newFilteredRestaurantList.filter((restaurant) => {
        return restaurant.state === value;
      });
    } else if (filter !== 'states' && currentState !== 'ShowAll') {
      newFilteredRestaurantList = newFilteredRestaurantList.filter((restaurant) => {
        return restaurant.state === currentState;
      });
    }

    if (filter === 'genres' && value !== 'ShowAll') {
      newFilteredRestaurantList = newFilteredRestaurantList.filter(
        (restaurant) => {
          return restaurant.genre.indexOf(value) >= 0;
        }
      );
    } else if (filter !== 'genres' && currentGenre !== 'ShowAll') {
      newFilteredRestaurantList = newFilteredRestaurantList.filter(
        (restaurant) => {
          return restaurant.genre.indexOf(currentGenre) >= 0;
        }
      );
    }

    setFilteredRestaurants(newFilteredRestaurantList);
  };

  return (
    <div className='App'>
      <div className='title'>Restaurants</div>
      <div className='filter-container'>
        <Filter
          name='filter'
          instruction='Show All Genres'
          listValues={genres}
          handleChange={handleGenre}
        />
        <Filter
          name='states'
          instruction='Show All States'
          listValues={config.state}
          handleChange={handleStateAbbr}
        />
      </div>
      {filteredRestaurants.length === 0 ? (
        <EmptyGrid />
      ) : (
        <Grid header={config.header} data={filteredRestaurants} />
      )}
    </div>
  );
};

export default App;
