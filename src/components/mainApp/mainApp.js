import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import paintings from "../../paintings.json";
import "./mainApp.css";
import menuIcon from "../../images/threelines.png";
import $ from 'jquery';
class MainApp extends Component {

  state = {
    paintings,
    message: "Click on any color card copy button to copy the palette, declared as SCSS variables, to your clipboard! ",
    copied: false,
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
  
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  randomizer = () => {
    var min = 0;
    var max = 3;
    var rand =  min + (Math.random() * (max-min));
    return rand
  }
  shufflePalettes = () => {
    const paintingsArray = this.state.paintings;
    return this.setState({
      painting: this.shuffleAlgorithm(paintingsArray),
      message: "Palettes Shuffled Successfully!",
    })
  }

  filterDOM = (filter) => {
    console.log(filter)
    const filterShow = `.${filter}`;
    $(".paletteCard").hide();
    $(filterShow).show()
  }
  
  render() {
    return (
      
      <section>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          <h4>Filter By:</h4>
          <span onClick={() => this.filterDOM("warm")}>Warm Tones</span>
          <span onClick={() => this.filterDOM("cool")}>Cool Tones</span>
          <span onClick={() => this.filterDOM("hued")}>Hued Variants</span>
          <span onClick={() => this.filterDOM("multicolor")}>Multicolor</span>
          <span onClick={() => this.filterDOM("paletteCard")}>Show All</span>
        </div>

        <span onClick={this.openNav} className="collapsedMenu"><img className="menuIcon" src={menuIcon} alt="View Menu" /></span>

        <div id="main">
          <div className="gameMessage text-center">
            <p>{this.state.message}</p>
            <button type="button" className="btn btn-light py-3" onClick={this.shufflePalettes}>Shuffle Palettes</button>
          </div>
          <div className="container">
            
            <div className="row">
            {this.state.paintings.map(palette => (
              <div className={`paletteCard col-10 col-md-6 col-xl-4 my-4 mx-auto ${palette.classList}`} key={palette.id} onClick={this.copyToClipboard}>
                <div className="paletteCardInside">
                  <h5 style={{backgroundImage: "linear-gradient(to right," + palette.colorArr[Math.floor(Math.random()*2)] + ", " + palette.colorArr[Math.floor(Math.random()*2)+2] + ")"}} id={palette.name} className="cardHeader mb-0 py-3">{palette.name}
                    <br/>
                    <CopyToClipboard text={palette.clipBoard}
                      onCopy={() => this.setState({message: 'Palette SCSS Variables Copied to Clipboard'})}>
                      <button className="mt-3 copyBtn">Copy <i className="far fa-clipboard"></i></button>
                    </CopyToClipboard>
                  </h5> 
                  {palette.colorArr.map(color => {
                    const colorBarStyle = {backgroundColor: color};
                    return <div className="colorBar" style={colorBarStyle} key={color}><p className="colorText px-2">{color}</p></div>
                  })}
                </div>
              </div>
            ))}
            </div>
            
          </div>
        </div>
      </section>
    );
  }
};

export default MainApp