// src/components/Banner.js

import React, { useRef } from "react";
import "./Banner.css"; // Assuming a CSS file for styling

const Banner = () => {

  const handleShopNowClick = () => {
    const element = document.querySelector(".products");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  };
  return (
    <div className="banner">
      <div className="image-container">
            <img src="../src/images/banner_empty.jpg" alt="Banner" className="banner-image" />
            </div>
      <div className="banner-text">
        <h1>Raining Offers For Hot Summer!</h1>
        <p>25% Off On All Products</p>
        <div className="banner-buttons">
          <button className="shop-now" onClick={handleShopNowClick}>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
