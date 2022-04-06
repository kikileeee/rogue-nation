import React from 'react'
import ReactDom from 'react-dom'
import { RemoveScroll } from 'react-remove-scroll'
import './modal.scss'
import { v4 as uuidv4 } from 'uuid'

const Modal = (props) => {
    console.log(props.products)

    let count = 0
    return ReactDom.createPortal(
        <RemoveScroll className="modal">
            <div className='table'>
                <button className='exit' onClick={() => props.setModal()}>X</button>
                <div className='structure'>
                    <b>#</b>
                    <b>Image</b>
                    <b>Product Name</b>
                    <b>Quantity</b>
                    <b>Product Price</b>
                </div>
                {props.products.map(product => {
                    count++
                    return <div className='structure' key={uuidv4()}>
                        <p>#{count}</p>
                        <img src={require(`../../../../Homepage/ProductShowcase/images/${product.productImage}`)} alt="" />
                        <p>{product.productName}</p>
                        <p>1</p>
                        <p>{product.productPrice}$</p>
                    </div>
                })}
            </div>
        </RemoveScroll>
        , document.getElementById('portal')
    )
}

export default Modal