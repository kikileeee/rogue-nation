import React from 'react'
import './cartCard.scss'
import { v4 as uuidv4 } from 'uuid'
import { useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi'
import {MdRemoveShoppingCart} from 'react-icons/md'

const CartCard = (props) => {
    const deleteButton = useRef()

    let storage = JSON.parse(localStorage.getItem('cart')) || []
    const [itemsInProps, setItemsInProps] = useState(storage)

    function deleteCard(x) {
        let filtered = itemsInProps.filter(function (item) {
            return item.productid !== x.productid
        })
        setItemsInProps(filtered)
        props.setTotalPrice(filtered)
        let total = 0
        let cart = filtered.map(e => {
            total += e.quantity
        })
        props.setCartNumber(`${total}`)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(filtered));

    }
    function minusQuantity(x) {

        storage.find(item => {
            if (item.productid == x.productid) {

                if (item.quantity == 1) {
                    let filtered = storage.filter(itemFilter => itemFilter !== item)
                    setItemsInProps(filtered)
                    props.setTotalPrice(filtered)

                    let total = 0
                    let cart = filtered.map(e => {
                        total += e.quantity
                    })
                    props.setCartNumber(`${total}`)
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart', JSON.stringify(filtered));
                }
                else {
                    item.quantity -= 1
                    setItemsInProps(storage)
                    props.setTotalPrice(storage)
                    let total = 0
                    let cart = storage.map(e => {
                        total += e.quantity
                    })
                    props.setCartNumber(`${total}`)
                    localStorage.removeItem('cart')
                    localStorage.setItem('cart', JSON.stringify(storage));
                }

            }
        })
    }
    function plusQuantity(x) {
        let total = 0
        let cart = storage.map(e => {
            total += e.quantity
        })
        storage.find(item => {
            if (item.productid == x.productid) {
                item.quantity += 1
                setItemsInProps(storage)
                props.setTotalPrice(storage)
                props.setCartNumber(`${total + 1}`)
                localStorage.removeItem('cart')
                localStorage.setItem('cart', JSON.stringify(storage));
            }
        })
    }
    if (itemsInProps.length === 0) {
        return <div className='emptyCart'><MdRemoveShoppingCart size={40}/><h2>Cart is Empty</h2></div>
    } else {
        return (
            <div className='cartCard'>
                {itemsInProps.map(item => (
                    <div ref={deleteButton} className='items' key={uuidv4()}>
                        <img src={require(`../../../Homepage/ProductShowcase/images/${item.productImage}`)} alt="" />
                        <p className='name'>{item.productName}</p>
                        <p className='price'>{item.productPrice}$</p>
                        <div className='quantity'>
                            <button onClick={() => { minusQuantity(item) }}>-</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => { plusQuantity(item) }}>+</button>
                        </div>
                        <button onClick={() => { deleteCard(item) }}><p><FiTrash2 /></p></button>
                    </div>
                ))}
            </div>
        )
    }
}
export default CartCard