import React from 'react';
import './Champs.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Champs extends React.Component {
  constructor(props) {
    super();
    this.state = {items: ['Aatrox','Ahri','Akali'/*,'Alistar','Amumu','Anivia','Annie','Ashe','AurelionSol','Azir','Bard','Blitzcrank','Brand','Braum','Caitlyn','Camille','Cassiopeia','Chogath','Corki','Darius','Diana','DrMundo','Draven','Ekko',
    'Elise','Evelynn','Ezreal','Fiddlesticks','Fiora','Fizz','Galio','Gangplank','Garen','Gnar','Gragas','Graves','Hecarim','Heimerdinger','Illaoi','Ivern','Irelia','Janna','JarvanIV','Jax','Jayce','Jhin','Jinx','Kalista','Karma',
    'Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen','Khazix',
    'Kindred','Kled','KogMaw','Leblanc','LeeSin','Leona','Lissandra','Lucian','Lulu','Lux','Malphite','Malzahar','Maokai','MasterYi','MissFortune','Mordekaiser','Morgana','Nami','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf',
    'Orianna','Ornn','Pantheon','Poppy','Quinn','Rakan','Rammus','RekSai','Renekton','Rengar','Riven','Rumble','Ryze','Sejuani','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Syndra',
    'TahmKench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','TwistedFate','Twitch','Udyr','Urgot','Varus','Vayne','Veigar','Velkoz','Vi','Viktor',
    'Vladimir','Volibear','Warwick','MonkeyKing','Xayah','Xerath','XinZhao','Yasuo','Yorick','Zac','Zed','Ziggs','Zilean','Zoe','Zyra'*/
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
      })});
}


  render() {
    const roles = {'top':0,'middle':1,'jungle':2,'bottom':3,'support':4}
    const champs = this.state && this.state.data && this.state.items.map((champ, i) => (
    <Link key={champ} className='lanes' id={champ} to={'/statistics/' + this.state.league +'/' +this.state.lane + '/'+ champ}>
      <div className='cham' key={champ}>
        <img className='champs'
          alt={champ}
          src={'http://ddragon.leagueoflegends.com/cdn/7.24.2/img/champion/' +
          champ + '.png'}></img>
        <div className='name'>{champ}</div>
        <div key={champ+'wr'} className='win_rate'>{Math.floor((this.state.data['Ahri']['win']['gamesWon'][roles[this.state.lane]]/this.state.data['Ahri']['win']['total'][1  ])*100).toString() + '%'}</div>
      </div>
      </Link>
    ));
    const trans = this.state.mounted ?
      <div className='container'>{champs}</div>: null;
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
          {this.state.lane && console.log(this.state.lane)}
        </ReactCSSTransitionGroup>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}
export default Champs;
