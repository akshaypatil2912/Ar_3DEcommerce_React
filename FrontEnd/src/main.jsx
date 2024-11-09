import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import myStore from './Components/Store/index.js'
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ARTryOn from "./Components/ARTryOn";
import ArTryOnV2 from "./Components/ArTryOnV2";
import HomePage from "./Components/HomePage";
import BuyNowPage from "./Components/BuyNowPage";
import Bag from "./Components/Bag";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeItems from './Components/Homeitems.jsx';
import PaymentWrapper from './Components/PaymentPage.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import AccountSettingsForm from './Components/AccountSettingsForm.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path:"/", element :<Login></Login>},
        {path:"SignUp" ,element :<SignUp ></SignUp>},
        {path:"ARTryOn/:imageName", element :<ARTryOn></ARTryOn>},
        {path:"ArTryOnV2", element :<ArTryOnV2></ArTryOnV2>},
        {path:"BuyNow", element :<BuyNowPage></BuyNowPage>},
        {path:"AccountSettingsForm" ,element:<AccountSettingsForm />}

    ],
  },
  {
    path: "/HomePage",
    element: <HomePage />,
    children: [
        {path:"", element:<HomeItems></HomeItems>},
        {path:"bag", element:<Bag></Bag>},
        {path:"PaymentPage", element:<PaymentWrapper></PaymentWrapper>},
        {path:"profile" ,element:<ProfilePage/>}
    ],
  },
  

]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={myStore}>
      <RouterProvider router={router} />
    </Provider>
);

