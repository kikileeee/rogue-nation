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
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [checkedState, setCheckedState] = useState(
        new Array(12).fill(false)
    );
    const navigate = useNavigate()
    let prodArr = [...mappingProducts().filter(e => {
        if (Search == '') {
            return e
        } else if (e.productName.toLowerCase().includes(Search.toLowerCase())) {
            return e
        }
    })]

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = prodArr.slice(indexOfFirstPost, indexOfLastPost)

    let count = -1
    const port = process.env.PORT || '9000'
    const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'

    function handleOnChange(index) {
        let newArr = [...checkedState]
        if (newArr[index] === true) {
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
            <h3> {x.productPrice}$</h3>
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
        setsFader(<Fader name='Item has been added to a cart' type='success' />)


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
        let productArray = new Array(...Products)
        let genderArray = []
        let brandArray = []
        let priceArray = []

        let genderBooleanArr = [checkedState[0], checkedState[1], checkedState[2], checkedState[3]]
        let priceBooleanArr = [checkedState[4], checkedState[5], checkedState[6], checkedState[7]]
        let brandBooleanArr = [checkedState[8], checkedState[9], checkedState[10], checkedState[11]]
        Products.map((product, index) => {
            if (checkedState[0] && product.gender === 'men') {
                genderArray.push(product)
            }
            if (checkedState[1] && product.gender === 'women') {
                genderArray.push(product)
            }
            if (checkedState[2] && product.gender === 'kids') {
                genderArray.push(product)
            }
            if (checkedState[3] && product.gender === 'unisex') {
                genderArray.push(product)
            }
            if (checkedState[8] && product.brand === 'nike') {
                brandArray.push(product)
            }
            if (checkedState[9] && product.brand === 'adidas') {
                brandArray.push(product)
            }
            if (checkedState[10] && product.brand === 'puma') {
                brandArray.push(product)
            }
            if (checkedState[11] && product.brand === 'hummel') {
                brandArray.push(product)
            }
            if (checkedState[4] && product.productPrice < 100) {
                priceArray.push(product)
            }
            if (checkedState[5] && (product.productPrice > 100 && product.productPrice < 150)) {
                priceArray.push(product)
            }
            if (checkedState[6] && (product.productPrice > 150 && product.productPrice < 200)) {
                priceArray.push(product)
            }
            if (checkedState[7] && product.productPrice > 200) {
                priceArray.push(product)
            }

        })
        let filteredGender = productArray.filter(x => genderArray.includes(x))
        let filteredPrice = productArray.filter(x => priceArray.includes(x))
        let filteredBrand = productArray.filter(x => brandArray.includes(x))

        let diffrencex = filteredGender.filter(x => filteredPrice.includes(x))
        let diffrencey = filteredBrand.filter(x => filteredPrice.includes(x))
        let diffrencez = filteredBrand.filter(x => filteredGender.includes(x))

        let diffrence = diffrencey.filter(x => filteredGender.includes(x))
        function isTrue(x) {
            if (x.some(e => e === true)) {
                return true
            } else {
                return false
            }
        }
        if (checkedState.every(e => e === false)) {
            return Products
        }

        else if (isTrue(genderBooleanArr) && isTrue(priceBooleanArr) && isTrue(brandBooleanArr)) {
            return diffrence;
        }
        else if (isTrue(genderBooleanArr) && isTrue(priceBooleanArr)) {
            return diffrencex
        }
        else if (isTrue(brandBooleanArr) && isTrue(priceBooleanArr)) {
            return diffrencey
        }
        else if (isTrue(genderBooleanArr) && isTrue(brandBooleanArr)) {
            return diffrencez
        }
        else if (isTrue(brandBooleanArr)) {
            return filteredBrand
        }
        else if (isTrue(priceBooleanArr)) {
            return filteredPrice
        }
        else if (isTrue(genderBooleanArr)) {
            return filteredGender
        }

    }
    function checkBoxClick(curCount) {
        handleOnChange(curCount)
        setCurrentPage(1)
    }
    function page() {
        let numberOfButtons = Math.ceil(prodArr.length / postsPerPage)
        let arr = []
        for (let i = 1; i <= numberOfButtons; i++) {
            arr.push(i);
        }
        if (prodArr.length > postsPerPage - 1) {
            return arr.map(e => {
                if (e == currentPage) {
                    return <button className='active' key={uuidv4()} onClick={() => setCurrentPage(e)}>{e}</button>
                } else {

                    return <button key={uuidv4()} onClick={() => setCurrentPage(e)}>{e}</button>
                }
            })
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
                            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
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
                            <h3>Filters</h3>
                            <div className='forWho'>
                                {Check.map(item => {
                                    return <span key={uuidv4()}><h4>{item.checkboxName}</h4>
                                        {item.check.map(e => {
                                            count += 1
                                            let curCount = count
                                            return <div key={uuidv4()}><input type="checkbox" id={e.type} checked={checkedState[curCount]} onChange={() => checkBoxClick(curCount)} /><label htmlFor={e.type}>{e.text}</label></div>
                                        })}
                                    </span>
                                })}
                            </div>



                        </div>
                    </div>


                    <div className='productsPanel'>
                        {currentPosts.map(product => {
                            return writeCard(product)
                        })
                        }

                    </div>
                    
                </div >
                
                <div className='pagination'>
                            {page()}
                        </div>

            </div >

            <Footer />
        </>
    )
}

export default Products