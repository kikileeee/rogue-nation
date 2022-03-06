import React, { useState } from 'react'
import Footer from '../Homepage/Footer/Footer'
import Navbar from '../Homepage/Navbar/Navbar'
import './cart.scss'
import CartCheckout from './CartCheckout/CartCheckout'
import CartShowcase from './CartShowcase/CartShowcase'

const Cart = (props) => {

  let items = JSON.parse(localStorage.getItem('cart')) || []
  const [totalPriceState, setTotalPriceState] = useState(items)


  return (
    <div className='componentCart'>
      <Navbar cartNumber={props.cartNumber} />
      <div className='container'>
        <CartShowcase setTotalPrice={setTotalPriceState} setCartNumber={props.setCartNumber} />
        <CartCheckout totalPrice={totalPriceState} />
      </div>
      <Footer/>
    </div>
  )
}

export default Cart