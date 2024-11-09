import { useSelector } from "react-redux";
import ProductData from "./ProductData";
import LoadingSpinner from './LoadingSpinner';
import { Outlet } from 'react-router-dom'; // Import Outlet


const HomeItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  return (
    <>
    {console.log("HomeItems component is rendering")}
      <ProductData/>
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      </>
  );
};

export default HomeItems;
