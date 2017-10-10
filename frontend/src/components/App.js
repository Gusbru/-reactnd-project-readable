import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import EnhancedTable from './AppTables';
import { addPost, deletePost } from '../actions'
import './App.css';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <SimpleAppBar title="My Posts"/>

        Hello World

        {/* <EnhancedTable /> */}
      </div>
    );
  }
}

export default App;
