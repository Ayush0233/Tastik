import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UserLogin = (props) => {
    // console.log(props)
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const handleLogin = async() => {
        let response = await fetch("https://tastik-food.vercel.app/api/users/login",{
            method: "POST",
            body:JSON.stringify({email, password})
        })
        response = await response.json()
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if(props?.redirect?.order){
                router.push('/order')
            }else{
                router.push('/')
            }

        }
        else{
            alert("Invalid Email or Password");
        }
    }
    return (
        <div className="RestoForm">
            <h1>User Login</h1>
            <form>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default UserLogin