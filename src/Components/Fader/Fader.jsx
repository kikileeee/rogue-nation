import React from 'react'
import './fader.scss'
import { v4 as uuidv4 } from 'uuid'

const Fader = (props) => {
  if (props.type == 'success') {
    return (
      <h5 key={uuidv4()} className='popup'>{props.name}</h5>
    )
  }
  else {
    return (
      <h5 key={uuidv4()} className='danger'>{props.name}</h5>
    )
  }
}

export default Fader