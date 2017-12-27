import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './Nav.css'
export default class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted stackable>
        <Menu.Item
          key={'Home'}
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key={'Lane Seven'}
          color={'violet'}
          active={activeItem === 'Blank'}
        > The Lane Seven Project
        </Menu.Item>
        <Menu.Item
          key={'About Us'}
          name='About Us'
          active={activeItem === 'About Us'}
          onClick={this.handleItemClick}
        >
          About Us
        </Menu.Item>
      </Menu>
    )
  }
}
