import { useState } from "react";


const AddFoodItem = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const handleAddfood= async()=>{
        // e.preventDefault();
        let resto_id;
        let resto_name;
        const restoData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restoData){
            resto_id = restoData._id;
            resto_name = restoData.name;
        }
        let response = await fetch("http://localhost:3000/api/restaurants/foods",{
            method:"POST",
            body:JSON.stringify({name, price,image,description,resto_id,resto_name})
        })
        response = await response.json();
        if(response.success){
            alert("Food Item Added");
        }
        // console.log(name,price,image,desc);
    }
    return (
        <div className="Additems itemSection">
            <h2>Add Food Items</h2>
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Food Name" />
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Food Price in ₹" />
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter Food Image" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Food Description" />
                <button onClick={handleAddfood}>Add</button>
            </form>
        </div>
    )
}
export default AddFoodItem;