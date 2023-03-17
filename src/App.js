import React, { Component } from "react";
import ParticlesBg from 'particles-bg'
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = (event) => {
    console.log("Click");
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#EEEEEE" num={200} type="cobweb" bg={true}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        {/* 
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;