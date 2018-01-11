import React, { Component } from 'react';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className='about'>
        <div className='descrip'>
          <h1>The Lane Seven Project</h1>
          <p>
            LaneSeven is an ongoing project, released by a single developer alongside
            a few players with the goal
            of creating tools to help league of legends players make smarter decisions
            and organize as a team. We hope that while LaneSeven is beginning as the
            site you're seeing now, the community will work alongside us to form tools
            and projects to help enhance the game.
            <br />
            <br />
            Our current goal after completing our work with this page is to work on a collaboration project that helps
            players form teams. Throughout this work we hope that engaging members will begin to work alongside us so
            that we create these tools to the specifiactions of real players and helps
            to form the league community we've all been waiting for.
          </p>
        </div>
      </div>
    )
  }
}

export default About;
