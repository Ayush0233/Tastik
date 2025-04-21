'use client'
import Link from "next/link"
import logo from "../images/logo.png"
import "./header.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
const Header = () => {
    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        let user = localStorage.getItem('user')
        if (!data && pathName == "/restaurants/dashboard") {
            router.push("/restaurants");
        }
        else if (data && pathName == "/restaurants") {
            router.push("/restaurants/dashboard")
        }
        else if(user && pathName == "/restaurants"){
              router.push('/')
        }
        else {
            setDetails(JSON.parse(data));
        }
    }, [])
    const logout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/restaurants");
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
                    {
                        details && details.name ?
                            <>
                                <li className="links">
                                    <Link href="/restaurants/dashboard">Dashboard</Link>
                                </li>
                                <li className="links">
                                    <Link href="/">{details.name}</Link>
                                </li>
                                
                                <li>
                                    <button onClick={logout} className="logout rounded ">Logout</button>
                                </li>
                            </> :
                            <li className="login">
                                <Link href="/user-auth">Login as User</Link>
                            </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header;