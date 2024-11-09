import React from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import ProductData from './ProductData';
import { CartProvider } from './CartContext';
import '../Index.css';
import LoadingSpinner from './LoadingSpinner';
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom'; // Import Outlet
import HomeItems from './Homeitems';
import Getallproductdata from './Getallproductdata';



// App Component
function HomePage() {
  const fetchStatus = useSelector((store) => store.fetchStatus);

  return (
    <div className="HomePage">
      <Header />
      <Getallproductdata/>
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      <Footer />

    </div>
  );
}

export default HomePage;
