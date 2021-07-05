import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ProjectListScreen} from './screen/projectlist/index'
import {LoginScreen} from '../src/screen/login/index'

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
