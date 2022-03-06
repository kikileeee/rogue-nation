import React from 'react'
import './picturePanel.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const PicturePanel = (props) => {

    return (
        <div className='picturePanel'>
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false} stopOnHover={false} showStatus={false}>
                <div>
                    <img src={require(`./pictures/port1.jpg`)} />
                </div>
                <div>
                    <img src={require(`./pictures/port2.jpg`)} />
                </div>
                <div>
                    <img src={require(`./pictures/port3.jpg`)} />
                </div>
                <div>
                    <img src={require(`./pictures/port4.jpg`)} />
                </div>
            </Carousel>
    </div>
  )
}

export default PicturePanel