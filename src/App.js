import React, { Component } from "react";
import ParticlesBg from 'particles-bg';
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css';

const initialState= {
  input: '',
  imageUrl: '',
  faceCount: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
    
  }
}

class App extends Component {
  constructor() {
    super();
    this.state= { //Create a state for the text-box input and image-link sent to the API
      input: '',
      imageUrl: '',
      faceCount: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
        
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //Set state for the text input
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); //Set stata for the image-link sent to the API
    fetch('https://smart-face-detect-api-b5t8.onrender.com', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://smart-face-detect-api-b5t8.onrender.com', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }));
        })
      }
      this.setState({faceCount: response.outputs[0].data.regions.length}); //Sets the No of Detected Faces 
      this.displayFaceBox(this.calculateFaceLocation(response)); //Calls the FaceLocation Calculator
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() { //Render App Components
    const {isSignedIn, imageUrl, route, box, faceCount } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#EEEEEE" num={150} type="cobweb" bg={true}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank
              name={this.state.user.name} 
              entries={this.state.user.entries} 
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={box}
                imageUrl={imageUrl}
                faceCount={`Detected ${faceCount} Face(s)`}
              />
            </div>
          : (
            route === 'signin'
            ? <SignIn
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange}/>
            : <Register
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange}/>
          )             
        }        
      </div>
    );
  }
}

export default App;
