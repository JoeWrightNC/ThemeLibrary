
import React from 'react';
import "./jumbotron.css";
import logo from "../../images/logo_transparent.png"

const Jumbotron = () => (
<section>
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-4 mx-auto">
        <img className="logoMain" src={logo} alt="Palettely"></img>
      </div>
    </div>
  </div>
</section>

);
export default Jumbotron;