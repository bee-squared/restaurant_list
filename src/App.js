import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';

import './App.css';
import GridConfig from './data/grid-config';
import Data from './data/sample-data';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
      if (restaurants.length === 0) {
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
            .then((data) => data.sort((a, b) => a.name > b.name ? 1 : -1))
            .then((data) => setRestaurants(data));
        }
        fetchData();
      }
    })

  return (
    <div className='App'>
      <div className='title'>Restaurants</div>
      {Data ? <Grid header={GridConfig.header} data={restaurants} /> : null}
    </div>
  );
}

export default App;
