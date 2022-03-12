import React from 'react'
import './categories.scss'

const Categories = () => {
  return (
    <div className='categories'>
        <div><a href="/products">SHOP HERE</a></div>
        <div><a href="/products">MEN'S PRODUCTS</a></div>
        <div><h2>BOLD CHOISES</h2><a href="/products">WOMEN'S PRODUCTS</a></div>
    </div>
  )
}

export default Categories