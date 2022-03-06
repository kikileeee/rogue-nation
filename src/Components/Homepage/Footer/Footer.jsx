import React, { useRef, useState } from 'react'
import './footer.scss'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaYoutube, FaGithub } from 'react-icons/fa'
import Fader from '../../Fader/Fader'

const Footer = () => {
    const navigate = useNavigate()
    const refInput = useRef()
    const [sFader, setsFader] = useState()
    function newsLetter() {
        setsFader(<Fader name='Added email adress for Newsletter' />)
        refInput.current.value = '';

    }
    return (
        <div className='footer'>
            <div className='upperFooter'>
                <h2>Rogue Nation</h2>
                <div>
                    <a href="https://youtube.com"><button >Watch video</button></a>
                    <a href="https://youtube.com"><button>About us</button></a>
                </div>
            </div>
            <div className='lowerFooter'>
                <div>
                    <p>Follow us</p>
                    <div>
                        <a href="https://www.instagram.com/paulovkr/"><FaInstagram size={50} /></a>
                        <a href="https://facebook.com"><FaFacebook size={50} /></a>
                        <a href="https://youtube.com"><FaYoutube size={50} /></a>
                        <a href="https://github.com/kikileeee"><FaGithub size={50} /></a>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder='Enter email' ref={refInput} />
                        <button onClick={newsLetter}>Add a Newsletter</button>
                        {sFader}
                    </div>
                    <div>
                        <button onClick={() => { navigate('/products') }}>All of our products</button>
                        <button onClick={() => { navigate('/signup') }}>Register</button>
                        <button onClick={() => { navigate('/') }}>Home page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer