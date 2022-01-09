import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import RhymeFinder from './RhymeFinder';

ReactDOM.render(
  <React.StrictMode>
      <h1> React Rhyme Finder </h1>
      <RhymeFinder />
  </React.StrictMode>,
  document.getElementById('root')
);