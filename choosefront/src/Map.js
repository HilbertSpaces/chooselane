import React, { Component } from 'react';
import './Map.css';
import { Link } from 'react-router-dom';
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
    var legal =
      <p className='legal'>
        LaneSeven is not endorsed, certified or otherwise approved in any way by Riot Games, Inc. or any of its affiliates
      </p>
    return (
        <div className='home'>
          <div className='lane_map'>{league_button}
          <iframe className='aff' src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=14&l=ur1&category=hotnewreleases&banner=1BWCMZYQA5F2PESPW182&f=ifr&linkID=c78b6f22be526635daaf8bb33ee8eb05&t=clevels-20&tracking_id=clevels-20" width="160" height="600" scrolling="no" border="0" marginwidth="0" frameborder="0"></iframe>
          <iframe className='affr' src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=14&l=ur1&category=twitchprime&banner=1KQ611VSFHHQ71PJKR82&f=ifr&linkID=35199a016c974221b3f63d9142043b6f&t=clevels-20&tracking_id=clevels-20" width="160" height="600" scrolling="no" border="0" marginwidth="0" frameborder="0"></iframe>
          </div>
          {lane_render}
          {legal}
        </div>
    )
  }
}
const Home = HomeComponent;
export default Home;
