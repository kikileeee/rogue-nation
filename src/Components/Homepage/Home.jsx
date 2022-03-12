import React from 'react'
import Footer from './Footer/Footer'
import './home.scss'
import Navbar from './Navbar/Navbar'
import PicturePanel from './PicturePanel/PicturePanel'
import ProductShowcase from './ProductShowcase/ProductShowcase'
import Commercial from './Commercial/Commercial'
import Categories from './Categories/Categories'

const Home = (props) => {
  
  return (
    <div className='home'>
    <Navbar cartNumber={props.cartNumber} setCartNumber={props.setCartNumber}/>
    <PicturePanel/>
    <ProductShowcase name='Most popular products RIGHT NOW' fetch='popular' setCartNumber={props.setCartNumber}/>
    <Commercial/>
    <ProductShowcase name='Products on sale RIGHT NOW' fetch='lowToHigh' setCartNumber={props.setCartNumber}/>
    <Categories/>
    <Footer/>
    </div>
  )
}

export default Home