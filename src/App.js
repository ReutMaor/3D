import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from './character.js';
import backgroundImage1 from './background/1.jpg';
import backgroundImage2 from './background/2.jpg'; // Assume this is your second background image
import backgroundImage3 from './background/3.jpg';
import backgroundImage4 from './background/4.jpg';
import backgroundImage5 from './background/5.jpg';
import './App.css';

function App() {
  const backgrounds = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5];
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const goToNextBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  const goToPreviousBackground = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length);
  };

    const appStyle = {
    backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={appStyle}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Character />
        <OrbitControls />
      </Canvas>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={goToPreviousBackground}
      >
        &lt;
      </button>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={goToNextBackground}
      >
        &gt;
      </button>
    </div>
  );
}

export default App;