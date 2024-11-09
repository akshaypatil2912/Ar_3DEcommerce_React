import Product from "./Products";
import glasses3d from "../Images/3dGlasses.png"
import bookcase from "../Images/Bookcase2.png"
import Couch_Small from "../Images/Couch_Small.png"
import Glasses from "../Images/Glasses.png"
import Necktie from "../Images/Necktie.png"
import Stand from "../Images/Stand.png"
import Tshirt from "../Images/Tshirt.png"
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyNowPage from "./BuyNowPage";
import { itemsActions } from "./Store/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "./Store/fetchStatusSlice";
import Banner from "./Banner";
import ProductCarousel from "./ProductCarousel";

function ProductData() {
  console.log("ProductData component is rendering");
  const [products, setProducts] = useState([]);
  const [selectedproduct, setSelectedProduct] = useState(null);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const fetchStatus = useSelector((store) => store.fetchStatus);


  const handleBuyProduct = (productData)=>{
    setSelectedProduct(productData);
    navigate('/BuyNow',{state : productData});
  }

  

  return (
    <main className="main" >
                <Banner />
    <h2 style={{ marginTop: '30px'}} >Top Products Offers </h2>

      <ProductCarousel/>

      <h2 style={{ marginTop: '-30px'}} id="Featured_Products">Featured Products</h2>
      <div className="products">
        {items?.filteredItems && items.filteredItems.length > 0 ? (
          items.filteredItems.map((item) => (
            <Product key={item.id} items={item} /> // Make sure to set a unique key for each item
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </main>
  );
}

export default ProductData;


// const products = [
  //     imgSrc: glasses3d,
  //     imagename: "3dGlasses",
  //     description: "This is a description of product 1.",
  //     price: 29.99
  //   },
  //   {
  //     id: 2,
  //     imgSrc: Glasses,
  //     imagename: "Glasses",
  //     description: "This is a description of product 2.",
  //     price: 19.99
  //   },
  //   {
  //     id: 3,
  //     imgSrc: Necktie,
  //     imagename: "Necktie",
  //     description: "This is a description of product 3.",
  //     price: 39.99
  //   },
  //   {
  //     id: 4,
  //     imgSrc: bookcase,
  //     imagename: "Bookcase",
  //     description: "This is a description of product 4.",
  //     price: 49.99
  //   },
  //   {
  //     id: 5,
  //     imgSrc: Couch_Small,
  //     imagename: "Couch_Small",
  //     description: "This is a description of product 5.",
  //     price: 24.99
  //   },
  //   {
  //     id: 6,
  //     imgSrc: Stand,
  //     imagename: "Stand",
  //     description: "This is a description of product 6.",
  //     price: 59.99
  //   },
  //   {
  //     id: 7,
  //     imgSrc: Tshirt,
  //     imagename: "Tshirt",
  //     description: "This is a description of product 7.",
  //     price: 59.99
  //   }
  // ];