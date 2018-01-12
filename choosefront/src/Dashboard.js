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
  buildTable(){
    var roles = {
    'top': 0,
    'middle': 1,
    'jungle': 2,
    'bottom': 3,
    'support':4,
    }
    var role = roles[this.props.lane]
    var trows = ['kills', 'deaths', 'totalDamageDealtToChampions', 'assists', 'damageDealtToObjectives', 'wardsPlaced','turretKills', 'totalMinionsKilled', 'totalDamageTaken']
    var html = []
    for (var i=0; i<trows.length; i++){
      var num = this.props.stat[this.props.main][trows[i]]['gamesWon'][role]['perGame']
      var den = this.props.stat[this.props.main][trows[i]]['gameTotal'][role]['perGame']
      var ratio = (num/den*100).toFixed(2).toString() +' %'
      var num_op = this.props.stat[this.props.op][trows[i]]['gamesWon'][role]['perGame']
      var den_op = this.props.stat[this.props.op][trows[i]]['gameTotal'][role]['perGame']
      var ratio_op = (num_op/den_op*100).toFixed(2).toString() +' %'
      html.push(
        <Table.Row key={'row' + i.toString()}>
          <Table.Cell>{(this.props.avg[this.props.main][trows[i]]['averageValue'][role]['perGame']).toFixed(2)}</Table.Cell>
          <Table.Cell>{ratio}</Table.Cell>
          <Table.Cell>{trows[i]}</Table.Cell>
          <Table.Cell>{ratio_op}</Table.Cell>
          <Table.Cell>{(this.props.avg[this.props.op][trows[i]]['averageValue'][role]['perGame']).toFixed(2)}</Table.Cell>
        </Table.Row>

      )
    }
    var roles = {
    'top': 0,
    'middle': 1,
    'jungle': 2,
    'bottom': 3,
    'support':4,
    }
    var role = roles[this.props.lane]
    return(
      <Table inverted padded unstackable selectable>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{this.props.main +': ' + (((this.props.stat[this.props.main]['win']['gamesWon'][role]/this.props.stat[this.props.main]['win']['total'][role])*100)).toFixed(2).toString() + '%'}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{this.props.op +': ' + (((this.props.stat[this.props.op]['win']['gamesWon'][role]/this.props.stat[this.props.op]['win']['total'][role])*100)).toFixed(2).toString() + '%'}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Average</Table.HeaderCell>
            <Table.HeaderCell>Win Rate When Above Avg</Table.HeaderCell>
            <Table.HeaderCell>Stat</Table.HeaderCell>
            <Table.HeaderCell>Win Rate When Above Avg</Table.HeaderCell>
            <Table.HeaderCell>Average</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {html}
        </Table.Body>
      </Table>)
  }
  render() {
    var table = this.props.avg && this.buildTable()
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
       {table}
      <div className='op'>
      <Chart
        data = {this.props.data_op}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Key Statistics'
        metric = 'birth'
        id = 'topChart'
      />
      <Chart
        data = {this.props.data_op}
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
  return <div key={label+'tp'} id={id} className='chart'>
      {[
       <div key = {data[0].country} className='label'>{label}</div>,
       <div key={label+'jp'}>
         {barData.map(d =>
          <Bar
            key = {d.country+d.rank}
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
      width: value/1.6+'%',
    }
  }
  >{value + '%'}</div></div>;
}

export default Dashboard
