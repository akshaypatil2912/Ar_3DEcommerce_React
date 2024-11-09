import React, { useEffect } from 'react';
import 'aframe'; // Import A-Frame to work with WebAR

const ArTryOnV2 = () => {
  useEffect(() => {
    // Initialize 8th Wall SDK when component mounts
    const script = document.createElement('script');
    script.src = "https://cdn.8thwall.com/web/aframe/8frame.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>AR Try-On Necklace</h2>
      <a-scene
        xrweb="true" // Enables WebAR functionality
        face-effects="true" // Enables face tracking
        embedded
        arjs="sourceType: webcam"
        style={{ height: '100vh' }}
      >
        {/* Camera to render the AR scene */}
        <a-camera position="0 0 0"></a-camera>

        {/* 3D Necklace Model - make sure the URL is correct */}
        <a-entity
          id="necklace"
          gltf-model="url(/Necktie.glb)"  // Replace with path to your necklace model
          scale="0.01 0.01 0.01" // Adjust scale to fit face
          position="0 -0.1 -0.5" // Adjust position to match user's neck
        ></a-entity>
      </a-scene>
    </div>
  );
};

export default ArTryOnV2;
