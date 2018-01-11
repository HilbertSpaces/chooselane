import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './Nav.css'
import { Link } from 'react-router-dom';
import Home from './Map'

export default class Nav extends Component {
  state = {}

  render() {
    const { activeItem } = this.state

    var home =
      <Menu.Item
      key={'Home'}
          name='Home'
          active={activeItem === 'Home'}
          href='/'
        >
          Home
        </Menu.Item>

    var lanevii =
      <Menu.Item
        key={'Lane Seven'}
        color={'violet'}
        active={activeItem === 'Blank'}
      >
        The Lane Seven Project
      </Menu.Item>

      var about =
        <Menu.Item
          key={'About Us'}
          name='About Us'
          active={activeItem === 'About Us'}
          href='/About'
        >
          About Us
        </Menu.Item>

    return (
      <Menu inverted>
        {home}
        {lanevii}
        {about}
      </Menu>
    )
  }
}
