import React, { useState, useEffect, useRef } from 'react'
import './productShowcase.scss'
import { v4 as uuidv4 } from 'uuid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartSharp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom'
import Fader from '../../Fader/Fader'

const ProductShowcase = (props) => {
    const [Products, SetProducts] = useState([]);
    const [sFader, setsFader] = useState()
    const [saleInfo, setSaleInfo] = useState([])
    const inputBackNext = useRef()
    const navigate = useNavigate()
    const port = process.env.PORT || '9000'
    const ip = process.env.REACT_APP_IP || 'http://192.168.1.113:9000/'

    useEffect(() => {
        fetch(`${ip}` + props.fetch, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json().then(data => {
            SetProducts(data)
        }))
    }, [])
    useEffect(() => {
        fetch(`${ip}` + 'sales', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json().then(data => {
            setSaleInfo(data)
        }))
    }, [])
    const scroll = (scrollOffset) => {
        inputBackNext.current.scrollLeft += scrollOffset;
    };

    function goBack() {
        scroll(-340)
    }
    function goNext() {
        scroll(340)
    }
    function addItem(x) {
        saleInfo.forEach(e => {
            if (x.productid == e.productid) {
                x.productPrice = e.saleprice
            }
        })
        let a = []
        let pushNewData = true
        a = JSON.parse(localStorage.getItem('cart')) || [];
        setsFader(<Fader name='Item has been added to a cart' type='success' />)

        let total = 1
        let cart = a.map(e => {
            total += e.quantity
        })

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
    function sales(x) {

        const filtered = saleInfo.filter(item => item.productid == x.productid)
        if (filtered.length > 0) {
            return <span key={uuidv4()}>
                <p className='onSale'>SALE</p>
                <span className='flexH3'>
                    <h3 className='crossedOver' >{x.productPrice}$</h3>
                    <h3 className='notCrossedOver'>{filtered[0].saleprice}$</h3></span>
            </span>
        }
        else {
            return <h3 key={uuidv4()}>{x.productPrice}$</h3>
        }
    }


    return (
        <div className='productShowcaseWrapper'>
            {sFader}

            <h1>{props.name}</h1>
            <div className='productShowcase' ref={inputBackNext}>
                <div className='slides'>
                    <div className='divBack'><button className='back' onClick={goBack} ><ArrowBackIosNewIcon /></button></div>
                    <div className='divNext'><button className='next' onClick={goNext}><ArrowForwardIosIcon /></button></div>
                    <div className='productCard'>
                        {Products.map(product => (
                            <div className='card' key={uuidv4()}>
                                <h2>{product.productName}</h2>
                                {sales(product)}
                                <h4 onClick={() => { navigate(`/productInfo`, { state: { product: product } }) }}>Click for more info</h4>
                                <img src={require(`../ProductShowcase/images/${product.productImage}`)} alt="" />
                                <div className='blackOverlay'>
                                    <button onClick={() => { addItem(product) }}><AddShoppingCartIcon /></button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShowcase