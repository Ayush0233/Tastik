"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import Image from "next/image";
import "../_components/header.css";
import { usePathname, useRouter } from "next/navigation";

const CustomerHeader = ({ cartData, removeCartData }) => {
  const [userStorage, setUserStorage] = useState(null);
  const [restoStorage, setRestoStorage] = useState(null);
  const [cartItem, setCartItem] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  // — Load user & restaurant once
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUserStorage(JSON.parse(u));

    const r = localStorage.getItem("restaurantUser");
    if (r) setRestoStorage(JSON.parse(r));
  }, []);

  // — Initialize cart once
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItem(JSON.parse(stored));
  }, []);

  // — Add an item when cartData prop changes
  useEffect(() => {
    if (!cartData) return;

    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    if (
      existing.length > 0 &&
      existing[0].resto_id !== cartData.resto_id
    ) {
      alert("Please order from one restaurant at a time.");
      const newCart = [cartData];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItem(newCart);
    } else {
      const isDup = existing.some((i) => i._id === cartData._id);
      if (!isDup) {
        const newCart = [...existing, cartData];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCartItem(newCart);
      }
    }
  }, [cartData]);

  // — Remove/clear cart when removeCartData flag becomes true
  useEffect(() => {
    if (!removeCartData) return;

    // If you ever need “remove by ID,” pass the ID instead of true.
    // Here we assume removeCartData===true means “clear all.”
    localStorage.removeItem("cart");
    setCartItem([]);
  }, [removeCartData]);

  // — Redirect authenticated users off the auth page
  useEffect(() => {
    if ((userStorage || restoStorage) && pathName === "/user-auth") {
      router.push("/");
    }
  }, [userStorage, restoStorage, pathName, router]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("restaurantUser");
    router.push("/user-auth");
  };

  return (
    <div className="header">
      <div className="logo">
        <Image src={logo} className="logoImg" alt="logo" />
      </div>
      <div className="lists">
        <ul>
          <li className="links"><Link href="/">Home</Link></li>
          <li className="links"><Link href="/">About</Link></li>
          <li className="links"><Link href="/">Contact</Link></li>
          <li className="links">
            <Link href="/cart">
              <i className="bi bi-bag-heart-fill"></i>
              <sup className='text-purple-600 text-xl font-bold'>
                +{cartItem.length}
              </sup>
            </Link>
          </li>

          {userStorage || restoStorage ? (
            <>
              <li className="links">
                <Link href="/profile">
                  {userStorage?.name ?? restoStorage?.name}
                </Link>
              </li>
              <li className="login">
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="login"><Link href="/user-auth">Login</Link></li>
              <li className="login"><Link href="/restaurants">Restaurant Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
