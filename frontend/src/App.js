import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SimpleAppBar title="My Posts"/>
        Hello World!
      </div>
    );
  }
}

export default App;
