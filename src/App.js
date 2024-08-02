import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from './character.js';
import backgroundImage1 from './background/860.jpg';
import backgroundImage2 from './background/861.jpg'; // Assume this is your second background image
import './App.css';

function App() {
  const [currentBackground, setCurrentBackground] = useState(backgroundImage1);

  const toggleBackground = () => {
    setCurrentBackground((prevBackground) =>
      prevBackground === backgroundImage1 ? backgroundImage2 : backgroundImage1
    );
  };

  const appStyle = {
    backgroundImage: `url(${currentBackground})`,
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
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={toggleBackground}
      >
        Toggle Background
      </button>
    </div>
  );
}

export default App