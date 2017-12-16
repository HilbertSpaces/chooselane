import React from 'react'
import { Button } from 'semantic-ui-react'

const LeagueMenu = () => (
  <Button.Group>
    <Button inverted basic color='brown'>Bronze</Button>
    <Button inverted basic color='teal'>Silver</Button>
    <Button inverted basic color='yellow'>Gold</Button>
    <Button inverted basic color='purple'>Platinum ^</Button>
  </Button.Group>
)

export default LeagueMenu
