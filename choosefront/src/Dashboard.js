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

    return <div className='dashboard'>
    <div className='op'>
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Birth Rate'
        metric = 'birth'
        id = 'topChart'
      />
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Win Rate \n  When You Do'
        metric = 'death'
        id='botChart'
      />
      </div>
      <div className='main'>
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Birth Rate'
        metric = 'birth'
        id = 'topChart'
      />
      <Chart
        data = {data}
        highlight = {this.highlight}
        highlighted = {highlighted}
        label = 'Win Rate \n  When You Do'
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
        position: 'absolute',
        top: 6+ 6*rank+'%',
        transition: 'top .5s'
      }
    } >
    <div className='bar__label'>{country}</div> <
    div className = 'bar__mark'
  style = {
    {
      width: value*1.2+'%',
    }
  }
  >{value}</div></div>;
}

export default Dashboard
