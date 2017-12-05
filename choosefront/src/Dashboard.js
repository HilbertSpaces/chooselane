import React, { Component } from 'react';
import './Dashboard.css'
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

    return <div id={this.props.id} className='dashboard'>
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Birth Rate'
        metric = 'birth'
      />
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Win Rate \n  When You Do'
        metric = 'death'
      />
     </div>;
  }
}

function Chart({
  data,
  highlight,
  highlighted,
  label,
  metric
}) {
  const barData = data.sort((a, b) => b[metric] - a[metric])
    .map((d, i) => ({...d,
      rank: i
    }))
  return <div className='chart'>
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
        position: 'absolute',
        top: 30 + 20 * rank,
        transition: 'top .5s'
      }
    } >
    <div className='bar__label'>{country}</div> <
    div className = 'bar__mark'
  style = {
    {
      width: 4 * value,
    }
  }
  /> <
  /div>;
}

export default Dashboard
