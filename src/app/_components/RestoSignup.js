'use client'
import { useRouter } from "next/navigation"
import "./login.css"
import { useState } from "react"
const RestoSignup=()=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSignup = async(e)=>{
        e.preventDefault();
        let response = await fetch("http://localhost:3000/api/restaurants",{
            method:"POST",
            body:JSON.stringify({name,email,password,number,city,address,password})
        })
        response = await response.json();
        // console.log(name, email, number, city, address, password)
        console.log(response);
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("/restaurants/dashboard")
        }
    }    
    return(
        <div className="RestoForm">
            <h1>Restaurant Sign up</h1>
            <form>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Username"/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                <input type="tele"value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Enter Phone Number"/>
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City"/>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Full Address"/>
                <input type="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create Password"/>
                <button onClick={handleSignup}>Sign Up</button>
            </form>
        </div>
    )
}
export default RestoSignup;