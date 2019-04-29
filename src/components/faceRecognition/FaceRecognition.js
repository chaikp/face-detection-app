import React from 'react';
import './FaceRecognition.css';
import loadingGif from './loading.gif'

const FaceRecognition = ({ imgURL, bounding_boxes, isLoading }) => {

  const display_boxes = bounding_boxes.map(bounding_box => {
    const { topRow, leftCol, bottomRow, rightCol } = bounding_box
    
    return <div className='bluebox' style={{top: topRow, left: leftCol, bottom: bottomRow, right: rightCol}}></div>
  })

  const loading =  isLoading ? 
    (
      <div className="loading" style={{top:0, left:0, bottom: 0, right: 0}} >
        <img className='center mt3' src={loadingGif} alt='loading' />
      </div>
    )
    :
    <div></div>

  return (
    <div className='center ma'>
      <div className='absolute mt2 mb6'>
        {loading}
        <img id='inputImage' src={imgURL === null ? '' : imgURL} alt='' width='500px' height='auto' />
        {display_boxes}
      </div>
    </div>
  )
}

export default FaceRecognition;