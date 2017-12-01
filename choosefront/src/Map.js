import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ChampName extends Component {
  constructor(){
    super();
    this.state = {name: 'Jon'};

  }

  render() {
    return (<p></p>)
  }
}

class LaneIcon extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <Link className='lane' id={this.props.lane} to={this.props.view}></Link>
    )
  }
}

class Map extends Component {
  render() {
    var lanes = ['top','middle','jungle','bottom','support']
    var lane_render = lanes.map(function(lane){
      return (
        <div className = {lane + '_parent'}>
          <LaneIcon lane={lane} view='/champions'></LaneIcon>
          <div className={lane +'_desc_parent'}>
            <Link className={lane+'_desc'} to={'/champions'}>
              {lane.toUpperCase()}
            </Link>
          </div>
        </div>
      )
    })
    return (
      <div>
      <div className='lane_map'> </div>
        {lane_render}
        /*<div className='top_parent'>
          <LaneIcon lane='top' view='/champions'></LaneIcon>
          <div className='top_desc_parent'>
            <Link className='top_desc' to={'/champions'}>Top</Link>
          </div>
        </div>
        <LaneIcon lane='middle' view='/champions'></LaneIcon>
        <LaneIcon lane='jungle' view='/champions'></LaneIcon>
        <LaneIcon lane='support' view='/champions'></LaneIcon>
        <LaneIcon lane='bottom' view='/champions'></LaneIcon>*/
      </div>
    )
  }
}

export default Map;
