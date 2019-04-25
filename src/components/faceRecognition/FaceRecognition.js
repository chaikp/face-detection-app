import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgURL, bounding_boxes }) => {

  const display_boxes = bounding_boxes.map(bounding_box => {
    const { topRow, leftCol, bottomRow, rightCol } = bounding_box
    
    return <div className='bluebox' style={{top: topRow, left: leftCol, bottom: bottomRow, right: rightCol}}></div>
  })

  return (
    <div className='center ma'>
      <div className='absolute mt2 mb6'>
        <img id='inputImage' src={imgURL === null ? '' : imgURL} alt='' width='500px' height='auto' />
        {display_boxes}
      </div>
    </div>
  )
}

export default FaceRecognition;