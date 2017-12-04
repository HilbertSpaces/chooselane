import React, { Component } from 'react';
import './ChampStats.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import Home from './Map'

class ChampStats extends React.Component{
  constructor(props) {
    super();
    this.state = {};
  }
  getInitialState() {
      return { mounted: false };
    }
    componentDidMount() {
      this.setState({ mounted: true });
    }
  render(){
    const champ =
      <img className='champimg' src={
      'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
      'Aatrox_0' + '.jpg'}>
    </img>
    const trans = this.state.mounted ?
      <div  key={3} className='champ'>{champ}</div>: null;
    const trans1 = this.state.mounted ?
      <div  key={4} className='mapT'></div>: null;
    return(
      <div>
      <ReactCSSTransitionGroup
        transitionName="mapT"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {trans1}
      </ReactCSSTransitionGroup>
      <ReactCSSTransitionGroup
        transitionName="champIn"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {trans}
      </ReactCSSTransitionGroup>
      </div>
  )}
}

export default ChampStats;
