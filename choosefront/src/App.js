import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  Champs  from './Champs';
import Home from './Map'
import ChampStats from './ChampStats'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <nav>
          <p>Home</p>
          <p>Lane Statistics</p>
          <p>About Us</p>
        </nav>
          <Route exact path="/" render={() => <Home /> } />
          <Route path="/champions" render={ () => <Champs/> } />
          <Route path="/statistics" render={ () => <ChampStats/> } />
        </div>
     </BrowserRouter>
    )
  }
}

export default App;
