'use client'
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/footer'
import Orders from '../_components/orders'
import Profile from '../_components/profile'
import  { useRouter } from 'next/navigation'

const Page = () => {
    const [loadOrders,setLoadOrders ]= useState(false);
    const [loadProfile,setLoadProfile ]= useState(true);
    const router = useRouter();
    const getMyOrders = ()=>{
        setLoadOrders(true);
        setLoadProfile(false)
    }
    const getMyProfile = ()=>{
        setLoadProfile(true)
        setLoadOrders(false)
    }
    return (
        <div>
            <CustomerHeader />
            <div className='profile-Wrapper'>
                <div className='profileHeading'>
                    <h1>Profile</h1>
                    
                </div>
                <div className='OrderAction'>
                    <div className='Fetchbuttons'>
                    <button onClick={getMyProfile}>Profile</button>    
                    <button onClick={getMyOrders}>Orders</button>
                    <button onClick={()=>router.push('/restaurants/dashboard')}>Dashboard</button>
                    </div>
                    <div className='FetchOrders'>
                        {
                           loadOrders?<Orders/>
                           :loadProfile?<Profile/>
                           :<></>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page