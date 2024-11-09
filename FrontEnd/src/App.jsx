import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ARTryOn from "./Components/ARTryOn";
import ArTryOnV2 from "./Components/ArTryOnV2";
import HomePage from "./Components/HomePage";
import BuyNowPage from "./Components/BuyNowPage";
import Bag from "./Components/Bag";
import { Outlet } from 'react-router-dom'; // Import Outlet
import { useSelector } from "react-redux";
import LoadingSpinner from "./Components/LoadingSpinner";


function App() {
  // const handleLoginClick = (userName, password) => {
  //   console.log(userName);
  //   console.log(password);


  // };
  const fetchStatus = useSelector((store) => store.fetchStatus);


  const signUpclicked = (userName, password, email) => {
    console.log(userName);
    console.log(password);
    console.log(email);
  };

  return (
    <>
      {/* // <Routes>
      //   <Route path="/" element ={<Login></Login>}/>
      //   <Route path="/SignUp" element ={<SignUp handleSignUpButton={signUpclicked}></SignUp>}/>
      //   <Route path="/ARTryOn/:imageName" element ={<ARTryOn></ARTryOn>}/>
      //   <Route path="/ArTryOnV2" element ={<ArTryOnV2></ArTryOnV2>}/>
      //   <Route path="/HomePage" element ={<HomePage></HomePage>}/>
      //   <Route path="/BuyNow" element ={<BuyNowPage></BuyNowPage>}/>
      //   <Route path="/bag" element ={<Bag></Bag>}/>
      // </Routes> */}
       <Outlet />
      {/* {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />} */}

      </>
  );
  
}

export default App;
