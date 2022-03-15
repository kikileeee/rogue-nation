import React, { useState, useEffect } from 'react'
import Fader from '../../Fader/Fader'
import './cartCheckout.scss'
import Modaly from './Modaly/Modaly'

const CartCheckout = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sFader, setsFader] = useState()
    let totalPrice = 0
    props.totalPrice.map(item => {
        return totalPrice += item.productPrice * item.quantity
    })
    function checkoutButton() {
        if (JSON.parse(localStorage.getItem('userInfo')) !== null && totalPrice > 0) {
            setIsOpen(true)
        }
        else if (JSON.parse(localStorage.getItem('userInfo')) === null){
            setsFader(<Fader name='User must be logged in' type='danger' />)
        }
        else if (totalPrice == 0){
            setsFader(<Fader name='Cart is empty' type='danger'/>)
        }

    }
    return (
        <>
            <Modaly isOpen={isOpen} setIsOpen={setIsOpen} totalPrice={totalPrice}/>
            <div className='cartCheckout'>
                <h3>Cart totals</h3>
                <hr />
                <div>
                    <p>Subtotal</p>
                    <p>{totalPrice} $</p>
                </div>
                <hr />
                <div>
                    <p>Shipping</p>
                    <p>Free Shipping</p>
                </div>
                <hr />
                <div>
                    <p>Total</p>
                    <p>{totalPrice} $</p>
                </div>
                <button onClick={() => checkoutButton()}>
                    Checkout
                </button>
                {sFader}
            </div>
        </>
    )
}

export default CartCheckout