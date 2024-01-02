import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
        <h1>Eclusive</h1>
        <h1>Offers for You</h1>
        <p>ONLY ON BEST SELLES PRODUCTS</p>
        <button>Check Now</button>
        </div>
        <div className="offers-right">
        <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}
