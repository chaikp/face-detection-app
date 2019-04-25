import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  
  if(isSignedIn){
    return (
      <nav>
        <p>
        <span onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</span>
        </p>
      </nav>
    )
  } else {
    return(
      <div>
        <nav>
          <p>
          <span onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</span>
          <span onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</span>
          </p>
        </nav>
      </div>
    )
  }
  
}

export default Navigation;