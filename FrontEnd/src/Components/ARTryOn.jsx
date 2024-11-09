// src/ARTryOn.js
import React from "react";
import '@google/model-viewer';
import { useParams } from 'react-router-dom';


const ARTryOn = () => {
  const { imageName } = useParams(); // Access URL param
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Try on Necklace in AR</h2>

      {/* Model-Viewer component for displaying 3D model and enabling AR */}
      <model-viewer
 // src="/Tshirt.glb"
 src={`/${imageName}.glb`}
 // src="/3dGlasses.glb"
    alt="A 3D model of a bookcase"
  ar
  ar-modes="scene-viewer webxr quick-look"
  environment-image="neutral"
  camera-controls
  shadow-intensity="1"
  style={{ width: '50%', height: '500px' }}
  scale="1 1 1"  // Adjust scale if necessary

  //style={{ width: '100%', height: '500px', transform: 'scale(1)', transformOrigin: 'center' }} // Scale down to 50%
>
</model-viewer>


      <p>Tap the AR button to try on this necklace in augmented reality.</p>
    </div>
  );
};

export default ARTryOn;
