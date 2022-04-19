import React, { useRef, useState } from 'react'
import './modaly.scss'
import ReactDom from 'react-dom'
import { RemoveScroll } from 'react-remove-scroll'
import { FaPaypal } from 'react-icons/fa'
import { SiVisa, SiMastercard } from 'react-icons/si'

const Modaly = (props) => {
  const [step, setStep] = useState(1)
  const creditInput = useRef()
  const vccInput = useRef()
  const ownerInput = useRef()
  
  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'https://api-react-stop.herokuapp.com/'

  function next() {
    setStep(step + 1)
  }
  function next2() {
    let pattern = /^5[1-5]\d{2}(| |-)(?:\d{4}\1){2}\d{4}$/;
    let text = creditInput.current.value
    let patternForVCC = /^\d{3}$/
    let textVcc = vccInput.current.value
    let patterForOwner = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
    let textOwner = ownerInput.current.value
    if (textVcc.match(patternForVCC) && text.match(pattern) && textOwner.match(patterForOwner)) {
      console.log('Everything matches')

      setStep(step + 1)
    }
    else {
      if (!textVcc.match(patternForVCC)) {
        console.log('VCC doesnt matches')
        vccInput.current.style.border = 'red 2px solid'
      } else {
        vccInput.current.style.border = 'seagreen 2px solid'
      }
      if (!text.match(pattern)) {
        console.log(('Card Number doesnt match'))
        creditInput.current.style.border = 'red 2px solid'
      } else {
        creditInput.current.style.border = 'seagreen 2px solid'
      }
      if (!textOwner.match(patterForOwner)) {
        console.log('Owner doesnt Match')
        ownerInput.current.style.border = 'red 2px solid'
      }
      else {
        ownerInput.current.style.border = 'seagreen 2px solid'
      }
    }
  }
  function closeForm() {
    props.setIsOpen(false)
    setStep(1)
  }
  function finish() {
    props.setIsOpen(false)
    setStep(1)
    let cart = JSON.parse(localStorage.getItem('cart'))
    let body = {
      user:JSON.parse(localStorage.getItem('userInfo')),
      cart:JSON.parse(localStorage.getItem('cart'))
    }
    fetch(`${ip}users/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    localStorage.removeItem("cart")
  }
  function onChange(x){
    x.target.style.border = '2px solid gray'
  }
  function form() {
    if (step == 1) {
      return <span>

        <h5>1/3 Step</h5>
        <div className='progressBar'>
          <div></div>
        </div>
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
        <h5>We accept</h5>
        <div className='icons'>

          <FaPaypal size={30} />
          <SiVisa size={50} />
          <SiMastercard size={30} />
        </div>
        
        <button onClick={next}>Next</button>

      </span>
    } else if (step == 2) {
      return <span className='span2'>
        <h5>2/3 Step</h5>
        <div className='progressBar'>
          <div style={{ width: 66.66 + '%' }}></div>
        </div>
        <h2>Credit Card Credentials</h2>
        <div className='row'>
          <div className='top'><label htmlFor="">Owner</label><input type="text" placeholder='First and Last name' ref={ownerInput} onChange={(e) => onChange(e)}/></div>
          <div className='top'><label htmlFor="">CVV</label><input type="text" placeholder='CVV code' ref={vccInput} onChange={(e) => onChange(e)}/></div>
        </div>
        <label htmlFor="">Card Number</label><input type="text" ref={creditInput} placeholder='1234 1234 1234 1234' onChange={(e) => onChange(e)}/>
        <div>

          <label htmlFor="">Expiration Date</label>
          <div className='row'>
            <div className='row'>

              <select form="month">
                <option value="">January</option>
                <option value="">February</option>
                <option value="">March</option>
                <option value="">March</option>
                <option value="">Aprli</option>
                <option value="">May</option>
                <option value="">June</option>
                <option value="">July</option>
                <option value="">August</option>
                <option value="">September</option>
                <option value="">October</option>
                <option value="">November</option>
                <option value="">December</option>
              </select>
              <select form="years">
                <option value="">2022</option>
                <option value="">2023</option>
                <option value="">2024</option>
                <option value="">2025</option>
                <option value="">2026</option>
                <option value="">2027</option>
                <option value="">2028</option>
              </select>
            </div>
            <div className='icons'>
              <FaPaypal size={20} />
              <SiVisa size={40} />
              <SiMastercard size={20} />
            </div>
          </div>
        </div>

        <button onClick={next2}>Next</button>

      </span>
    } else {
      return <span className='span3'>
        <h5>3/3 Step</h5>
        <div className='progressBar'>
          <div style={{ width: 100 + '%', borderTopRightRadius: 20 + 'px', borderBottomRightRadius: 20 + 'px' }}></div>
        </div>
        <h2>You can finish ordering your products</h2>
        <h3>Credit card is valid</h3>
        <a href='/'><button onClick={finish}>Finish ordering</button></a>

      </span>
    }
  }
  if (props.isOpen) {
    return ReactDom.createPortal(
      <RemoveScroll>
        <div className='modaly'>
          <div className='form'>
            <button onClick={closeForm} className='onOpen'>X</button>
            {form()}
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