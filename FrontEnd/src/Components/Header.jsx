import { BsFillPersonFill } from "react-icons/bs";
import { FaFaceGrinHearts, FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
 import { useSelector,useDispatch } from "react-redux";
 import React, { useState } from 'react';
import { itemsActions } from "./Store/itemsSlice";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //const bag = useSelector((store) => store.bag);
  const bag = useSelector((store) => [...new Set(store.bag)]);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const element = document.querySelector(".products");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(itemsActions.filterItems(term)); // Dispatch action to filter items
 };

  return (
    <header>
      <div className="logo_container">
        <Link to="/homepage">
          <img
            className="myntra_home"
            src="../src/images/logoecommerce.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>
      {/* <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
      </nav> */}
      <div className="search_bar">
        {/* <span className="material-symbols-outlined search_icon"></span> */}
        <input
          className="search_input"
          placeholder="Search for products with name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="action_bar">
        <Link className="action_container" to="/Homepage/profile">
          <BsFillPersonFill />
          <span className="action_name">Profile</span>
        </Link>

        {/* <div className="action_container">
          <FaFaceGrinHearts />
          <span className="action_name">Wishlist</span>
        </div> */}

        <Link className="action_container" to="/Homepage/bag">
          <FaBagShopping />
          <span className="action_name">Bag</span>
          { <span className="bag-item-count">{bag.length}</span> }
        </Link>
      </div>
    </header>
  );
};

export default Header;
