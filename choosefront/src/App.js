import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import map from 'top_lane.jpg'

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

class App extends Component {
  render() {
    return (
      <div className="jumbotron">
        <img src="{map}" className="map" alt="Map did not load"></img>
        <ChampName></ChampName>
        <LaneIcon></LaneIcon>
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
