"use client";

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, FREE_DELIVERY, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Order() {
  const [userStorage, setUserStorage] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const total = cartStorage.reduce((sum, item) => sum + item.price, 0) || 0;
  const [cod, setCod] = useState(false);
  const [online, setOnline] = useState(true);
  const [removeCartData, setRemoveCartData] = useState(false);

  const router = useRouter();

  // ── Run just once: load user/cart, and if the cart is empty, bounce to /cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(savedCart);

    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUserStorage(savedUser);

    if (savedCart.length === 0) {
      router.replace("/cart");
    }
  }, [router]);

  const handleCod = () => {
    setOnline(false);
    setCod(true);
  };

  const handleOnline = () => {
    setCod(false);
    setOnline(true);
  };

  const placeOrder = async () => {
    // 🛑 Prevent submission if cart is empty
    if (cartStorage.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const collection = {
      user_id: user._id,
      foodItem_id: cart.map((item) => item._id).toString(),
      resto_id: cart[0].resto_id,
      resto_name: cart[0].resto_name,
      deliveryBoy_id: "67ec14177114cd08ccfe4735",
      status: "confirm",
      amount: total + DELIVERY_CHARGES + (total * TAX) / 100,
    };

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        body: JSON.stringify(collection),
      });
      const data = await res.json();

      if (!data.success) {
        alert("Order Failed");
        return;
      }

      // clear cart once for good—this won't trigger any more redirects
      setRemoveCartData(true);
      localStorage.removeItem("cart");
      setCartStorage([]);

      // navigate based on payment method
      if (cod) router.push("/order/success");
      else router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <CustomerHeader removeCartData={removeCartData} />

      <div>
        {/* Address Details */}
        <div className="summary addressSummary">
          <div className="summaryheading">
            <h1>Address Details</h1>
          </div>
          <div className="priceDetails address">
            <h2>{userStorage?.address}</h2>
            <h2>{userStorage?.city}</h2>
            <h2>{userStorage?.contact}</h2>
          </div>
        </div>

        {/* Order Summary */}
        <div className="summary">
          <div className="summaryheading">
            <h1>Order Summary</h1>
          </div>
          <div className="priceDetails">
            <h2>
              <span>Total: </span>
              <span>₹ {total}</span>
            </h2>
            <h2>
              <span>Tax: </span>
              <span>₹ {(total * TAX) / 100}</span>
            </h2>
            <h2>
              <span>Delivery Charges: </span>
              <span>₹ {total < 200 ? DELIVERY_CHARGES : FREE_DELIVERY}</span>
            </h2>
            <span className="totalLine" />
            <h2 className="total">
              <span>Total Amount: </span>
              <span>₹ {total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
            </h2>
          </div>
        </div>

        {/* Payment Options */}
        <div className="summary">
          <div className="summaryheading">
            <h1>Payment</h1>
          </div>
          <div className="priceDetails paymentSelection">
            <div className="paymentSelection">
              <button onClick={handleCod} className="codbtn">
                <h2 className={cod ? "highlight" : ""}>
                  <span>Cash on Delivery</span>
                  <span>
                    {cod
                      ? <i className="bi bi-check-circle-fill"></i>
                      : <i className="bi bi-circle"></i>}
                  </span>
                </h2>
              </button>
              <button onClick={handleOnline} className="codbtn">
                <h2 className={online ? "highlight" : ""}>
                  <span>UPI / BHIM / Card</span>
                  <span>
                    {online
                      ? <i className="bi bi-check-circle-fill"></i>
                      : <i className="bi bi-circle"></i>}
                  </span>
                </h2>
              </button>
            </div>
            <button className="orderBtn" onClick={placeOrder}>
              Place Order <i className="bi bi-fast-forward-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
