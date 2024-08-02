import backgroundImage from './background/861.jpg';
import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from './character.js';

function App() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }; 
  return (
    <div style={appStyle}>
        <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Character/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
