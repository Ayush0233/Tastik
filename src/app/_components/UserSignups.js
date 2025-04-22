// "use client"
import React, { useState } from 'react'
import "./login.css"
import { useRouter } from 'next/navigation'
// import "./header.css"
const UserSignUp = (props) => {
  const router = useRouter();
  const [name, setName] = useState('')
      const [email, setEmail] = useState("")
      const [contact, setContact] = useState("")
      const [city, setCity] = useState("")
      const [address, setAddress] = useState("")
      const [password, setPassword] = useState("");
      
      const handleSignup = async(e)=>{
        e.preventDefault();
        console.log(name, city, email,contact, address, password);
        let response = await fetch("https://tastik-food.vercel.app/api/users",{
          method: "POST",
          body:JSON.stringify({name, email, contact, city, address, password})
        });
        response  = await response.json();
        // console.log(result);
        if(response.success){
          alert("Signup Successfully")
          const {result} = response;
          delete result.password;
          localStorage.setItem("user",JSON.stringify(result));
          if(props?.redirect?.order){
            router.push('/order')
          }else{
            router.push("/");
          }
        }else{
          alert("Signup Failed")
        }
      }
  return (
    <div className="RestoForm">
            <h1>User Sign up</h1>
            <form>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Username"/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                <input type="tele"value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Enter Contact Number"/>
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City"/>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Full Address"/>
                <input type="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create Password"/>
                <button onClick={handleSignup}>Sign Up</button>
            </form>
        </div>
  )
}

export default UserSignUp;