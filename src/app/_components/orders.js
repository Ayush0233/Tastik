'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/footer'
import './orders.css'
const Orders = () => {
    const [myOrders, setMyOrders] = useState();
    const [getorder, setGetorder] = useState(false)
    useEffect(()=>{
        getMyOrders();
    },[])
    const getMyOrders = async () => {
        let userId = JSON.parse(localStorage.getItem('user'));
        let response = await fetch("https://tastik-food.vercel.app/api/orders?id="+userId?._id);
        response = await response.json();
        console.log(response)
        if (response.success) {
            setMyOrders(response.result);
            setGetorder(true)
        }
    }

    return (
            
            <div className='orders-wrapper'>
                <h1>Orders</h1>
                    <div className='ordersList'>
                        {
                             myOrders? myOrders.map((item, index) => {

                              return(
                                <div className='orders'key={index}>
                                    <h2 > Restaurant: {item.data[0]?.name ?? restaurant.number}</h2>
                                    <h2 >Amount: ₹{item.amount}</h2>
                                    <h2 >Status: {item.status}</h2>
                                </div>
                              )
                               
                            }) : <h2>You Have NotPlaced any order yet..!</h2>
                        }
                </div>
            </div>
            

    )
}

export default Orders