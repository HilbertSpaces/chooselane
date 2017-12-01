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
        <Link className='lanes' id={this.props.lane} to={this.props.view}></Link>
    )
  }
}

class Map extends Component {
  render() {
    var lanes = ['top','middle','jungle','bottom','support']
    var lane_render = lanes.map(function(lane){
      return (
        <div className ='lane_parent' id={lane + '_parent'}>
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
      <div>
      <div className='lane_map'> </div>
        {lane_render}
      </div>
    )
  }
}

export default Map;
