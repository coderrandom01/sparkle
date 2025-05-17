import React from 'react'
import LoadingHorse from '../assets/images/horseLoader.gif';
function LoaderHorse() {
  return (
    <div className='h-full w-full flex justify-center items-center absolute inset-0 bg-black bg-opacity-40 z-50'>
      <img className='h-20' src={LoadingHorse} alt='pageLoader-gif'></img>
    </div>
  )
}

export default LoaderHorse