import React from 'react';
import "./matchCards.css";

const MatchCard = props => (
  <div 
  className="paintingCard col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3" 
  key={props.id}
  onClick={() => props.clickHandler(props.id, props.clicked)}
  >
    <img 
    id={props.name}
    src={props.painting}
    alt={props.name}
    />
  </div>
);

export default MatchCard;