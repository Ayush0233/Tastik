"use client"
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import logo from "../images/logo.png"
import Image from 'next/image';
import '../_components/header.css'
// import './login.css'
import { usePathname, useRouter } from 'next/navigation';
const CustomerHeader = (props) => {
  const userStorage = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(userStorage ? userStorage : undefined)
  let data = JSON.parse(localStorage.getItem("restaurantUser"));
  const cartStorage = JSON.parse(localStorage.getItem('cart'))
  const [cartNumber, setCartNumber] = useState(cartStorage?.length)
  const [cartItem, setCartItem] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (props.cartData) {
      console.log(props);
      if (cartNumber) {
        if (cartItem[0]?.resto_id != props.cartData.resto_id) {
          localStorage.removeItem('cart')
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem('cart', JSON.stringify([props.cartData]))
          alert("Previous Items are Deleted, Select Order From only One Restaurant at a time..!")
        }
        else {
          const isDuplicate = cartItem.some(item => item._id == props.cartData._id)
          if (!isDuplicate) {
            let localCartItem = cartItem;
            localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
            setCartItem(localCartItem);
            setCartNumber(cartNumber + 1)
            localStorage.setItem('cart', JSON.stringify(localCartItem))
          }
        }
      }
      else {
        setCartNumber(1)
        setCartItem([props.cartData])
        localStorage.setItem('cart', JSON.stringify([props.cartData]))
      }

    }
  }, [props.cartData])

  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem.filter((item) => {
        return item._id != props.removeCartData;
      })
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1)
      localStorage.setItem('cart', JSON.stringify(localCartItem))
      if (localCartItem == 0) {
        localStorage.removeItem('cart')
        // router.push('/')
      }
    }
  }, [props.removeCartData])

  useEffect(()=>{
    if(user && pathName == "/user-auth"){
      router.push('/')
    }
    else if(data && pathName == "/user-auth"){
      router.push('/')
    }
  },[])
  useEffect(()=>{
    if(props.removeCartData==true){
      setCartItem([])
      setCartNumber(0)
      localStorage.removeItem('cart')
    }
  },[props.removeCartData])
  const logout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem("cart")
    localStorage.removeItem("restaurantUser")
    router.push('/user-auth')
  }
  return (
    <div className="header">
      <div className="logo">
        <Image src={logo} className="logoImg" alt="logo" />
      </div>
      <div className="lists">
        <ul>
          <li className="links">
            <Link href="/">Home</Link>
          </li>

          <li className="links">
            <Link href="/">About</Link>
          </li>
          <li className="links">
            <Link href="/">Contact</Link>
          </li>
          {/* {
            details && details.name ?
              <> */}
          <li className="links">
            <Link href="/cart"><i className="bi bi-bag-heart-fill"></i><sup className='text-purple-600 text-xl  font-bold'>+{cartNumber ? cartNumber : 0}</sup></Link>

          </li>
          {
            user || data ? <>
            <li className="links">
                  <Link href="/profile">{user?.name ?? data?.name}</Link>
                </li>
                <li className="login">
                    <button onClick={logout}>Logout</button>
                </li>
            </>
              : <>
                <li className=" login">
                  <Link href="/user-auth">Login</Link>
                </li>

                
                <li className="login">
                  <Link href="/restaurants">Restaurant Login</Link>
                </li>
              </>
          }
          {/* <li>
                  <button  className="logout rounded ">Logout</button>
                </li> */}
                {/* </> : */}
        </ul>
      </div>
    </div>
  )
}

export default CustomerHeader;