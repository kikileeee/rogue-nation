import React, { useEffect, useState } from 'react'
import './orderPanel.scss'
import { MdShoppingCart } from 'react-icons/md'
import { HiDownload } from 'react-icons/hi'
import Modal from './Modal/Modal'
import { FaHistory } from 'react-icons/fa'

const OrderPanel = () => {
  const [user, setUser] = useState('Guest')
  const [order, setOrder] = useState([])
  const [modal, setModal] = useState()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
      setUser(JSON.parse(localStorage.getItem('userInfo')).username)
    }
    else {
      setUser('Guest')
    }
  }, [])

  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'https://api-react-stop.herokuapp.com/'

  useEffect(() => {
    if (user !== 'Guest') {
      fetch(`${ip}users/order/${user}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json().then(data => {
        setOrder(data)
      }))

    }
  }, [user])

  function modalFunc(x) {
    setModal(<Modal products={x} setModal={setModal} />)
  }
  if (order.length > 0) {
    return <div className='orderPanel'>
      <div className='Show'>
        <div className='userItem'>
          <b>Order no.</b>
          <b>Order date</b>
          <b>Shipping status</b>
        </div>
        {order.map(e => {
          return <div className='userItem' key={e[0].orderNUMBER}>
            <b className='link'>{e[0].orderNUMBER}</b>
            <p>{e[0].orderDATE}</p>
            <p>{e[0].shippingSTATUS}</p>
            <p className='icons'>
              <MdShoppingCart size={30} onClick={() => modalFunc(e)} color={'rgb(73, 155, 255)'} />
              <a href={`receipt${e[0].orderNUMBER}`} download>
                <HiDownload size={30} color={'rgb(73, 155, 255)'} />
              </a>
            </p>
          </div>

        }
        )}
      </div>
      {modal}
    </div>
  } else {
    // If there is no order history
    return <div className='orderPanel'>
      <div className='noOrders'>
        <FaHistory size={50} />
        <h3>There are currently no order history to preview, make an order to preview it</h3>
      </div>
    </div>
  }
}

export default OrderPanel