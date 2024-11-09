// src/components/PromoCards.js

import React from "react";
// import './PromoCards.css';

const PromoCards = () => {
  const promoItems = [
    { title: "20% Off On Tank Tops", buttonText: "Shop Now", imgSrc: "src\\Images\\Bookcase2.png" },
    { title: "Latest Eyewear For You", buttonText: "Shop Now", imgSrc: "src\\Images\\Bookcase2.png" },
    { title: "Let's Lorem Suit Up!", buttonText: "Check Out", imgSrc: "src\\Images\\Bookcase2.png" },
  ];

  return (
    <div className="promo-cards">
      {promoItems.map((item, index) => (
        <div className="promo-card" key={index}>
          <img src={`../src/images/${item.imgSrc}`} alt={item.title} />
          <div className="promo-text">
            <h3>{item.title}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>{item.buttonText}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCards;
