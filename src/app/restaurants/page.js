'use client'
import Footer from "../_components/footer";
import Header from "../_components/header";
import RestoLogin from "../_components/RestoLogin"
import RestoSignup from "../_components/RestoSignup";
import { useState } from "react";
export default function () {
    const [login, setLogin] = useState(true)
    return (
        <div className="flex flex-col w-screen items-center restaurant wrapper">
            <Header />
            {/* <h1>Restaruant Login/Sign Up</h1> */}
            <div className="form-wrapper">
                {
                    login ? <RestoLogin /> : <RestoSignup />
                }
                <button onClick={() => setLogin(!login)} className="bg-pink-400 p-1 rounded cursor-pointer">
                    {
                        login ? "Register" : "Already have Account ?"
                    }
                </button>
            </div>
            <Footer />
        </div>
    )
}