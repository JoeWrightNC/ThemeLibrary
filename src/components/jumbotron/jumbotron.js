
import React from 'react';
import "./jumbotron.css";


const Jumbotron = () => (
<div className="jumbotron jumbotron-fluid">
  <div className="container titleWrapper">
    <h1 className="display-4">Jackson Pollock Memory Game!</h1>
    <p className="lead">Click on the painting to get a point.  The catch: don't click on the same painting twice before getting all the way to 12 or the game resets!</p>
  </div>
</div>
);
export default Jumbotron;