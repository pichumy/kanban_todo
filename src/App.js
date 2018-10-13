import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './TodoBoard/todoboard_container';

class App extends Component {
  render() {
    let cookie = document.cookie.slice(5);
    return (
      <div className="App">
        <Todos cookie={cookie}/>
      </div>
    );
  }
}

export default App;
