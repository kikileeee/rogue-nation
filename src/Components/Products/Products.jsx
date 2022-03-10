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
    let productArray = []
    const [productArrayState, setProductArrayState] = useState()
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
        setCheckedState(newArr)
    }
    function writeCard(x) {
        return <div className='card' key={uuidv4()}>
            <h2>{x.productName}</h2>
            <h3>Current price: {x.productPrice}$</h3>
            <h5>For: {x.gender}</h5>
            <h4 onClick={() => { navigate(`/productInfo`, { state: { product: x } }) }}>Click for more info</h4>
            <img src={require(`../Homepage/ProductShowcase/images/${x.productImage}`)} alt="" />
            <div className='blackOverlay'>
                <button onClick={() => { addItem(x) }}><AddShoppingCartIcon /></button>

            </div>
        </div>
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
    function mappingProducts() {
        Products.map(product => {
            if (checkedState[0] && product.gender == 'men') {
                productArray.push(product)
            }
            if (checkedState[1] && product.gender == 'women') {
                productArray.push(product)
            }
            if (checkedState[2] && product.gender == 'kids') {
                productArray.push(product)
            }
            if (checkedState[3] && product.gender == 'unisex') {
                productArray.push(product)
            }
            if (checkedState[4] && product.productPrice < 100) {
                productArray.push(product)
            }
            if (checkedState[5] && (product.productPrice > 100 && product.productPrice < 150)) {
                productArray.push(product)
            }
            if (checkedState[6] && (product.productPrice > 150 && product.productPrice < 200)) {
                productArray.push(product)
            }
            if (checkedState[7] && product.productPrice > 200) {
                productArray.push(product)
            }
            if (checkedState[8] && product.brand == 'nike') {
                productArray.push(product)
            }
            if (checkedState[9] && product.brand == 'adidas') {
                productArray.push(product)
            }
            if (checkedState[10] && product.brand == 'puma') {
                productArray.push(product)
            }
            if (checkedState[10] && product.brand == 'hummel') {
                productArray.push(product)
            }

        })
        let filteredProductArray = [...new Set(productArray)]
        if (productArray.length == 0) {
            return Products
        }
        else {
            return filteredProductArray;
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
                                <h3>Filters</h3>
                                {Check.map(item => {
                                    return <span key={uuidv4()}><h4>{item.checkboxName}</h4>
                                        {item.check.map(e => {
                                            count += 1
                                            let curCount = count
                                            return <div key={uuidv4()}><input type="checkbox" id={e.type} checked={checkedState[curCount]} onChange={() => handleOnChange(curCount)} /><label htmlFor={e.type}>{e.text}</label></div>
                                        })}
                                    </span>
                                })}
                            </div>



                        </div>
                    </div>


                    <div className='productsPanel'>
                        {/* {mappingProducts()} */}
                        {mappingProducts().filter(e => {
                            if (Search == '') {
                                return e
                            } else if (e.productName.toLowerCase().includes(Search.toLowerCase())) {
                                return e

                            }
                        }).map(product => {
                            return writeCard(product)
                        })}

                    </div>
                </div >
            </div >
            <Footer />
        </>
    )
}

export default Products