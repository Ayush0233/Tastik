'use client'
import CustomerHeader from '@/app/_components/CustomerHeader'
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Page = (props) => {
    const [restaurantDetails, setRestaurantDetails] = useState()
    const [foodItems, setFoodItems] = useState([])
    const [cartData, setCartData] = useState()
    const [removeCartData, setRemoveCartData] = useState();
    // const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [cartStorage, setCartStorage] = useState()
    // setCartStorage(cartStorage)
      useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        // setCartStorage([...cartStorage])
        if (storedCart) {
          setCartStorage(JSON.parse(storedCart));
        }
      }, []);
    const [cartIds, setCardIds] = useState(cartStorage?() => cartStorage.map((cartItem) => {
        return cartItem._id
    }):[])
    const router = useRouter();
    let name = props.params.name;
    useEffect(() => {
        LoadRestaurantDetails();
    }, [])
    // console.log(cartIds);
    
    const LoadRestaurantDetails = async () => {
        let id = props.searchParams.id;
        // console.log(id)
        let response = await fetch("http://localhost:3000/api/customer/" + id)
        response = await response.json();
        // console.log(response)
        if (response.success) {
            setRestaurantDetails(response.details);
            setFoodItems(response.foodItems)
        }


    }
    const addtoCart = (item) => {
        setCartData(item)
        let localCartIds = cartIds;
        localCartIds.push(item._id)
        setCardIds(localCartIds)
        setRemoveCartData();
    }
    const removeFromCart=(id)=>{
        setRemoveCartData(id);
        //cartIds contain the unique ids of items
        // cartIds la ashyaprakare filter kela ki je id remove kara sathi aali ahe te 
        // sodun baki sagle Localcartids madhe store honar
        let localCartIds = cartIds.filter(item=>item != id) 
        setCartData()
        //nantr cartIds la localcartIds sobat set karun dila
        setCardIds(localCartIds)
        
    }

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData = {removeCartData} />
            <div>
                <div className="placeSelection flex flex-col items-center justify-center">
                    <h1 className="z-10 ">{decodeURI(name)}</h1>
                    <h3 className=' text-4xl z-10 text-white font-bold mt-2'><i className="bi bi-telephone-inbound-fill text-green-400"></i> {restaurantDetails?.number}</h3>
                </div>
                <div className="foodItemsContainer z-10">
                    <div className="explore-wrpper">
                        {
                            foodItems.map((item) => (
                                <div className='foodcard' key={item._id}>
                                    <div  className='foodItems'>
                                        <div className='foodImageContainer'>
                                            <img src={item.image} alt='image' className='foodimage' />
                                        </div>
                                        <h3>{item.name}</h3>
                                        <h4> ₹ {item.price}</h4>
                                        <p>{item.description}</p>
                                         {
                                            cartIds.includes(item._id) ?
                                                <button className='addtocartBtn' onClick={()=>removeFromCart(item._id)}><i className="bi bi-bag-check-fill"></i></button>
                                            :    
                                             <button className='addtocartBtn' onClick={() => addtoCart(item)}><i className="bi bi-bag-plus-fill"></i></button>
                                            }
                                            </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Page;