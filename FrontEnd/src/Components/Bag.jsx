// import BagItem from "../components/BagItem";
import BagItem from "./BagItem";
 import { useSelector } from "react-redux";
import BagSummary from "./BagSummary";
import Header from "./Header";
import Footer from "./Footer";
import '../Index.css';
import './HomePage.css';
import { useEffect,useRef  } from 'react';
import axios from 'axios';
import {useDispatch } from "react-redux";
import { bagActions } from "./Store/bagSlice";

 const Bag = () => {
  let finalItems=[];
   const bagItems = useSelector((state) => state.bag);
   const items = useSelector((state) => state.items);
   if(items.allItems){
    finalItems = items.allItems.filter((item) => {
     const itemIndex = bagItems.indexOf(item.id);
     return itemIndex >= 0;
  })};
  const dispatch = useDispatch();

  const getOnLoadCartDetailsForUser=async() =>{
    const response = await axios.get("https://localhost:44306/GetCartDetailsForUser?UserId=1"
      , {
      headers: {
        'Content-Type': 'application/json',
      }
    } );
    response.data.cartdetails.forEach(async (items) => {
 if(!bagItems.includes(items.productId)){
      dispatch(bagActions.addToBag(items.productId));
 }
      })
 
  }

  useEffect(() => {
      getOnLoadCartDetailsForUser();
  }, []); 

  
  return (
     <main>
      <div className="bag-page">
        <div className="bag-items-container">
           {finalItems.map((item) => (
            <BagItem item={item} />
          ))} 
        </div>
        <BagSummary />
      </div>
     </main>
  );
};

export default Bag;
