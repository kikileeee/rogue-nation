import React, { useState, useEffect } from 'react'
import Navbar from '../Homepage/Navbar/Navbar'
import './products.scss'
import { v4 as uuidv4 } from 'uuid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartSharp';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import Fader from '../Fader/Fader';
import Footer from '../Homepage/Footer/Footer';

const Products = (props) => {
    const [Products, SetProducts] = useState([]);
    const [Search, setSearch] = useState('')
    const [sFader, setsFader] = useState()
    const navigate = useNavigate()
    const port = process.env.PORT || '9000'
    const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'
    useEffect(() => {
        fetch(`${ip}popular`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json().then(data => {
            SetProducts(data)
        }))
    }, [])
    function addItem(x) {
        let a = []
        let pushNewData = true
        a = JSON.parse(localStorage.getItem('cart')) || [];
        setsFader(<Fader name='Item has been added to a cart' />)


        let total = 1
        let cart = a.map(e => {
            total += e.quantity
        })
        console.log(x.productName + ' is added to cart')
        a.find(item => {
            if (item.productid == x.productid) {
                item.quantity += 1
                pushNewData = false
                props.setCartNumber(`${total}`)
                localStorage.setItem('cart', JSON.stringify(a))
            }
        })
        if (pushNewData) {
            x.quantity = 1
            a.push(x);
            props.setCartNumber(`${total}`)
            localStorage.setItem('cart', JSON.stringify(a))
        }
    }
    return (
        <>
            <div className='faderGreen'></div>
            {sFader}
            <Navbar cartNumber={props.cartNumber} setCartNumber={props.setCartNumber} />
            <div>
                <div className='products'>
                    <div className='textField'>
                        <div className='forWho'>
                            <h3>Gender</h3>
                            <label htmlFor="formen">For men
                                <input type="radio" name="forwho" id="men" /></label>
                            <label htmlFor="forwomen">For men
                                <input type="radio" name="forwho" id="women" /></label>
                            <label htmlFor="unisex">Unisex
                                <input type="radio" name="forwho" id="unisex" /></label>
                            <label htmlFor="forkids">For kids
                                <input type="radio" name="forwho" id="kids" /></label>
                        </div>
                        
                        <TextField
                            label="Search"
                            onChange={e => { setSearch(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>


                    <div className='productsPanel'>
                        {Products.filter(e => {
                            if (Search == '') {
                                return e
                            } else if (e.productName.toLowerCase().includes(Search.toLowerCase())) {
                                return e
                            }
                        }).map(product => {
                            return <div className='card' key={uuidv4()}>
                                <h2>{product.productName}</h2>
                                <h3>Current price: {product.productPrice}$</h3>
                                <h4 onClick={() => { navigate(`/productInfo`, { state: { product: product } }) }}>Click for more info</h4>
                                <img src={require(`../Homepage/ProductShowcase/images/${product.productImage}`)} alt="" />
                                <div className='blackOverlay'>
                                    <button onClick={() => { addItem(product) }}><AddShoppingCartIcon /></button>

                                </div>
                            </div>
                        })}

                    </div>
                </div >
            </div >
            <Footer />
        </>
    )
}

export default Products