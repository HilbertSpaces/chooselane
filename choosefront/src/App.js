import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  ChampGrid  from './Champs';
import Map from './Map'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Map /> } />
          <Route path="/champions" render={ () => <ChampGrid className="junk"/> } />
        </div>
     </BrowserRouter>
    )
  }
}

export default App;
