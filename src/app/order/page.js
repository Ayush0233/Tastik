"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, FREE_DELIVERY, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Order() {
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')))
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {return a.price + b.price}))
    const [cod, setCod] = useState(false)
    const [online, setOnline] = useState(true)
    const [removeCartData, setRemoveCartData] = useState(false)
    const router = useRouter();

    useEffect(()=>{
        if(!total){
            router.push('/')
        }
    },[total])
    const Codhandle = () => {
        setCod(prev => {
            const next = !prev
            next?
                setOnline(false)
            : setCod(false)// turning COD on → force Online off
            return next
          })
    }
    const handleOnline=()=>{
        setCod(prev=>{
            const next = !prev
            next?
            setCod(false)
           : setOnline(true)
            return next
        })
    }
    const placeOrder = async() => {
        let user_id= JSON.parse(localStorage.getItem('user'))._id;
        let cart= JSON.parse(localStorage.getItem('cart'));
        let foodItem_id = cart.map((item)=>item._id).toString();
        let deliveryBoy_id = '67ec14177114cd08ccfe4735'
        let resto_name = cart[0].resto_name;
        let resto_id = cart[0].resto_id;
        let collection = {
            user_id,
            foodItem_id,
            resto_id,
            resto_name,
            deliveryBoy_id,
            status:'confirm',
            amount:total + DELIVERY_CHARGES + ((total * TAX) / 100),

        }
        console.log(collection);
        let response = await fetch("http://localhost:3000/api/orders",{
            method:"POST",
            body:JSON.stringify(collection)
        })
        response = await response.json();
        console.log(response)
        if (cod == true) {
            router.push('/order/success')
        }
        if(online==true){
            router.push('/')
        }
        if(response.success){
            // alert('Order Placed Successfully')
            setRemoveCartData(true)

        }else{
            alert('Order Failed')
        }
        
        
    }
    return (
        <>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="">
                <div className='summary addressSummary'>
                    <div className='summaryheading'><h1>Address Details</h1></div>
                    <div className=' priceDetails address '>
                        <h2>
                            {userStorage.address}
                        </h2>
                        <h2>
                            {userStorage.city}
                        </h2>
                        <h2>
                            {userStorage.contact}
                        </h2>
                        {/* <span className='totalLine'></span> */}

                    </div>
                    {/* <button className='orderBtn' onClick={placeOrder}>Place Order</button> */}
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
                            <span>₹ {total < 200 ? DELIVERY_CHARGES : FREE_DELIVERY}</span>
                        </h2>
                        <span className='totalLine'></span>
                        <h2 className='total'>
                            <span>Total Amount: </span>
                            <span>₹ {total + DELIVERY_CHARGES + ((total * TAX) / 100)}</span>
                        </h2>
                        {/* <span className='totalLine'></span> */}

                    </div>
                </div>
                <div className="summary">
                    <div className='summaryheading'><h1>Payment</h1></div>
                    <div className="priceDetails paymentSelection">
                        <div className="paymentSelection">
                        <button onClick={Codhandle} className="codbtn">
                            <h2 className={cod ? 'highlight' : ''}>
                                <span>Cash on Delivery</span>
                                <span>{cod ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-circle"></i>}</span>
                            </h2>
                        </button>
                        <button onClick={handleOnline} className="codbtn">
                            <h2 className={online ? 'highlight' : ''}>
                                <span>UPI / BHIM / Card</span>
                                <span>{online ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-circle"></i>}</span>
                            </h2>
                        </button>
                        </div>
                        <button className='orderBtn' onClick={placeOrder}>Place Order <i className="bi bi-fast-forward-circle-fill"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}