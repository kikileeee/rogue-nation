import React from 'react'
import CartCard from './CartCard/CartCard'
import './cartShowcase.scss'

const CartShowcase = (props) => {
    return (
        <div className='cartShowcase'>
            <h3>Shopping cart</h3>
            <hr />
            <div className='table'>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
            </div>
            <hr />
            <div>
                <CartCard setTotalPrice={props.setTotalPrice} setCartNumber={props.setCartNumber}/>
            </div>
        </div>
    )
}

export default CartShowcase