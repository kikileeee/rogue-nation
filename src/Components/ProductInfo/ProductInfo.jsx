import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../Homepage/Navbar/Navbar'
import './productInfo.scss'
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import Footer from '../Homepage/Footer/Footer';
import Fader from '../Fader/Fader';
import {BiCommentAdd} from 'react-icons/bi'


const ProductInfo = (props) => {
  const location = useLocation();
  const product = location.state.product
  const [comments, setComments] = useState([])
  const [user, setUser] = useState('Guest')
  const [inputComment, setInputComment] = useState('')
  const [updateCommentPanel, setUpdateCommentPanel] = useState('')
  const refInput = useRef()
  const [sFader, setsFader] = useState()

  let saleInfo = location.state.sale
  const filtered = saleInfo.filter(item => item.productid == product.productid)
  let inStock = false
  if (product.inStock > 0) {
    inStock = true
  }
  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo')) !== null) {
      setUser(JSON.parse(localStorage.getItem('userInfo')).username)
    }
    fetch(`${ip}comment`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json().then(data => {
      if (data.length) {
        setComments(data)
      }
    }))
  }, [updateCommentPanel])

  function addComment() {
    let danas = new Date()
    let minutes = danas.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;
    let date = danas.getFullYear() + '-' + (danas.getMonth() + 1) + '-' + danas.getDate() + ' at ' + danas.getHours() + ":" + minutes
    let dataComment = {
      productid: product.productid,
      user: user,
      comment: inputComment,
      date: date
    }
    if (inputComment != '') {
      setInputComment('')
      fetch(`${ip}comment`, {
        method: 'PUT',
        body: JSON.stringify(dataComment),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json().then(data => {
        if (data.length) {
          setComments(data)
          refInput.current.value = ''
        }
      }))
    }
  }
  function addToCart() {
    let newArr = { ...product }
    if (filtered[0] != undefined) {
      newArr.productPrice = filtered[0].saleprice
    }
    let a = []
    let pushNewData = true
    a = JSON.parse(localStorage.getItem('cart')) || [];
    setsFader(<Fader name='Item has been added to a cart' type='success' />)

    let total = 1
    let cart = a.map(e => {
      total += e.quantity
    })

    a.find(item => {
      if (item.productid == newArr.productid) {
        item.quantity += 1
        pushNewData = false
        props.setCartNumber(`${total}`)
        localStorage.setItem('cart', JSON.stringify(a))
      }
    })
    if (pushNewData) {
      newArr.quantity = 1
      a.push(newArr);
      props.setCartNumber(`${total}`)
      localStorage.setItem('cart', JSON.stringify(a))
    }
  }
  return (
    <>
      <Navbar cartNumber={props.cartNumber} setCartNumber={props.setCartNumber} />
      <div className='productInfo'>

        <div className='product'>
          <div>
          {filtered.length > 0 && <p className='onSale'>SALE</p>}
          
            <h1>{product.productName}</h1>
            <h2>Current price: {filtered.length > 0 ? filtered[0].saleprice + '$': product.productPrice + '$'}<s>{filtered.length > 0 && product.productPrice + '$'}</s></h2>

            <img src={require(`../Homepage/ProductShowcase/images/${product.productImage}`)} alt="" />
          </div>
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <td>{product.productName}</td>
              </tr>
              <tr>
                <th>Product price</th>
                <td>{filtered.length > 0 ? filtered[0].saleprice + '$': product.productPrice + '$'}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{product.gender.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>{product.brand.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Inventory</th>
                <td>{inStock ? 'In Stock' : 'Not In Stock'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {sFader}
      <button className='addToCart' onClick={addToCart}>ADD TO CART</button>
      <hr />
      <div className='comments'>
        <div className='inputButton'>
          <input type="text" onChange={e => { setInputComment(e.target.value) }} ref={refInput} />
          <button onClick={addComment} >Add comment</button>
        </div>
        <div className='commentPanel'>
          {
            comments.length > 0 
            ?  <div className='generatedComments'>
            {comments.map(comment => {
              return (<div key={uuidv4()}>
                <div className='flex'>
                  <img src={require(`./default.jpg`)} alt="" />
                  <h2>{comment.user}</h2>
                  <h4>{comment.date}</h4>
                </div>
                <p>{comment.comment}</p>
              </div>)
            })}
          </div>
            : <div className='noComments'><h2>There are no comments, be the first one to comment on this product !</h2><BiCommentAdd size={70}/></div>
          }
         
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductInfo