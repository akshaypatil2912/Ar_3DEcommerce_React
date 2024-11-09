import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaCheck } from 'react-icons/fa';
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "./Store/bagSlice";
import axios from 'axios';
import React, { useState, useRef, useEffect } from "react";
import "../index.css"; // Import the CSS file here
import "./Homepage.css"; // Import the CSS file here

function Product({ items }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to control expand/collapse
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(items.id) >= 0;
  const hasFetchedCartDetails = useRef(false); // Track if data has been fetched

  const getOnLoadCartDetailsForUser = async () => {
    let userid=sessionStorage.getItem('UserId');
    const response = await axios.get("https://localhost:44306/GetCartDetailsForUser?UserId="+userid, {
      headers: { 'Content-Type': 'application/json' }
    });
    response.data.cartdetails.forEach(async (items) => {
      if (!bagItems.includes(items.productId)) {
        dispatch(bagActions.addToBag(items.productId));
      }
    });
  };

  useEffect(() => {
    if (!hasFetchedCartDetails.current) {
      getOnLoadCartDetailsForUser();
      hasFetchedCartDetails.current = true;
    }
  }, []);

  const handleAddToBag = async () => {
    const ProductId = items.id;
    const body = { UserId: 1, UserName: sessionStorage.getItem('userName'), ProductId };

    await axios.post("https://localhost:44306/AddToCartForUser", body, {
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch(bagActions.addToBag(items.id));
  };

  const handleRemove = async () => {
    const ProductId = items.id;
    const body = { UserId: 1, UserName: sessionStorage.getItem('userName'), ProductId };

    await axios.post("https://localhost:44306/RemoveProductFromCartForUser", body, {
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch(bagActions.removeFromBag(items.id));
  };

  const openSelectedImage = (event) => {
    let imageName = event.target.alt;
    navigate(`/ARTryOn/${imageName}`);
  };

  // Toggle details view
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="product-card">
      <img className="item-image" src={items.imgSrc} alt={items.imagename} onClick={openSelectedImage} />
      <div className="item-content">
        <h3 className="item-title">{items.imagename}</h3>
        <div className="rating">
   {items.rating_stars/items.rating_count} ⭐ | {items.rating_count} 
</div>
{ <div className="company-name">{items.company}</div> }
        <div className="price">
          <span className="current-price">Rs {items.current_price}</span>
          <span className="original-price">Rs {items.original_price}</span>
        </div>
      </div>

      {elementFound ? (
        <button type="button" className="btn btn-remove btn-danger" onClick={handleRemove}>
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button type="button" className="btn btn-add-bag btn-success" onClick={handleAddToBag}>
          <GrAddCircle /> Add to Bag
        </button>
      )}

<button type="button" className="btn btn-details" onClick={toggleDetails}  style={{ color: 'black' ,fontSize: "small"}}>
        {isExpanded ? "Details" : "Details"}
      </button>

      {isExpanded && (
        <div className="item-details">
          <p>{items.description}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default Product;
