import React, { Component } from 'react';
import Particles from 'react-particles-js';
import clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import './App.css';

const app = new clarifai.App({apiKey: 'd422c1b799d34b098c55500cff13d929'})

const particlesOptions = {
  "particles": {
    "number": {
      "value": 150,
      "density": {
        "enabled" : false
      }
    },
    "size": {
      "value": 3
    }
  }
}

class App extends Component {
  constructor (){
    super()
    this.state = {
      input: 'https://samples.clarifai.com/face-det.jpg',
      imgURL: 'https://samples.clarifai.com/face-det.jpg',
      clarifaiFaces: [],
      route: 'home',
      isSignedIn: true
    }
  }

  calculateFaceLocation = (data) => {
    const bounding_boxes = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box
    })

    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFaces = bounding_boxes.map(bounding_box => {
      return {
        topRow: (bounding_box.top_row * height),
        bottomRow: (1 - bounding_box.bottom_row ) * height,
        leftCol: (bounding_box.left_col * width),
        rightCol: (1 - bounding_box.right_col) * width,
      }
    })
    
    this.setState({clarifaiFaces: clarifaiFaces})
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    
    this.setState({
      imgURL: this.state.input,
      clarifaiFaces: []
    })

    app.models.predict(clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    switch(route) {
      case 'signout':
        this.setState({isSignedIn: false})
        break
      case 'home':
        this.setState({isSignedIn: true})
        break;
      default:
        break;
    }
    
    this.setState({route: route})
  }

  render() {
    const {input, imgURL, clarifaiFaces, route, isSignedIn} = this.state
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div id='header' className='mt2 ml3 mr3' style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        </div>
        { 
          route === 'home' 
          ? <div>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} linkValue={input} />
              <FaceRecognition imgURL={imgURL} bounding_boxes={clarifaiFaces} />
              <div id="spacer" className="center ma cf" style={{height: '100px'}}></div>
            </div>
          : 
          (
            route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange} />   
            : <Register onRouteChange={this.onRouteChange} />
          )
        }      
        <div className="fixed bg-black footer bottom-0 left-0 right-0">
          <p className="white">
            Created using <a href="https://reactjs.org/">ReactJS</a>, {" "}  
            <a href="https://nodejs.org/en/">NodeJS</a>, and Face Detection API by
            <a href="https://clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection"> Clarifai </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
