import React from "react";
import { useLocation } from "react-router-dom";
import "./BuyNowPage.css"; // Custom CSS
import Footer from "./Footer";
import Header from "./Header";
import './HomePage.css';


function BuyNowPage() {
  const location = useLocation();
  const { description, imagename, imgSrc, price } = location.state || {};

  if (!location.state) return <p>Loading product...</p>;

  return (
    <div className="buy-now-page-container">
    <Header></Header>
    <div className="buy-now-page">
      {/* Product Section */}
      <div className="product-details">
        <div className="product-image">
          <img src={imgSrc} alt={imagename} className="image" />
        </div>
        <div className="product-info">
          <h1>{imagename}</h1>
          <p>{description}</p>
          <p className="price">Price: <span>${price}</span></p>
        </div>
      </div>

      {/* Payment Section */}
      <div className="payment-section">
        <h2>Payment Options</h2>
        <p>Select a payment method:</p>
        <form>
          <div className="payment-method">
            <input type="radio" id="creditCard" name="payment" value="creditCard" />
            <label htmlFor="creditCard">
              <i className="fas fa-credit-card"></i> Credit Card
            </label>
          </div>

          <div className="payment-method">
            <input type="radio" id="paypal" name="payment" value="paypal" />
            <label htmlFor="paypal">
              <i className="fab fa-paypal"></i> PayPal
            </label>
          </div>

          <div className="payment-method">
            <input type="radio" id="bankTransfer" name="payment" value="bankTransfer" />
            <label htmlFor="bankTransfer">
              <i className="fas fa-university"></i> Bank Transfer
            </label>
          </div>

          <button type="submit" className="buy-now-button">
            <i className="fas fa-shopping-cart"></i> Proceed to Payment
          </button>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

export default BuyNowPage;
