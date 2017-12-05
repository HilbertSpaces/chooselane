import React, { Component } from 'react';
import './ChampStats.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import Home from './Map'
import Dashboard from './Dashboard'
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
      <div>
        <img className='champimg' src={
        'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
        'Vayne_11' + '.jpg'}>
        </img>
        <div id='cName' className='cName'>
        </div>
      </div>
    const trans = this.state.mounted ?
      <div  key={3} className='champ'>{champ}</div>: null;
    const trans1 = this.state.mounted ?
      <div  key={4} className='mapT'></div>: null;
    const birthdeathrates = [
{country:"alg", birth:36.4,death:14.6}, {country:"con", birth:37.3,death:8}, {country:"egy", birth:42.1,death:15.3},
 {country:"gha", birth:55.8,death:25.6},  {country:"ict", birth:56.1,death:33.1},  {country:"mag", birth:41.8,death:15.8},
 {country:"mor", birth:46.1,death:18.7},  {country:"tun", birth:41.7,death:10.1},  {country:"cam", birth:41.4,death:19.7},
 {country:"cey", birth:35.8,death:8.5},  {country:"chi", birth:34,death:11},  {country:"tai", birth:36.3,death:6.1},
 {country:"hkg", birth:32.1,death:5.5},  {country:"ind", birth:20.9,death:8.8},  {country:"ids", birth:27.7,death:10.2},
 {country:"irq", birth:20.5,death:3.9},  {country:"isr", birth:25,death:6.2},  {country:"jap", birth:17.3,death:7},
 {country:"jor", birth:46.3,death:6.4},  {country:"kor", birth:14.8,death:5.7},  {country:"mal", birth:33.5,death:6.4},
 {country:"mog", birth:39.2,death:11.2},  {country:"phl", birth:28.4,death:7.1},  {country:"syr", birth:26.2,death:4.3},
 {country:"tha", birth:34.8,death:7.9},  {country:"vit", birth:23.4,death:5.1},  {country:"can", birth:24.8,death:7.8},
 {country:"cra", birth:49.9,death:8.5},  {country:"dmr", birth:33,death:8.4},  {country:"gut", birth:47.7,death:17.3},
 {country:"hon", birth:46.6,death:9.7},  {country:"mex", birth:45.1,death:10.5},  {country:"nic", birth:42.9,death:7.1},
 {country:"pan", birth:40.1,death:8},  {country:"usa", birth:21.7,death:9.6},  {country:"arg", birth:21.8,death:8.1},
 {country:"bol", birth:17.4,death:5.8},  {country:"bra", birth:45,death:13.5},  {country:"chl", birth:33.6,death:11.8},
 {country:"clo", birth:44,death:11.7},  {country:"ecu", birth:44.2,death:13.5},  {country:"per", birth:27.7,death:8.2},
 {country:"urg", birth:22.5,death:7.8},  {country:"ven", birth:42.8,death:6.7},  {country:"aus", birth:18.8,death:12.8},  {country:"bel", birth:17.1,death:12.7},
 {country:"brt", birth:18.2,death:12.2},  {country:"bul", birth:16.4,death:8.2},  {country:"cze", birth:16.9,death:9.5},
 {country:"dem", birth:17.6,death:19.8},  {country:"fin", birth:18.1,death:9.2},  {country:"fra", birth:18.2,death:11.7},
 {country:"gmy", birth:18,death:12.5},  {country:"gre", birth:17.4,death:7.8},  {country:"hun", birth:13.1,death:9.9},
 {country:"irl", birth:22.3,death:11.9},  {country:"ity", birth:19,death:10.2},  {country:"net", birth:20.9,death:8},
 {country:"now", birth:17.5,death:10},  {country:"pol", birth:19,death:7.5},  {country:"pog", birth:23.5,death:10.8},
 {country:"rom", birth:15.7,death:8.3},  {country:"spa", birth:21.5,death:9.1},  {country:"swe", birth:14.8,death:10.1},
 {country:"swz", birth:18.9,death:9.6},  {country:"rus", birth:21.2,death:7.2},  {country:"yug", birth:21.4,death:8.9},
 {country:"ast", birth:21.6,death:8.7},  {country:"nzl", birth:25.5,death:8.8}];
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
        <Dashboard id='d2' data={birthdeathrates.slice(0,10)} />
        <Dashboard data={birthdeathrates.slice(0,15)} />
          <img id='right' className='vs' src={
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
          'Ezreal_9' + '.jpg'}></img>
      </ReactCSSTransitionGroup>
      </div>
  )}
}

export default ChampStats;
