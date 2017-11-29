import React, { Component } from 'react';
import './App.css';
import { Transition } from 'react-transition-group/Transition'
import Anime from 'react-anime'

var myChamps = ['Aatrox','Ahri','Akali','Alistar','Amumu','Anivia','Annie','Ashe','AurelionSol','Azir','Bard','Blitzcrank','Brand','Braum','Caitlyn','Camille','Cassiopeia','Chogath','Corki','Darius','Diana','DrMundo','Draven','Ekko',
'Elise','Evelynn','Ezreal','Fiddlesticks','Fiora','Fizz','Galio','Gangplank','Garen','Gnar','Gragas','Graves','Hecarim','Heimerdinger','Illaoi','Ivern','Irelia','Janna','JarvanIV','Jax','Jayce','Jhin','Jinx','Kalista','Karma',
'Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen','Khazix',
'Kindred','Kled','KogMaw','Leblanc','LeeSin','Leona','Lissandra','Lucian','Lulu','Lux','Malphite','Malzahar','Maokai','MasterYi','MissFortune','Mordekaiser','Morgana','Nami','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf',
'Orianna','Ornn','Pantheon','Poppy','Quinn','Rakan','Rammus','RekSai','Renekton','Rengar','Riven','Rumble','Ryze','Sejuani','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Syndra',
'TahmKench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','TwistedFate','Twitch','Udyr','Urgot','Varus','Vayne','Veigar','Velkoz','Vi','Viktor',
'Vladimir','Volibear','Warwick','MonkeyKing','Xayah','Xerath','XinZhao','Yasuo','Yorick','Zac','Zed','Ziggs','Zilean','Zyra'
]
class Champ extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="grid">
          <div className="image">
          {myChamps.map((name) => (
            <img className='champselect' src={'http://ddragon.leagueoflegends.com/cdn/7.21.1/img/champion/' + name + '.png'}></img>
          ))}
          </div>
        </div>
    )
  }
}

class ChampGrid extends Component {
  render() {
    return (
      <div>
        <Champ />
        <Anime opacity={[0, 1]} translateY={'2em'} delay={(e, i) => i * 2000}>
       <h1>Select Your Champion</h1>
  <section>
  </section>
</Anime>
</div>
    )
  }
}
export default ChampGrid;
