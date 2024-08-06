import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import modelPath from './charc/Cute Demon.glb';
import TextBubble from './TextBubble.js';
import Polly from './aws_config.js';
//import { splitText } from './utils.js';  // Import the splitText function

const SPEECH_TEXT = "Reut Stop the bullshit. This is a long text, divided by commas and periods.";  // Example text


export function splitText(text) {
  return text.split(/[,\.]\s*/);  // Split by commas or periods followed by any whitespace
}

function Character() {
    const { scene } = useGLTF(modelPath);
    const characterRef = useRef();
    const [position, setPosition] = useState([0, -3, 0]);
    const [speechUrls, setSpeechUrls] = useState([]);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [currentText, setCurrentText] = useState(""); // State for the current text segment

    const speak = useCallback((text) => {
        const segments = splitText(text);
        const urls = [];

        const generateSpeechUrl = (segment, index) => {
            return new Promise((resolve, reject) => {
                const params = {
                    OutputFormat: 'mp3',
                    Text: segment,
                    VoiceId: 'Joanna', // You can choose other voices as well
                };

                Polly.synthesizeSpeech(params, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        const uInt8Array = new Uint8Array(data.AudioStream);
                        const blob = new Blob([uInt8Array.buffer], { type: 'audio/mpeg' });
                        const url = URL.createObjectURL(blob);
                        resolve({ url, text: segment });
                    }
                });
            });
        };

        Promise.all(segments.map(generateSpeechUrl))
            .then(results => {
                setSpeechUrls(results);
                setCurrentSegmentIndex(0);
                setCurrentText(results[0].text); // Set the initial text
            })
            .catch(error => console.error("Error generating speech URLs:", error));
    }, []);

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
    }, [position, speak]);

    useEffect(() => {
        if (speechUrls.length > 0 && currentSegmentIndex < speechUrls.length) {
            const { url, text } = speechUrls[currentSegmentIndex];
            const audio = new Audio(url);
            audio.play()
                .then(() => {
                    setCurrentText(text); // Update the text bubble with the current segment
                    audio.onended = () => {
                        setCurrentSegmentIndex(prevIndex => prevIndex + 1);
                    };
                })
                .catch((error) => {
                    console.error("Audio playback failed:", error);
                });
        }
    }, [speechUrls, currentSegmentIndex]);

    useFrame(() => {
        if (characterRef.current) {
            characterRef.current.position.set(...position);
        }
    });

    return (
        <>
            <primitive ref={characterRef} object={scene} />
            <TextBubble text={currentText} characterPosition={{ x: position[0], y: position[1] + 6, z: position[2] }} />
        </>
    );
}

export default Character;
