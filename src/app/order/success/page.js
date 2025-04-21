'use client'
import React from 'react'
import order from "../../images/mobile.mp4"
export default function Success(){
    return(
        <div className="success">
            <h1>Order Placed !</h1>
            <video src={order} autoPlay loop ></video>
            {/* <video src={order} autoPlay loop ></video> */}

        </div>
    )
}