import React, { useEffect, useState } from 'react'
import './orders.css'
const Profile = () => {
  const [user, setUser] = useState(null);
  const [resto, setResto] = useState(null);
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const storedResto = localStorage.getItem('restaurantUser');

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  if (storedResto) {
    setResto(JSON.parse(storedResto));
  }
}, []);
  // const restaurant = JSON.parse(localStorage.getItem('restaurantUser'))
  return (
    <div className='orders-wrapper'>
      <h1>Details</h1>
        <div className='profile'>
          <h2> <span>Name: </span><span>{user?.name ?? resto?.name}</span> </h2>
          <h2> <span>Contact: </span><span>{user?.contact ?? resto?.number}</span> </h2>
          <h2> <span>City: </span><span>{user?.city ?? resto?.city}</span> </h2>
          <h2> <span>Address: </span><span>{user?.address ?? resto?.address}</span> </h2>
      </div>
    </div>
  )
}

export default Profile  