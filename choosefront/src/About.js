import React, { Component } from 'react';
import './About.css';
import { Button } from 'semantic-ui-react'

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
          <h1>The LaneSeven Project</h1>
          <p>
            LaneSeven is an ongoing project (released by a single developer alongside
            a few players) with the goal
            of creating tools to help league of legends players make smarter decisions
            and organize as a team. We hope that while LaneSeven is beginning as the
            site you're seeing now, the community will work alongside us to form tools
            and projects to help enhance the game.
            <br />
            <br />
            Our current goal after completing our work with this page is to build a collaboration project that helps
            players form teams. Throughout our work, we hope that engaging members will begin to work alongside us so
            that we create tools to the specifiactions of real players and
             form the league community we've all been waiting for.
            <br />
            <br />
            Want to contact us?
            <br />
            Send us an email at: laneviiproject@gmail.com
            <br />
            <br />
            Want to support us?
            <br />
              <Button target='_blank' href='http://paypal.me/laneviiproject' name='support' inverted basic color='violet'>Support Us!</Button>
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p className='legal'>
          The LaneSeven Project isn’t endorsed by Riot Games and doesn’t reflect the views or opinions
          of Riot Games or anyone officially involved in producing or managing League of Legends.
          League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
          </p>
        </div>
      </div>
    )
  }
}

export default About;
