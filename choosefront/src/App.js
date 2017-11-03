import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import map from './choose_lane_map1.png';

class ChampName extends Component {
  constructor(){
    super();
    this.state = {name: 'Jon'};

  }
  componentDidMount(){
    axios.get('http://localhost:8000')
      .then(response => this.setState({name: response.data}))
      .catch(error => console.log('fail'))
  }
  render() {
    return (<p></p>)
  }
}

class LaneIcon extends Component {
  render() {
    return (
      <div className="top_lane"> </div>
    )
  }
}

var myfunction= function() {
        console.log("CLICKED");
  }

class App extends Component {
  render() {
    return (
      <div className='map_wrap'>
        <div className='lane_map'>
          <button onClick={this.myfunction} className='top_lane'>Top</button>
          <ChampName></ChampName>
          <LaneIcon></LaneIcon>
        </div>
    </div>
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ChampName></ChampName>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    )
  }
}

export default App;
