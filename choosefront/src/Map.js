import React, { Component } from 'react';
import './Map.css';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios'
import LeagueMenu from './LeagueMenu'

class LaneIcon extends Component {
  render() {
    return (
        <Link className='lanes' id={this.props.lane} to={this.props.view}></Link>
    )
  }
}

class HomeComponent extends Component {

  componentDidMount() {
    axios.get('http://localhost:8000/api/v1/data/bronze/avg/?format=json').then(function(response){
      console.log(response.data)
    })
  }

  render() {
    var lanes = ['top','middle','jungle','bottom','support']
    var lane_render = lanes.map(function(lane,i){
      return (
        <div key={i} className ='lane_parent' id={lane + '_parent'}>
          <LaneIcon lane={lane} view='/champions'></LaneIcon>
          <div className='lane_desc_parent'>
            <Link className='lane_desc' to={'/champions'}>
              {lane.toUpperCase()}
            </Link>
          </div>
        </div>
      )
    })
    return (

        <div className='home'>
          <div className='lane_map'> <LeagueMenu></LeagueMenu></div>
          {lane_render}
        </div>
    )
  }
}
const Home = HomeComponent;
export default Home;
