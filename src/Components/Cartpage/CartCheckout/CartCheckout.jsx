import React, { useState, useEffect } from 'react'
import './cartCheckout.scss'
import Modaly from './Modaly/Modaly'

const CartCheckout = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    let totalPrice = 0
    props.totalPrice.map(item => {
        return totalPrice += item.productPrice * item.quantity
    })
    function checkoutButton() {
        if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
            setIsOpen(true)
        }
        else {
            alert('Guest must me logged in')
            setIsOpen(false)
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
            </div>
        </>
    )
}

export default CartCheckout