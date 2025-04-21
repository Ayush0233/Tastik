'use client'
import Image from "next/image";
import Header from "./_components/header";
import Footer from "./_components/footer";
import CustomerHeader from "./_components/CustomerHeader";
import burger from "./images/burger.png"
import pizza from './images/pizza.png'
import momos from './images/momos.png'
import threads from './images/threads.png'
import fastdelivery from './images/fastdelivery.png'
import giftcards from './images/giftcards.png'
import vegmode from './images/vegmode.png'
import meal from './images/meal.png'
import offers from './images/offers.png'
import healthy from './images/healthy.png'
import combopack from './images/combopack.png'
import gourmet from './images/gourmet.png'
import logo from './images/logo.png'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([])
  const [selectLocation, setSelectLocation] = useState("")
  const [showList, setShowList] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter();
  useEffect(() => {
    loadLocations();
    handleLoadRestaurant();
  }, [])
  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result)
    }
  }
  const handleLoadRestaurant = async (params) => {
    let url = "http://localhost:3000/api/customer"
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    // console.log(response);
    if (response.success) {
      setRestaurants(response.result)
    }
  }
  const handleListItems = (item) => {
    setSelectLocation(item)
    setShowList(false)
    handleLoadRestaurant({ location: item })
  }
  console.log(restaurants)
  return (
    <div className="">
      <CustomerHeader />
      <div>
        <div className="placeSelection flex flex-col items-center h-40 justify-center">
          <h1 className="z-10 w-150 text-center bg-pink-600 rounded-2xl p-4">Taste at <span className="   rounded ">Tastik</span></h1>
          <div className="placeSelection1 z-10">
            <div className="location-wrpper">
              <input type="text" value={selectLocation}
                onClick={() => setShowList(true)}
                onChange={(e) => setSelectLocation(e.target.value)}
                placeholder="Select place"
                className="w-50 border-r-2 border-dashed" />
              <ul className="locationList w-50">
                {
                  showList && locations.map((item) => (
                    <li onClick={() => handleListItems(item)} key={item}>{item}</li>
                  ))
                }
              </ul>
            </div>
            <div className="location-wrpper">
              <input type="text"
                placeholder="Enter Food or Restaurant"
                onChange={(e) => handleLoadRestaurant({ restaurant: e.target.value })}
                className="w-90" />
            </div>
          </div>
        </div>
        <div className="adverting">
          <Image src={threads} alt="thread" className=" thread" />
          <Image src={threads} alt="thread1" className=" thread1" />
          <Image src={burger} alt="burger" className="foodimg burger" />
          <Image src={pizza} alt="pizza" className="pizza foodimg" />
          <Image src={momos} alt="momos" className="momos foodimg" />
          <div className="advertingtext">
            <h2>Better Food <br /> with <br /> Best Restaurants</h2>
            <p>Within Few Years, we’ve enabled our customers to discover new tastes, delivered right to their doorstep</p>
          </div>
          <div className="locationandAll">
            <div className="record border-r-2 border-dashed">
              <h2>3000+</h2>
              <h4>restaurants</h4>
            </div>
            <div className="record border-r-2 border-dashed">
              <h2>50+</h2>
              <h4>Cities</h4>
            </div>
            <div className="record">
              <h2>1 Cr+</h2>
              <h4>orders delivered</h4>
            </div>
          </div>
        </div>
        <div className="restaurantsList" id="restaurantsList">
          {
            restaurants.map((item) => {
              return (
                <div className="restoCards" key={item._id}>
                  <div className="flex justify-between">
                    <h3 key={item._id}>{item.name}</h3>
                    <button onClick={()=>router.push("/explore/"+item.name+"?id="+item._id)} className="redBtn">Explore</button>
                  </div>
                  <div className="flex justify-between">
                    <h4>Location: {item.city}, <br/> {item.address}</h4>
                    <h4>Contact: {item.number}</h4>
                  </div>

                </div>

              )
            })
          }
        </div>
        <div className="waitQues advertingtext">
          <h2 className="">What's waiting you to Order..?</h2>
          <p>Our restaurants are ready to serve you with the best food and services.</p>
          <Image src={logo} alt="logo" className="w-70" />
          <span className="blurDiv"></span>
          <div className="advertingCards vegmode">
            <Image src={vegmode} alt="vegmode" className="advertingiImg " />
            <h4>VegMode</h4>
          </div>
          <div className="advertingCards combopack">
            <Image src={combopack} alt="vegmode" className="advertingiImg " />
            <h4>Combo Pack</h4>
          </div>
          <div className="advertingCards meal">
            <Image src={meal} alt="vegmode" className="advertingiImg " />
            <h4>Meal</h4>
          </div>
          <div className="advertingCards gourmet">
            <Image src={gourmet} alt="vegmode" className="advertingiImg gourmet" />
            <h4>Gourmet</h4>
          </div>
          <div className="advertingCards offers">
            <Image src={offers} alt="vegmode" className="advertingiImg " />
            <h4>Offers</h4>
          </div>
          <div className="advertingCards giftcards">
            <Image src={giftcards} alt="vegmode" className="advertingiImg " />
            <h4>Gift Cards</h4>
          </div>
          <div className="advertingCards healthy">
            <Image src={healthy} alt="vegmode" className="advertingiImg " />
            <h4>Healthy</h4>
          </div>
          <div className="advertingCards fastdelivery">
            <Image src={fastdelivery} alt="vegmode" className="advertingiImg " />
            <h4>Fast Delivery</h4>
          </div>
        </div>

      </div>
      {/* <Header/> */}
      {/* <h1 className="text-5xl font-bold mb-4">SnapIt</h1> */}
      <Footer />
    </div>
  )
}
