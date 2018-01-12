import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  Champs  from './Champs';
import Home from './Map'
import About from './About'
import ChampStats from './ChampStats'
import Nav from './Nav'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='lane_map'>
        <p className='legal'>LaneSeven is not endorsed, certified or otherwise approved in any way by Riot Games, Inc. or any of its affiliates</p>
          <Nav />
          <Route exact path="/" render={() => <Home /> } />
          <Route exact path="/About" render={() => <About /> } />
          <Route path="/champions/:league/:lane" component={ Champs } />
          <Route path="/statistics/:league/:lane/:champion" component = { ChampStats } />
        </div>
     </BrowserRouter>
    )
  }
}

export default App;
