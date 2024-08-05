import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import modelPath from './charc/death_fire.glb';
import TextBubble from './TextBubble.js';
import Polly from './aws_config.js';

const SPEECH_TEXT = "Reut Stop the bullshit";  // Define the constant

function Character() {
    const { scene } = useGLTF(modelPath);
    const characterRef = useRef();
    const [position, setPosition] = useState([0, -3, 0]);
    const [speechUrl, setSpeechUrl] = useState(null);
  
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
          case ' ':
            speak(SPEECH_TEXT); // Trigger speech on spacebar press
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
    const speak = (text) => {
      const params = {
          OutputFormat: 'mp3',
          Text: text,
          VoiceId: 'Joanna', // You can choose other voices as well
      };

      Polly.synthesizeSpeech(params, (err, data) => {
          if (err) {
              console.error(err);
              return;
          }

          const uInt8Array = new Uint8Array(data.AudioStream);
          const blob = new Blob([uInt8Array.buffer], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
          setSpeechUrl(url);
      });
  };


  useEffect(() => {
    if (speechUrl) {
        const audio = new Audio(speechUrl);
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }
}, [speechUrl]);
  
    return (
      <>
        <primitive ref={characterRef} object={scene} />
        <TextBubble text={SPEECH_TEXT} characterPosition={{ x: position[0], y: position[1]+6, z: position[2] }} />
      </>
    );
  }
  
  export default Character;