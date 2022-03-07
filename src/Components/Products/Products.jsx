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
    const [Check, setCheck] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(12).fill(false)
    );
    const navigate = useNavigate()
    
    let count = -1
    const port = process.env.PORT || '9000'
    const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'
    

    function handleOnChange(index) {
        let newArr = [...checkedState]
        if (newArr[index] == true) {
            newArr[index] = false
        }
        else {
            newArr[index] = true
        }
        
        console.log(newArr)
        setCheckedState(newArr)
    }
    useEffect(() => {
        fetch('./data.JSON').then(response => response.json().then(data => {
            setCheck(data.lists)
        }))
    }, [])

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
                    <div className="filterSearch">
                        <TextField
                            label="Search"
                            onChange={e => { setSearch(e.target.value) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <div className='textField'>
                            <div className='forWho'>
                                {/* <h3>Filters</h3>


                                <span>
                                    <h4>Gender</h4>
                                    <div><input type="checkbox" id="men" onChange={() => handleOnChange(0)} /><label htmlFor="men">For men</label></div>
                                    <div><input type="checkbox" id="women" onChange={() => handleOnChange(1)} /><label htmlFor="women">For women</label></div>
                                    <div><input type="checkbox" id="kids" onChange={() => handleOnChange(2)} /><label htmlFor="kids">For kids</label></div>
                                    <div><input type="checkbox" id="unisex" onChange={() => handleOnChange(3)} /><label htmlFor="unisex">Unisex</label></div>
                                </span>
                                <span>
                                    <h4>Price</h4>
                                    <div><input type="checkbox" id='price1' onChange={() => handleOnChange(4)} /><label htmlFor='price1'>100$ or below</label></div>
                                    <div><input type="checkbox" id='price2' onChange={() => handleOnChange(5)} /><label htmlFor='price2'>100$ to 150$</label></div>
                                    <div><input type="checkbox" id='price3' onChange={() => handleOnChange(6)} /><label htmlFor='price3'>150$ to 200$</label></div>
                                    <div><input type="checkbox" id='price4' onChange={() => handleOnChange(7)} /><label htmlFor='price4'>100$ or higher</label></div>
                                </span>
                                <span>
                                    <h4>Brand</h4>
                                    <div><input type="checkbox" id='brand1' onChange={() => handleOnChange(8)} /><label htmlFor='brand1'>Nike</label></div>
                                    <div><input type="checkbox" id='brand2' onChange={() => handleOnChange(9)} /><label htmlFor='brand2'>Adidas</label></div>
                                    <div><input type="checkbox" id='brand3' onChange={() => handleOnChange(10)} /><label htmlFor='brand3'>Puma</label></div>
                                    <div><input type="checkbox" id='brand4' onChange={() => handleOnChange(11)} /><label htmlFor='brand4'>Hummel</label></div>
                                </span> */}

                                <h3>Filters</h3>
                                {Check.map(item => {
                                    return <span key={uuidv4()}><h4>{item.checkboxName}</h4>
                                    {item.check.map(e => {
                                        count += 1
                                        let curCount = count
                                        return <div key={uuidv4()}><input type="checkbox" id={e.type} checked={checkedState[curCount]} onChange={() => handleOnChange(curCount)}/><label htmlFor={e.type}>{e.text}</label></div>
                                    })}
                                    </span>
                                })}
                            </div>



                        </div>
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