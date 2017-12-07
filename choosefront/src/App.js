import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  Champs  from './Champs';
import Home from './Map'
import Riot from './Riot'
import ChampStats from './ChampStats'
import Nav from './Nav'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path="/" render={() => <Home /> } />
          <Route path="/champions" render={ () => <Champs/> } />
          <Route path="/statistics" render={ () => <ChampStats/> } />
          <Route path='//riot.txt' render={ () => <Riot/> } />
        </div>
     </BrowserRouter>
    )
  }
}

export default App;
