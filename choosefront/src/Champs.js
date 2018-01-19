import React from 'react';
import './Champs.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Champs extends React.Component {
  constructor(props) {
    super();
    this.state = {lane: false, data: false, tier:'',loading:false, mounted:false};
  }
componentWillMount() {
  const { match: {params} } = this.props;
  this.setState({loading:true})
  /*axios.get(`http://localhost:8000/api/v1/data/${params.league}/stat/`)*/
  axios.get(`/api/v1/data/${params.league}/stat/`)
    .then(response => {
      this.setState({ data: JSON.parse(response.data).data,
        tier: response.data.tier,
        lane: params.lane,
        league: params.league,
        loading: false,
        mounted:true,
      }, this.fixName, this.adjustList)});
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

  adjustList() {
    var data = this.state.data && this.state.data
    const mappr = []
    for (var key in data){
      if (data.hasOwnProperty(key)) {
        mappr.push(this.fixName(key))
      }
    }
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4}
    var lst = []
    const items = this.state.data && Object.keys(this.state.data)
    this.state.data && items.sort((champ1,champ2) => {
      return data[champ1]['win']['gamesWon'][roles[this.state.lane]]/data[champ1]['win']['total'][roles[this.state.lane]]-
        data[champ2]['win']['gamesWon'][roles[this.state.lane]]/data[champ2]['win']['total'][roles[this.state.lane]]
    })
    for (var i=0; i<mappr.length; i++){
      const num = this.state.data && this.state.data[items[i]]['goldEarned']['total'][roles[this.state.lane]]
      const den = this.state.data && this.state.data[items[i]]['sampleSize']
      if (num/den > .32){
        lst.push(items[i]);
      }
    }
    return lst.reverse()
  }
  render() {
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4}
    this.adjustList.bind(this)
    const lst = this.adjustList()
    const champs = this.state && this.state.data && lst.map((champ, i) => (
    <Link key={champ} className='lanes' id={champ} to={'/statistics/' + this.state.league +'/' +this.state.lane + '/'+ this.fixName(champ)}>
      <div className='cham' key={champ}>
        <img className='champs'
          alt={champ}
          src={'https://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +
          this.fixName(champ) + '.png'}></img>
        <div className='name'>{champ}</div>
        <div key={champ+'wr'} className='win_rate'>{(((this.state.data[champ]['win']['gamesWon'][roles[this.state.lane]]/this.state.data[champ]['win']['total'][roles[this.state.lane]])*100)).toFixed(2).toString() + '%'}</div>
      </div>
      </Link>
    ));
    const trans = this.state.mounted ?
      <div className='container'>{champs}

      </div>: null;
    return (
      <ReactCSSTransitionGroup
        transitionName="champOut"
        transitionEnterTimeout={900}
        transitionLeaveTimeout={1000}>
      <div className='filler'>
      <a href="http://www.kqzyfj.com/click-8539027-13131866" target="_top">
      <img src="http://www.ftjcfx.com/image-8539027-13131866" width="300" height="50" alt="Fiverr" border="0"/></a>
      <iframe className='aff' src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=14&l=ur1&category=hotnewreleases&banner=1BWCMZYQA5F2PESPW182&f=ifr&linkID=c78b6f22be526635daaf8bb33ee8eb05&t=clevels-20&tracking_id=clevels-20" width="160" height="600" scrolling="no" border="0" marginwidth="0" frameborder="0"></iframe>
      <iframe className='affr' src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=14&l=ur1&category=twitchprime&banner=1KQ611VSFHHQ71PJKR82&f=ifr&linkID=35199a016c974221b3f63d9142043b6f&t=clevels-20&tracking_id=clevels-20" width="160" height="600" scrolling="no" border="0" marginwidth="0" frameborder="0"></iframe>

        <ReactCSSTransitionGroup
          transitionName="champT"
          transitionEnterTimeout={900}
          transitionLeaveTimeout={900}>
          {trans}
        </ReactCSSTransitionGroup>
        <p className='legal'>
          LaneSeven is not endorsed, certified or otherwise approved in any way by Riot Games, Inc. or any of its affiliates
        </p>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}
export default Champs;
