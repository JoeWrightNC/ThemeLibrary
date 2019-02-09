import React from 'react';
import GameLogicBuild from "./components/gameLogicBuild";
import Jumbotron from "./components/jumbotron";

const App = () => (
  <div className="container-fluid mainContainer">
    <Jumbotron />
    <GameLogicBuild /> 
  </div>
);

export default App;