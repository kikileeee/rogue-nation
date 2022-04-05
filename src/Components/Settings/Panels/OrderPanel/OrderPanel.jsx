import React from 'react'
import './orderPanel.scss'
import {MdShoppingCart} from 'react-icons/md'
import {HiDownload} from 'react-icons/hi'

const OrderPanel = () => {
  return (
    <div className='orderPanel'>
      <div className='Show'>
            <div className='userItem'>
                <b>Order no.</b>
                <b>Order date</b>
                <b>Shipping status</b>
            </div>
            <hr/>
            <div className='userItem'>
                <b className='link'>522000312</b>
                <p>5/4/2022</p>
                <p>Shipping</p>
                <p className='icons'><MdShoppingCart size={30} color={'rgb(73, 155, 255)'}/><HiDownload size={30} color={'rgb(73, 155, 255)'}/></p>
            </div>
            <hr />
            
            </div>
    </div>
  )
}

export default OrderPanel