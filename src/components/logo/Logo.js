import React from 'react';
import Tilt from 'react-tilt';
import logo from './facerecog.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma2 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max: 50 }} style={{ height: 150, width: 150}}>
        <div className="Tilt-inner pa3"> <img alt='logo' src={logo} /> </div>
      </Tilt>
    </div>
  )
}

export default Logo;