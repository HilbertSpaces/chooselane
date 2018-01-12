import React from 'react';
import './Champs.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Champs extends React.Component {
  constructor(props) {
    super();
    this.state = {items: ['Aatrox','Ahri','Akali','Alistar','Amumu','Anivia','Annie','Ashe','Aurelion Sol','Azir','Bard','Blitzcrank','Brand','Braum','Caitlyn','Camille','Cassiopeia',"Cho'Gath",'Corki','Darius','Diana','Dr. Mundo','Draven','Ekko',
    'Elise','Evelynn','Ezreal','Fiddlesticks','Fiora','Fizz','Galio','Gangplank','Garen','Gnar','Gragas','Graves','Hecarim','Heimerdinger','Illaoi','Ivern','Irelia','Janna','Jarvan IV','Jax','Jayce','Jhin','Jinx','Kalista','Karma',
    'Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen',"Kha'Zix",
    'Kindred','Kled',"Kog'Maw",'LeBlanc','Lee Sin','Leona','Lissandra','Lucian','Lulu','Lux','Malphite','Malzahar','Maokai','Master Yi','Miss Fortune','Mordekaiser','Morgana','Nami','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf',
    'Orianna','Ornn','Pantheon','Poppy','Quinn','Rakan','Rammus',"Rek'Sai",'Renekton','Rengar','Riven','Rumble','Ryze','Sejuani','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Syndra',
    'Tahm Kench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','Twisted Fate','Twitch','Udyr','Urgot','Varus','Vayne','Veigar',"Vel'Koz",'Vi','Viktor',
    'Vladimir','Volibear','Warwick','Wukong','Xayah','Xerath','Xin Zhao','Yasuo','Yorick','Zac','Zed','Ziggs','Zilean','Zoe','Zyra'
  ], lane: false, data: false, tier:'',loading:false, mounted:false};
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
    const items = this.state.items && Object.keys(this.state.data)
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
          src={'http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +
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
