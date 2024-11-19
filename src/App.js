import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import routes from './router/index';

function App() {
  return (
    <div className='App'>
      <div className='main'>{useRoutes(routes)}</div>
    </div>
  );
}

export default App;
