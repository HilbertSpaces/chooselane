import React, { Component } from 'react';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className='about'>
      <video  id="background-video" loop autoPlay muted>
        <source src="https://www.dropbox.com/s/dj16qggvimk478k/VKLOL24s.m4v?dl=1" type="video/mp4" />
        <source src="https://www.dropbox.com/s/73i1g5ib1hfj0gx/VKLOL24s.webm?dl=1" type="video/webm" />
        Your browser does not support the video tag.
        </video>
        <div className='descrip'>
          <h1>The Lane Seven Project</h1>
          <p>
            LaneSeven is an ongoing project (released by a single developer alongside
            a few players) with the goal
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
            <br />
            <br />
            Want to contact us?
            <br />
            Send us an email at: laneviiproject@gmail.com
          </p>
        </div>
      </div>
    )
  }
}

export default About;
