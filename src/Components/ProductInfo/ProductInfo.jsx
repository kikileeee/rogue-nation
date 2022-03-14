import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../Homepage/Navbar/Navbar'
import './productInfo.scss'
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import Footer from '../Homepage/Footer/Footer';


const ProductInfo = (props) => {
  const location = useLocation();
  const product = location.state.product
  const [comments, setComments] = useState([])
  const [user, setUser] = useState('Guest')
  const [inputComment, setInputComment] = useState('')
  const [updateCommentPanel, setUpdateCommentPanel] = useState('')
  const refInput = useRef()



  const port = process.env.PORT || '9000'
  const ip = process.env.REACT_APP_IP || 'https://api-react-stop.herokuapp.com/'

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
  return (
    <>
      <Navbar cartNumber={props.cartNumber} setCartNumber={props.setCartNumber} />
      <div className='productInfo'>

        <div className='product'>
          <h1>{product.productName}</h1>
          <h2>Current price: {product.productPrice}</h2>
          <img src={require(`../Homepage/ProductShowcase/images/${product.productImage}`)} alt="" />
          <h4>There is curently {product.inStock} of this product in invetory</h4>
        </div>
      </div>
      <div className='comments'>
        <div className='inputButton'>
          <input type="text" onChange={e => { setInputComment(e.target.value) }} ref={refInput}/>
          <button onClick={addComment} >Insert comment</button>
        </div>
        <div className='commentPanel'>
          <div className='generatedComments'>
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
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ProductInfo