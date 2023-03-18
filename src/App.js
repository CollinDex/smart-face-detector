import React, { Component } from "react";
import ParticlesBg from 'particles-bg';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css';

// Setup Clarifai AI API Request
const returnClarifaiJSONRequest = (imageUrl)=> {
  const PAT = 'd21bdbf49c9e43df884a8d1202f2aad3';
  const USER_ID = 'coeedex';       
  const APP_ID = 'smart-face-detector';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state= { //Create a state for the text-box input and image-link sent to the API
      input: '',
      imageUrl: '',
      faceCount: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //Set state for the text input
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); //Set stata for the image-link sent to the API

    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiJSONRequest(this.state.input))
    .then(response => response.json())
    .then(response => {
      this.setState({faceCount: response.outputs[0].data.regions.length}); //Sets the No of Detected Faces 
      this.calculateFaceLocation(response); //Calls the FaceLoocation Calculator

      /* if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })

        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
      } */
    })
    .catch(err => console.log(err));
  }

  render() { //Render App Components
    return (
      <div className="App">
        <ParticlesBg color="#EEEEEE" num={150} type="cobweb" bg={true}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
          faceCount={`Detected ${this.state.faceCount} Face(s)`}
        />
      </div>
    );
  }
}

export default App;
