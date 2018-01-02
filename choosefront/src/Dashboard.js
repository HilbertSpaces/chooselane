import React, { Component } from 'react';
import './Dashboard.css'
import {Table} from 'semantic-ui-react'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    }
    this.highlight = this.highlight.bind(this);
  }
  highlight(country) {
    this.setState({highlighted: country});
  }
  render() {
    const {
      data
    } = this.props;
    const {
      highlighted
    } = this.state;

    return <div className='dashboard'>

    <div className='main'>
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Key Statistics'
        metric = 'birth'
        id = 'topChart'
      />
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Win Rate When You Do'
        metric = 'death'
        id='botChart'
      />
      </div>
      <Table inverted padded unstackable selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Vayne</Table.HeaderCell>
          <Table.HeaderCell>Stat</Table.HeaderCell>
          <Table.HeaderCell>Ezreal</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>33.4</Table.Cell>
          <Table.Cell>TotalDamage per/s</Table.Cell>
          <Table.Cell>59</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jamie</Table.Cell>
          <Table.Cell>Approved</Table.Cell>
          <Table.Cell>Requires call</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Jill</Table.Cell>
          <Table.Cell>Denied</Table.Cell>
          <Table.Cell>None</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
      <div className='op'>
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Key Statistics'
        metric = 'birth'
        id = 'topChart'
      />
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Win Rate When You Do'
        metric = 'death'
        id='botChart'
      />
      </div>
     </div>;
  }
}

function Chart({
  data,
  highlight,
  highlighted,
  label,
  metric,
  id
}) {
  const barData = data.sort((a, b) => b[metric] - a[metric])
    .map((d, i) => ({...d,
      rank: i
    }))
  return <div id={id} className='chart'>
      {[
       <div className='label'>{label}</div>,
       <div>
         {barData.map(d =>
          <Bar
            country={d.country}
            value={d[metric]}
            rank={d.rank}
            highlight={highlight}
            highlighted={d.country === highlighted}
          />
         )}
      </div>
      ]}
    </div>;
}

function Bar({
  country,
  highlight,
  highlighted,
  value,
  rank
}) {
  return <div
  className = {'bar' + (highlighted ? ' highlighted' : '')}
  onMouseOver = {
    () => highlight(country)
  }
  style = {
      {
        position: 'relative',
        top: rank/2+'%',
        transition: 'top .5s'
      }
    } >
    <div className='bar__label'>{country}</div> <
    div className = 'bar__mark'
  style = {
    {
      width: value+'%',
    }
  }
  >{value + '%'}</div></div>;
}

export default Dashboard
