import React from 'react'
import './fader.scss'
import { v4 as uuidv4 } from 'uuid'

const Fader = (props) => {
  return (
    <h5 key={uuidv4()} className='popup'>{props.name}</h5>
  )
}

export default Fader