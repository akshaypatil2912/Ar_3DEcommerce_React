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
import PromoCards from "./PromoCards";

function Getallproductdata() {
  const [products, setProducts] = useState([]);
  const [selectedproduct, setSelectedProduct] = useState(null);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const productssss = useSelector((state) => state.items.filteredItems);


  const handleBuyProduct = (productData)=>{
    setSelectedProduct(productData);
    navigate('/BuyNow',{state : productData});
  }

  const loadProducts = async (e) => {
    try {
      dispatch(fetchStatusActions.markFetchingStarted());
      const response = await axios.get("https://localhost:44306/GetAllProducts");
      // const response = await new Promise((resolve) => {
      //   setTimeout(async () => {
      //     const res = await axios.get("http://localhost:5170/GetAllProducts");
      //     resolve(res);
      //   }, 3000); // Delay of 4 seconds (4000 ms)
      // });
      if (response) {
        console.log(response);
        setProducts(response.data.products);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
        dispatch(itemsActions.addInitialItems(response.data.products))
      }
    } catch (error) {
        console.error('Error fetching data:', error);
      }  
  };

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    loadProducts(); 
  }, []); 

  return (
    <>
    {/* <PromoCards /> */}
    </>
  );
}

export default Getallproductdata;
