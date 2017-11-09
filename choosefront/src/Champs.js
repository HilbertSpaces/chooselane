import React, { Component } from 'react';
import './App.css';
import { Transition } from 'react-transition-group/Transition'
import Anime from 'react-anime'

class Champ extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="grid">
          <div className="image">
          <img src='http://ddragon.leagueoflegends.com/cdn/7.21.1/img/champion/Draven.png'></img>
          </div>
        </div>
    )
  }
}

class ChampGrid extends Component {
  render() {
    return (
      <div>
        <Champ />
        <Anime opacity={[0, 1]} translateY={'2em'} delay={(e, i) => i * 2000}>
       <h1>Select Your Champion</h1>
  <section>
  </section>
</Anime>
</div>
    )
  }
}
export default ChampGrid;
