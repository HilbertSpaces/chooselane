import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

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
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <a className={this.props.lane} href={this.props.view} target='_blank'></a>
    )
  }
}

var myfunction= function() {
        console.log("CLICKED");
  }

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='lane_map'>
          <ChampName></ChampName>
          <LaneIcon lane='top_lane' view='https://www.google.com'></LaneIcon>
          <p></p>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
