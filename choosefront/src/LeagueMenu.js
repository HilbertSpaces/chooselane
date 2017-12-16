import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class LeagueMenu extends Component{
  state = { activeItem: 'bronze' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render(){
    const { activeItem } = this.state
    return(
      <Button.Group>
        <Button name='bronze' active={activeItem === 'bronze'} inverted basic color='brown'>Bronze</Button>
        <Button name='silver' active={activeItem === 'silver'} onClick={this.handleItemClick} inverted basic color='teal'>Silver</Button>
        <Button name='gold' active={activeItem === 'gold'} onClick={this.handleItemClick} inverted basic color='yellow'>Gold</Button>
        <Button name='platinum' active={activeItem === 'platinum'} onClick={this.handleItemClick} inverted basic color='violet'>Platinum ^</Button>
      </Button.Group>
    )
  }
}
export default LeagueMenu
