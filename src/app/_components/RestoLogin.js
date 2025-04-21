import { useState } from "react"
import "./login.css"
import { useRouter } from "next/navigation";

const RestoLogin= ()=>{
    const  [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const router = useRouter();

    const handleLogin = async(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError(true);
            return false;
        }else{
            setError(false);
        }
        let response = await fetch("http://localhost:3000/api/restaurants",{
            method:"POST",
            body:JSON.stringify({email,password,login:true})
        });
        response = await response.json();
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("/restaurants/dashboard")
        }
        else{
            alert("Invalid Credentials")
        }
        console.log(email, password)
    }
    return(
        <div className="RestoForm">
            <h1>Restaurant Login</h1>
            <form>
                {/* <input type="text" placeholder="Enter Username"/> */}
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                {error && !email?<span>Please enter Email</span>:<span></span>}
                <input type="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                {error && !password?<span>Please enter Password</span>:<span></span>}
                <button type="submit" onClick={handleLogin} className="rounded-md pb-5">Login</button>
            </form>
        </div>
    )
}
export default RestoLogin;