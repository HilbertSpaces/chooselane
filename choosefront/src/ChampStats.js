import React, { Component } from 'react';
import './ChampStats.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import Home from './Map'
import Dashboard from './Dashboard'
import {Dropdown, Table} from 'semantic-ui-react'
import axios from 'axios';
class ChampStats extends React.Component{
  constructor(props) {
    super();
    this.state = {data: false,
      tier: false,
      lane: false,
      league: false,
      champion: false,
      currentValues:false,
      loading: true};
    this.buildStats = this.buildStats.bind(this);
  }
  getInitialState() {
      return { mounted: false };
    }
    componentDidMount() {
    }
    componentWillMount() {
      const { match: {params} } = this.props;
      this.setState({loading:true})
      axios.get(`http://localhost:8000/api/v1/data/${params.league}/stat/`)
        .then(response => {
          this.setState({ data: JSON.parse(response.data).data,
            tier: response.data.tier,
            lane: params.lane,
            league: params.league,
            champion: params.champion,
            loading: false,
            mounted: true ,
          }, this.buildStats)});
    }
  dropChange = (e, { value }) => this.setState({ currentValues: value })
  buildStats(){
    const data = this.state.data;
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4};
    var stats = ['firstTowerKill','firstTowerAssist','firstInhibitorKill','firstBloodKill','firstBloodAssist']
    var statts = ['firstTowerKill','firstTowerAsst','firstInhibKill','firstBloodKill','firstBloodAsst']
    const champion = this.state.champion;
    const stat_list = []
    for (var i=0; i<=stats.length; i++) {
      if (data[champion].hasOwnProperty(stats[i])) {
        const key_stat = (data[champion][stats[i]]['gameTotal'][roles[this.state.lane]]/data[champion][stats[i]]['total'][roles[this.state.lane]]*100).toFixed(2)
        const win_stat = (data[champion][stats[i]]['gamesWon'][roles[this.state.lane]]/data[champion][stats[i]]['gameTotal'][roles[this.state.lane]]*100).toFixed(2)
        if (isNaN(key_stat) || isNaN(win_stat)){
          continue
        }
            stat_list.push(
              {
                country:statts[i],
                birth: key_stat,
                death: win_stat
              })
          }
    }
    console.log(this.state.data)
    return stat_list
  }
  render(){
    const champ_list = this.state.data && this.state && Object.keys(this.state.data)
    var stat_list = this.state.data && this.buildStats()
    console.log(stat_list)


 const options = [
   { value: 'all', text: 'All',image: {avatar:true, src:'http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +'Ezreal' + '.png'} },
   { value: 'Ezreal', text: 'Ezreal',image: {avatar:true, src:'http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +'Ezreal' + '.png'} },
 ]

    const currentValues = this.state.currentValues
    const champ =
      <div className='full'>
        <img className='champimg' src={
        'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
        this.state.champion + '_1.jpg'}>
        </img>
        <div className='dropdown'>
        <Dropdown fluid color='black' value={currentValues} onChange={this.dropChange} placeholder='Select...' selection scrolling search options={options}/>
        </div>
          <Dashboard id='main' data={this.state.data && stat_list.slice(0,5)} />
          <img id='left' className='vs' src={
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
          this.state.champion + '_0.jpg'}></img>
          <img id='right' className='vs' src={
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
          'Ezreal_9' + '.jpg'}></img>
      </div>
      const trans = this.state.mounted ?
        <div  key={3} className='champ'>{champ}</div>: null;
      const trans1 = this.state.mounted ?
        <div  key={4} className='mapT'></div>: null;
    return(
      <div>
      <ReactCSSTransitionGroup
        transitionName="mapT"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {trans1}
        {console.log(this.state.currentValues)}
      </ReactCSSTransitionGroup>
      <ReactCSSTransitionGroup
        transitionName="champIn"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {trans}
      </ReactCSSTransitionGroup>
      </div>
  )}
}

export default ChampStats;
