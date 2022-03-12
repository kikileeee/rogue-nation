import React from 'react'
import './commercial.scss'
import video from '../../video/com.mp4'

const Commercial = () => {
  return (
    <div className='commercial'>
        <video autoPlay loop muted src={video}></video> 
        <h1>UNRESTRICTED MOVEMENT</h1>
        <a href="/products">SHOP NOW</a>
    </div>
  )
}

export default Commercial