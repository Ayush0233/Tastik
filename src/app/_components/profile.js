import React from 'react'
import './orders.css'
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const restaurant = JSON.parse(localStorage.getItem('restaurantUser'))
  return (
    <div className='orders-wrapper'>
      <h1>Details</h1>
        <div className='profile'>
          <h2> <span>Name: </span><span>{user?.name ?? restaurant.name}</span> </h2>
          <h2> <span>Contact: </span><span>{user?.contact ?? restaurant.number}</span> </h2>
          <h2> <span>City: </span><span>{user?.city ?? restaurant.city}</span> </h2>
          <h2> <span>Address: </span><span>{user?.address ?? restaurant.address}</span> </h2>
      </div>
    </div>
  )
}

export default Profile  