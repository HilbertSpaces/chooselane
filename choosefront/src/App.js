import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  ChampGrid  from './Champs';
import Map from './Map'
import TransitionGroup from "react-transition-group/TransitionGroup";

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        {/*
          <Route exact path="/" render={() => <Map /> } />
          <Route path="/champions" render={ () => <ChampGrid className="junk"/> } />
        */}
        <Route exact path="/" children={({ match, ...rest }) => (
          <TransitionGroup component={firstChild}>
          {match && <Map {...rest} />}
          </TransitionGroup>
       )}/>
       <Route path="/champions"  children={({ match, ...rest }) => (
         <TransitionGroup component={firstChild}>
           {match && <ChampGrid {...rest} />}
         </TransitionGroup>
        )}/>
        </div>
     </BrowserRouter>
    )
  }
}

export default App;
