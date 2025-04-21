import { useEffect, useState } from "react";
import "./fooditem.css"
import { useRouter } from "next/navigation";
const ViewFoodItems = () => {
    const router = useRouter();
    // let restoData = JSON.parse(localStorage.getItem("restaurantUser"))
    // let id = restoData._id;
    const [foodItems, setFoodItems] = useState([])
    useEffect(() => {
        getfoodItems();
    }, [])

    const getfoodItems = async () => {
        let restoData = JSON.parse(localStorage.getItem("restaurantUser"))
        let id = restoData._id;
        let response = await fetch("http://localhost:3000/api/restaurants/foods/" + id)
        response = await response.json();
        // console.log(response)
        if (response.success) {
            setFoodItems(response.result)
        } else {
            alert("Food Item list not found")
        }

    }
    const deleteItem = async (foodId) => {
        let response = await fetch("http://localhost:3000/api/restaurants/foods/" + foodId, {
            method: "DELETE",
        });
        response = await response.json();
        if (response.success) {
            getfoodItems();
        }else{
            alert("Unable to Delete")
        }
    }
    console.log(foodItems)
    return (
        <div className="viewItems itemSection">
            <h2>View Food Items</h2>
            <div className="Fooditems">
                {
                    foodItems.map((item, key) => {
                        return (
                            <div className="fooditem" key={key}>
                                <img src={item.image} />
                                <div className="itemDetail">
                                    <div className="nameAndPrice">
                                        <h3>
                                            {item.name}
                                        </h3>
                                        <h3>₹ {item.price}</h3>
                                    </div>
                                    <p><span className="text-white font-bold">Description:</span> {item.description} </p>
                                    <div className="delUpBtn">
                                        <button onClick={()=>{router.push("/restaurants/dashboard/"+item._id)}} className="editbtn">Edit</button>
                                        <button onClick={()=>deleteItem(item._id)} className="deletebtn">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ViewFoodItems;