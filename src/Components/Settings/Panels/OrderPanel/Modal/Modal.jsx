import React from 'react'
import ReactDom from 'react-dom'
import { RemoveScroll } from 'react-remove-scroll'
import './modal.scss'
import { v4 as uuidv4 } from 'uuid'

const Modal = (props) => {
    let count = 0
    let totalPrice = 0
    props.products.forEach(e => {
        totalPrice += e.productPrice * e.quantity
    });
    let shippingStatus = props.products[0].shippingSTATUS
    let dateOfOrder = props.products[0].orderDATE
    return ReactDom.createPortal(
        <RemoveScroll className="modal">
            <div className='table'>
            <div className='receipt'>
                    <h1>Receipt for order {props.products[0].orderNUMBER}</h1>
                    <b>Total Price</b>
                    <p>{totalPrice}$</p>
                    <b>Shipping fee</b>
                    <p>Free delivery</p>
                    <b>Status of delivery</b>
                    <p>{shippingStatus}</p>
                    <b>Date of order</b>
                    <p id='space'>{dateOfOrder}</p>
                    <hr />
                </div>
                <button className='exit' onClick={() => props.setModal()}>X</button>
                <div className='structure'>
                    <b>#</b>
                    <b>Image</b>
                    <b>Product Name</b>
                    <b>Quantity</b>
                    <b>Product Price</b>
                    <b>Combined Price</b>
                </div>
                <hr />
                {props.products.map(product => {
                    count++
                    return <div className='structure' key={uuidv4()}>
                        <p>#{count}</p>
                        <img src={require(`../../../../Homepage/ProductShowcase/images/${product.productImage}`)} alt="" />
                        <p>{product.productName}</p>
                        <p>{product.quantity}</p>
                        <p>{product.productPrice}$</p>
                        <p>{product.productPrice * product.quantity}$</p>
                    </div>
                })}


                
            </div>
        </RemoveScroll>
        , document.getElementById('portal')
    )
}

export default Modal