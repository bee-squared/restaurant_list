import React, { useState, useEffect, useCallback } from 'react';
import Grid from './components/Grid';
import Filter from './components/Filter';
import EmptyGrid from './components/EmptyGrid';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

import './App.css';
import config from './data/config';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentState, setCurrentState] = useState('ShowAll');
  const [currentGenre, setCurrentGenre] = useState('ShowAll');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const numRestaurantsPerPage = 10;

  const addPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage, setCurrentPage]);

  const subtractPage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage, setCurrentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleStateAbbr = (e) => {
    const stateAbbr = e.target.value;
    setCurrentState(stateAbbr);
    handleSearchFilters('states', stateAbbr);
  };

  const handleGenre = (e) => {
    const genre = e.target.value;
    setCurrentGenre(genre);
    handleSearchFilters('genres', genre);
  };

  const handleSearchSubmit = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }
      if (searchInput.length > 0) {
        let newFilteredRestaurantList = filteredRestaurants.filter(
          (restaurant) =>
            restaurant.name.toUpperCase().includes(searchInput.toUpperCase()) ||
            restaurant.city.toUpperCase().includes(searchInput.toUpperCase()) ||
            restaurant.genre.toUpperCase().includes(searchInput.toUpperCase())
        );
        setCurrentPage(0);
        setFilteredRestaurants(newFilteredRestaurantList);
      }
    },
    [filteredRestaurants, searchInput, setFilteredRestaurants]
  );

  const handleSearchFilters = useCallback(
    (filter, value) => {
      let newFilteredRestaurantList = restaurants;
      if (filter === 'states' && value !== 'ShowAll') {
        newFilteredRestaurantList = newFilteredRestaurantList.filter(
          (restaurant) => {
            return restaurant.state === value;
          }
        );
      } else if (filter !== 'states' && currentState !== 'ShowAll') {
        newFilteredRestaurantList = newFilteredRestaurantList.filter(
          (restaurant) => {
            return restaurant.state === currentState;
          }
        );
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

      if (value.length > 0) {
        newFilteredRestaurantList = newFilteredRestaurantList.filter(
          (restaurant) =>
            restaurant.name.toUpperCase().includes(searchInput.toUpperCase()) ||
            restaurant.city.toUpperCase().includes(searchInput.toUpperCase()) ||
            restaurant.genre.toUpperCase().includes(searchInput.toUpperCase())
        );
      }
      setCurrentPage(0);
      setFilteredRestaurants(newFilteredRestaurantList);
    },
    [
      currentGenre,
      currentState,
      restaurants,
      searchInput,
      setCurrentPage,
      setFilteredRestaurants,
    ]
  );

  const handleSearchInput = useCallback(
    (e) => {
      setSearchInput(e.target.value);
      if (e.target.value.length === 0) {
        handleSearchFilters(null, '');
      }
    },
    [setSearchInput, handleSearchFilters]
  );

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
          setIsInitialized(true);
        });
    }
    fetchData();
  }, [setRestaurants, setIsInitialized, isInitialized]);

  return (
    <div className='App'>
      <div className='title'>Restaurants</div>
      <div className='search-filter-container'>
        <div className='search-bar-container'>
          <SearchBar
            handleChange={handleSearchInput}
            handleSubmit={handleSearchSubmit}
          />
        </div>
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
      </div>
      {isInitialized && filteredRestaurants.length === 0 && currentPage >= 0 ? (
        <EmptyGrid />
      ) : (
        <Grid
          header={config.header}
          data={filteredRestaurants}
          currentPage={currentPage}
          itemsPerPage={numRestaurantsPerPage}
        />
      )}
      {filteredRestaurants.length > numRestaurantsPerPage ? (
        <Pagination
          numItems={filteredRestaurants.length}
          numItemsPerPage={numRestaurantsPerPage}
          currentPage={currentPage}
          subtractPage={subtractPage}
          addPage={addPage}
          goToPage={goToPage}
        />
      ) : null}
    </div>
  );
};

export default App;
