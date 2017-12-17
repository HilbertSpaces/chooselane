import React, { Component } from 'react';
import './Map.css';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios'
import LeagueMenu from './LeagueMenu'
import { Button } from 'semantic-ui-react'

class LaneIcon extends Component {
  render() {
    return (
        <Link key={this.props.lane} className='lanes' id={this.props.lane} to={this.props.view}></Link>
    )
  }
}

class HomeComponent extends Component {
  state={activeItem:'bronze'};

  handleItemClick = (e, { name }) => this.setState({activeItem:name});

  render() {
    const activeItem = this.state.activeItem
    const league_button=
        <Button.Group>
          <Button name='bronze' active={activeItem === 'bronze'} onClick={this.handleItemClick} inverted basic color='brown'>Bronze</Button>
          <Button name='silver' active={activeItem === 'silver'} onClick={this.handleItemClick} inverted basic color='teal'>Silver</Button>
          <Button name='gold' active={activeItem === 'gold'} onClick={this.handleItemClick} inverted basic color='yellow'>Gold</Button>
          <Button name='platinum' active={activeItem === 'platinum'} onClick={this.handleItemClick} inverted basic color='violet'>Platinum ^</Button>
        </Button.Group>
    var lanes = ['top','middle','jungle','bottom','support']
    var lane_render = lanes.map((lane,i) =>{
      return (
        <div key={i} className ='lane_parent' id={lane + '_parent'}>
          <LaneIcon lane={lane}
            view={'/champions/'+ this.state.activeItem + '/' + lane}>
          </LaneIcon>
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
          <div className='lane_map'>{league_button}</div>
          {lane_render}
        </div>
    )
  }
}
const Home = HomeComponent;
export default Home;
