import React, { Component } from 'react';
import './Champs.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Champs extends React.Component {
  constructor(props) {
    super();
    this.state = {items: ['Aatrox','Ahri','Akali','Alistar','Amumu','Anivia','Annie','Ashe','AurelionSol','Azir','Bard','Blitzcrank','Brand','Braum','Caitlyn','Camille','Cassiopeia','Chogath','Corki','Darius','Diana','DrMundo','Draven','Ekko',
    'Elise','Evelynn','Ezreal','Fiddlesticks','Fiora','Fizz','Galio','Gangplank','Garen','Gnar','Gragas','Graves','Hecarim','Heimerdinger','Illaoi','Ivern','Irelia','Janna','JarvanIV','Jax','Jayce','Jhin','Jinx','Kalista','Karma',
    'Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen','Khazix',
    'Kindred','Kled','KogMaw','Leblanc','LeeSin','Leona','Lissandra','Lucian','Lulu','Lux','Malphite','Malzahar','Maokai','MasterYi','MissFortune','Mordekaiser','Morgana','Nami','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf',
    'Orianna','Ornn','Pantheon','Poppy','Quinn','Rakan','Rammus','RekSai','Renekton','Rengar','Riven','Rumble','Ryze','Sejuani','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Syndra',
    'TahmKench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','TwistedFate','Twitch','Udyr','Urgot','Varus','Vayne','Veigar','Velkoz','Vi','Viktor',
    'Vladimir','Volibear','Warwick','MonkeyKing','Xayah','Xerath','XinZhao','Yasuo','Yorick','Zac','Zed','Ziggs','Zilean','Zoe','Zyra'
  ], data:{}};

  }
  getInitialState() {
      return { mounted: false };
    }
    componentDidMount() {
      this.setState({ mounted: true });

  }
  componentWillMount() {
    const { match: {params} } = this.props;
    axios.get(`http://localhost:8000/api/v1/data/${params.league}/avg/?format=json`).then((response)=>{
        console.log(response.data)
        this.setState({
          data:response.data
      });
  })
  }
  render() {
    const clean_data = {this.state.data.tier}
    const champs = this.state.items.map((champ, i) => (
    <Link key={champ} className='lanes' id={champ} to={'/statistics'}>
      <div className='cham' key={champ}>
        <img className='champs'
          src={'http://ddragon.leagueoflegends.com/cdn/7.23.1/img/champion/' +
          champ + '.png'}></img>
        <div className='name'>{champ}</div>
        <div className='win_rate'>{clean_data[champ]['win']}</div>
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
        </ReactCSSTransitionGroup>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}
export default Champs;
