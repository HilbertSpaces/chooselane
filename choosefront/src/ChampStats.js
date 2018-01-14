import React from 'react';
import './ChampStats.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dashboard from './Dashboard'
import {Dropdown} from 'semantic-ui-react'
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
      axios.get(`/api/v1/data/${params.league}/stat/`)
        .then(response => {
          this.setState({ data: JSON.parse(response.data).data,
            tier: response.data.tier,
            lane: params.lane,
            league: params.league,
            champion: params.champion,
            loading: false,
            currentValues:params.champion,
            mounted: true ,
          }, this.adjustList, this.buildStats)});
      axios.get(`/api/v1/data/${params.league}/avg/`)
        .then(response => {
          this.setState({
            avg: JSON.parse(response.data).data}, this.adjustList, this.buildStats
          )});
    }
  dropChange = (e, { value }) => this.setState({ currentValues: value })
  buildStats(champion){
    const data = this.state.data;
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4};
    var stats = ['firstTowerKill','firstTowerAssist','firstInhibitorKill','firstBloodKill','firstBloodAssist']
    var statts = ['firstTowerKill','firstTowerAsst','firstInhibKill','firstBloodKill','firstBloodAsst']
    const stat_list = []
    for (var i=0; i<=stats.length; i++) {
      if (data[this.unfixName(champion)].hasOwnProperty(stats[i])) {
        const key_stat = (data[this.unfixName(champion)][stats[i]]['gameTotal'][roles[this.state.lane]]/data[this.unfixName(champion)][stats[i]]['total'][roles[this.state.lane]]*100).toFixed(2)
        const win_stat = (data[this.unfixName(champion)][stats[i]]['gamesWon'][roles[this.state.lane]]/data[this.unfixName(champion)][stats[i]]['gameTotal'][roles[this.state.lane]]*100).toFixed(2)
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
    return stat_list
  }
  fixName(name) {
    if (name==="Vel'Koz"){
      return "Velkoz"
    }
    if (name==="Aurelion Sol"){
      return "AurelionSol"
    }
    if (name==="Cho'Gath"){
      return "Chogath"
    }
    if (name==="Dr. Mundo"){
      return "DrMundo"
    }
    if (name==="Jarvan IV"){
      return "JarvanIV"
    }
    if (name==="Kha'Zix"){
      return "Khazix"
    }
    if (name==="Kog'Maw"){
      return "KogMaw"
    }
    if (name==="LeBlanc"){
      return "Leblanc"
    }
    if (name==="Lee Sin"){
      return "LeeSin"
    }
    if (name==="Master Yi"){
      return "MasterYi"
    }
    if (name==="Miss Fortune"){
      return "MissFortune"
    }
    if (name==="Rek'Sai"){
      return "RekSai"
    }
    if (name==="Tahm Kench"){
      return "TahmKench"
    }
    if (name==="Twisted Fate"){
      return "TwistedFate"
    }
    if (name==="Wukong"){
      return "MonkeyKing"
    }
    if (name==="Xin Zhao"){
      return "XinZhao"
    }
    else {
      return name
    }
  }
  unfixName(name) {
    if (name==="Velkoz"){
      return "Vel'Koz"
    }
    if (name==="AurelionSol"){
      return "Aurelion Sol"
    }
    if (name==="Chogath"){
      return "Cho'Gath"
    }
    if (name==="DrMundo"){
      return "Dr. Mundo"
    }
    if (name==="JarvanIV"){
      return "Jarvan IV"
    }
    if (name==="Khazix"){
      return "Kha'Zix"
    }
    if (name==="KogMaw"){
      return "Kog'Maw"
    }
    if (name==="Leblanc"){
      return "LeBlanc"
    }
    if (name==="LeeSin"){
      return "Lee Sin"
    }
    if (name==="MasterYi"){
      return "Master Yi"
    }
    if (name==="MissFortune"){
      return "Miss Fortune"
    }
    if (name==="RekSai"){
      return "Rek'Sai"
    }
    if (name==="TahmKench"){
      return "Tahm Kench"
    }
    if (name==="TwistedFate"){
      return "Twisted Fate"
    }
    if (name==="MonkeyKing"){
      return "Wukong"
    }
    if (name==="XinZhao"){
      return "Xin Zhao"
    }
    else {
      return name
    }
  }
  adjustList() {
    var data = this.state.data && this.state.data
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4}
    var lst = []
    const items = this.state.data && Object.keys(this.state.data)
    this.state.data && items.sort((champ1,champ2) => {
      return data[champ1]['win']['gamesWon'][roles[this.state.lane]]/data[champ1]['win']['total'][roles[this.state.lane]]-
        data[champ2]['win']['gamesWon'][roles[this.state.lane]]/data[champ2]['win']['total'][roles[this.state.lane]]
    })
    for (var i=0; i<items.length; i++){
      const num = this.state.data && this.state.data[items[i]]['goldEarned']['total'][roles[this.state.lane]]
      const den = this.state.data && this.state.data[items[i]]['sampleSize']
      if (num/den > .32){
        lst.push(items[i]);
      }
    }
    return lst.reverse()
  }

  render(){
    const champ_list = this.state.data && this.adjustList()
    var stat_list = this.state.data && this.buildStats(this.state.champion)
    var stat_list_op = this.state.data && this.buildStats(this.state.currentValues)
    const options = []
   for(var i=0;i<champ_list.length;i++){
     options.push({ value: champ_list[i], text: champ_list[i],
     image: {avatar:true, src:'https://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +this.fixName(champ_list[i]) + '.png'}
   })
   }

    const avg = this.state.avg && this.state.avg
    const champ =
      <div className='full'>
        <img alt='main' className='champimg' src={
        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
        this.state.champion + '_1.jpg'}>
        </img>
        <div className='dropdwn'>
        <Dropdown onChange={this.dropChange} selection fluid options={options}/>
        </div>
          <Dashboard main = {this.unfixName(this.state.champion)} lane={this.state.lane} stat={this.state.data} avg={avg} op={this.unfixName(this.state.currentValues)} id='main' data={this.state.data && stat_list.slice(0,5)} data_op={this.state.data && stat_list_op.slice(0,5)}/>
          <img alt='main' id='main' className='vs' src={
          'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
          this.state.champion + '_0.jpg'}></img>
          <img alt='opponent' id='right' className='vs' src={
          'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
          this.fixName(this.state.currentValues) + '_0.jpg'}></img>
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
      </ReactCSSTransitionGroup>
      <ReactCSSTransitionGroup
        transitionName="champIn"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {trans}
        <p className='legal'>LaneSeven is not endorsed, certified or otherwise approved in any way by Riot Games, Inc. or any of its affiliates</p>
      </ReactCSSTransitionGroup>
      </div>
  )}
}

export default ChampStats;
