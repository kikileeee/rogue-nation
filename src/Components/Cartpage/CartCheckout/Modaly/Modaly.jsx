import React from 'react'
import './modaly.scss'
import ReactDom from 'react-dom'
import { RemoveScroll } from 'react-remove-scroll'
import { FaPaypal } from 'react-icons/fa'
import { SiVisa, SiMastercard } from 'react-icons/si'
import {FaCcMastercard} from 'react-icons/fc'

const Modaly = (props) => {
  console.log(props.isOpen)
  if (props.isOpen) {
    return ReactDom.createPortal(
      <RemoveScroll>
        <div className='modaly'>
          <div className='form'>
            <button onClick={() => props.setIsOpen(false)} className='onOpen'>X</button>
            <span>
              <h2>Total</h2>
              <p>{props.totalPrice}$</p>
              <h3>Subtotal</h3>
              <p>{props.totalPrice}$</p>
              <h3>Select Delivery</h3>
              <select name="cars" id="cars" form="carform">
                <option value="bex">Bex Express</option>
                <option value="aks">Aks Express</option>
                <option value="fedex">FedEX</option>
                <option value="ups">UPS</option>
              </select>
              <h3>Select Payment Method</h3>
              <select name="cars" id="cars" form="carform">
                <option value="paypal">PayPal</option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
              </select>
              <button>Checkout</button>
              <h5>We accept</h5>
              <div className='icons'>

                <FaPaypal size={30} />
                <SiVisa size={50} />
                <SiMastercard size={30}/>
                </div>
            </span>
          </div>
        </div>
      </RemoveScroll>,
      document.getElementById('portal')
    )
  } else {
    return <></>
  }
}

export default Modaly