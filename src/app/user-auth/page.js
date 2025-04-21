'use client'
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/footer'
import UserSignUp from '../_components/UserSignups'
import UserLogin from '../_components/UserLogin'


const UserAuth = (props) => {
  const [login, setLogin] = useState(true)
  console.log(props);
  
  return (
    <div className="flex flex-col w-screen items-center restaurant wrapper">
        <CustomerHeader/>
        <div className="form-wrapper">
          { 
              login ?<UserLogin redirect = {props.searchParams} />  : <UserSignUp redirect ={props.searchParams} />
          }
          <button onClick={() => setLogin(!login)} className="bg-pink-400 p-1 rounded cursor-pointer">
                    {
                        login ? "Register" : "Already have Account ?"
                    }
                </button>
        </div>
        <Footer/>
    </div>
  )
}

export default UserAuth;