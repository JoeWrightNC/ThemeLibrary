import React, { Component } from 'react';
import MatchCards from '../matchCards';
import paintings from "../../paintings.json";
import "./gameLogicBuild.css";

//putting my game/business logic in this component seperate from App.js
//unlike with class work.  I think that makes sense in case it becomes a component we'd
//later want to drop in on another page passing different data to it.

class GameLogicBuild extends Component {
  state = {
    paintings,
    message: "Click on a painting to start the game",
    score: 0,
    topScore: 0
  };
  
  //Fisher-Yates Shuffle Algorithm for array shuffling
  shuffleAlgorithm = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  //all the game logic lives here
  clickHandler = (id, clicked) => {

    const paintingsArray = this.state.paintings;

    
    //you lose logic
    if (clicked) {
      paintingsArray.forEach((painting, index) => {
        paintingsArray[index].clicked = false;
      });
      return this.setState({
        painting: this.shuffleAlgorithm(paintingsArray),
        message: "Game Over-- You Already Guessed That One!    Click a Painting to start a new round!",
        score: 0
      })
    }
    //good guess logic
    else {
      paintingsArray.forEach((painting, index) => {
        if (id === painting.id) {
          paintingsArray[index].clicked = true;
        }
      });

      //object destructuring to set score and topscore vars
      const { topScore, score } = this.state;
      //increment current score by 1
      const newScore = score + 1;
      //check to see if new current score is greater than current top score, returns value accordingly
      const newTopScore = newScore > topScore ? newScore : topScore;
      if (newTopScore === 12) {
        return this.setState({
          painting: this.shuffleAlgorithm(paintingsArray),
          message: "You Win The Game!  If you want to play some more, Click any painting to start a new game!",
          score: newScore,
          topScore: newTopScore,
        })
      }
      else {
        return this.setState({
          painting: this.shuffleAlgorithm(paintingsArray),
          message: "You Guessed Correctly!  Click the Next One!",
          score: newScore,
          topScore: newTopScore,
        })
      }
    }
  };

  render() {
    return (
      <div className="container-fluid mainCardContainer">
      <div className="gameMessage text-center">
            <p>{this.state.message}</p>
          </div>
          <div className="gameScores text-center">
            <p>Score: {this.state.score} | Top Score: {this.state.topScore}</p>
          </div>
        <div className="container">
          
          <div className="row">
          {this.state.paintings.map(painting => (
            <MatchCards
              key={painting.id}
              id={painting.id}
              name={painting.name}
              clicked={painting.clicked}
              painting={painting.image}
              clickHandler={this.clickHandler}
              />
          ))}
          </div>
          
        </div>
      </div>
    );
  }
};

export default GameLogicBuild
