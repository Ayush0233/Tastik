'use client'
import Header from "@/app/_components/header"
import "./dashboard.css"
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
import Footer from "@/app/_components/footer";
import ViewFoodItems from "@/app/_components/ViewFoodItems";
const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    return (
        <div className="restoDashboard wrapper">
            <Header />
            <div>
                <h1 className="text-4xl text-center">Owners Dashboard</h1>

                <div className="Items">
                    <div className="btnDiv">
                        <button onClick={() => { setAddItem(true) }}>Add Items</button>
                        <button onClick={() => setAddItem(false)}>DashBoard</button>
                    </div>

                    {
                        addItem ? <AddFoodItem /> : <ViewFoodItems/>
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Dashboard;