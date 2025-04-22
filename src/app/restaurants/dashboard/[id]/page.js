'use client'
import { useEffect, useState } from "react"
import "../dashboard.css"
import { useRouter } from "next/navigation"
const EditFoodItem = (props) => {
    useEffect(()=>{
        // HandleEditfood();
        HandleLoadfood();
    },[])
    const id = props.params.id;
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter();
    const HandleLoadfood = async() => {
        let response = await fetch("https://tastik-food.vercel.app/api/restaurants/foods/edit/"+id);
        response = await response.json();
        if(response.success){
            // console.log(response)
            setName(response.result.name);
            setPrice(response.result.price);
            setImage(response.result.image);
            setDescription(response.result.description)
        }
    }
    const HandleEditfood = async (e)=>{
        e.preventDefault()
        let response = await fetch("https://tastik-food.vercel.app/api/restaurants/foods/edit/"+id,{
            method: "PUT",
            body:JSON.stringify({name, price, image, description})
        })
        response = await response.json();
        console.log(response);
        
        if(response.success){
            router.push("/restaurants/dashboard/")
        }

    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="Additems itemSection">
            <button onClick={()=>router.push("/restaurants/dashboard/")} className="Backbutton">⬅️</button>
            <h2>Update Food Items</h2>
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Food Name" />
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Food Price in ₹" />
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter Food Image" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Food Description" />
                <button onClick={HandleEditfood}>Edit</button>
            </form>
        </div>
        </div>
    )
}
export default EditFoodItem;