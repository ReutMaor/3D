import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import modelPath from './charc/death_fire.glb';
//import TextBubble from './TextBubble.js';

function Character() {
    const { scene } = useGLTF(modelPath);
    const characterRef = useRef();
    const [position, setPosition] = useState([0, -3, 0]);
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        const [x, y, z] = position;
        switch (event.key) {
          case 'ArrowUp':
            setPosition([x, y, z - 0.1]);
            break;
          case 'ArrowDown':
            setPosition([x, y, z + 0.1]);
            break;
          case 'ArrowLeft':
            setPosition([x - 0.1, y, z]);
            break;
          case 'ArrowRight':
            setPosition([x + 0.1, y, z]);
            break;
          default:
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [position]);
  
    useFrame(() => {
      if (characterRef.current) {
        characterRef.current.position.set(...position);
      }
    });
  
    return (
      <>
        <primitive ref={characterRef} object={scene} />
      </>
    );
  }
  
  export default Character;