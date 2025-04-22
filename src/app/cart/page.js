'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'

import Footer from '../_components/footer'
import { DELIVERY_CHARGES, FREE_DELIVERY, TAX } from '../lib/constant'
import EmptyCart from '../_components/EmptyCart'
import { useRouter } from 'next/navigation'
import '../_components/login.css'
const page = () => {
    // let localStorage;
    // const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    
    console.log(cartStorage);
    const [removeCartData, setRemoveCartData] = useState()
    // const [total] = useState(()=>cartStorage.length==1?cartStorage[0].price:cartStorage.map(item => item.price).reduce((a, b) => a + b, 0));
    console.log(total);
    const router = useRouter();
    useEffect(() => {
        // This code runs only in the browser
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartStorage(storedCart);
    }, []);
    useEffect(() => {
        // Calculate total whenever cartStorage changes
        const newTotal = cartStorage.length === 1 
            ? cartStorage[0].price 
            : cartStorage.map(item => item.price).reduce((a, b) => a + b, 0);
        setTotal(newTotal);
    }, [cartStorage]);
    // const [deliveryCharge, setDeliveryCharge] = useState(()=>{})
    
    const removeFromCart = (id) => {
        setRemoveCartData(id);
        //cartIds contain the unique ids of items
        // cartIds la ashyaprakare filter kela ki je id remove kara sathi aali ahe te 
        // sodun baki sagle Localcartids madhe store honar
        let localCartupdate = cartStorage.filter(item => item != id)
        // setCartData()
        //nantr cartIds la localcartIds sobat set karun dila
        localStorage.setItem('cart', JSON.stringify(localCartupdate));
        // setCartIds(localCartIds)
        window.location.reload()
    }

     const order = ()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }
        else{
            router.push('/user-auth?order=true')
        }
     }
    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            {
                cartStorage.length>=1?
            <div className='cart'>
                <div className='cartHeading'>
                    <h1>Your Cart</h1>
                </div>
                <div className='cartItems'>
                    {
                         cartStorage.map((item) => (
                                <div className='itemContainer' key={item._id}>
                                    <div className='itemImage'>
                                        <img src={item.image} alt='foodImage' />
                                    </div>
                                    <div className='itemActions'>
                                        <div className='itemInfo'>
                                            <h2>{item.name}</h2>
                                            <h2>₹ {item.price}</h2>
                                        </div>
                                        <div>
                                            <button onClick={() => removeFromCart(item._id)} className='redBtn'><i className="bi bi-trash3-fill"></i> Remove</button>
                                        </div>
                                    </div>
                                </div>

                           
                        ))

                            // : <h1>Cart is Empty</h1>
                    }
                </div>
                <div className='summary'>
                    <div className='summaryheading'><h1>Order Summary</h1></div>
                    <div className='priceDetails'>
                    <h2>
                        <span>Total: </span>
                        <span>₹ {total}</span>
                    </h2>
                    <h2>
                        <span>Tax: </span>
                        <span>₹ {(total * TAX) / 100}</span>
                    </h2>
                    <h2>
                        <span>Delivery Charges: </span>
                        <span>₹ {total<200 ?DELIVERY_CHARGES:FREE_DELIVERY}</span>
                    </h2>
                    <span className='totalLine'></span>
                    <h2 className='total'>
                        <span>Total Amount: </span>
                        <span>₹ {total + DELIVERY_CHARGES + ((total * TAX) / 100)}</span>
                    </h2>
                    </div>
                    <button className='orderBtn' onClick={order}>Order Now <i className="bi bi-fast-forward-circle-fill"></i></button>
                </div>
            </div>:<EmptyCart/>
}
            <Footer />
        </div>
    )
}

export default page