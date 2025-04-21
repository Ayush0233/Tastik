import React from 'react'
import cart from "../images/empty-cart.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const EmptyCart = () => {
    const router = useRouter();
    return (
        <div className='cartempty'>
            <h1>Your Cart is Empty</h1>
            <div className='cartemptyinner '>
                <h2>Nothing here to Order</h2>
                <Image src={cart} alt='cart Image' />
                <button onClick={()=>router.push('/#restaurantsList')}>Order Now</button>
            </div>
        </div>
    )
}

export default EmptyCart