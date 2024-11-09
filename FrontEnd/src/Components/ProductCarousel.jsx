import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel CSS
import { Carousel } from 'react-responsive-carousel';
import glasses3d from "../Images/3dGlasses.png";
import Couch_Small from "../Images/Couch_Small.png";
import "./ProductCarousel.css"; // Assuming a CSS file for styling
import { useNavigate } from "react-router-dom";



function ProductCarousel() {
  const navigate =useNavigate();

  const openSelectedImage =(event)=>{
  
  if(event.target.children[0] !=undefined){
    let imageName=event.target.children[0].alt;
    if(imageName!=undefined){
      navigate(`/ARTryOn/${imageName}`);
    }
  }
  
  }

  return (
    <div className="carousel-container" onClick={openSelectedImage}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        className="product-carousel"
      >
        
       
        <div>
          <img src="src\Images\3dGlasses.png" alt="3dGlasses" className="carousel-image" onClick={openSelectedImage} />
          <p className="legend">3D Glasses - 50% Off!</p>
        </div>
        
        <div>
          <img src="src\Images\Tshirt.png" alt="Tshirt" className="carousel-image" onClick={openSelectedImage}/>
          <p className="legend">Tshirt - 50% Off!</p>
        </div>
        
        <div>
          <img src="src\Images\Stand.png" alt="Stand" className="carousel-image" onClick={openSelectedImage}/>
          <p className="legend">Stand - 50% Off!</p>
        </div>
        
        <div>
          <img src="src\Images\Couch_Small.png" alt="Couch_Small" className="carousel-image" onClick={openSelectedImage}/>
          <p className="legend">Couch_Small - 50% Off!</p>
        </div>
        
        
        
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
