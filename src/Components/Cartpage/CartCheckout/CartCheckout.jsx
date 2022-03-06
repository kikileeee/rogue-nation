import React from 'react'
import './cartCheckout.scss'

const CartCheckout = (props) => {
    let totalPrice = 0
    props.totalPrice.map(item => {
        return totalPrice += item.productPrice * item.quantity
    })

    return (
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
            <button>
                Checkout
            </button>
        </div>
    )
}

export default CartCheckout