import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { PlaneGeometry, MeshBasicMaterial, Box3, Vector3 } from 'three';



function TextBubble({ text, characterPosition }) {
  const bubbleRef = useRef();
  const textRef = useRef();
  const { camera } = useThree();
  const [geometry, setGeometry] = useState(new PlaneGeometry(2, 1));
  const material = new MeshBasicMaterial({ color: 'lightblue' });


  useFrame(() => {
    if (bubbleRef.current) {
      bubbleRef.current.position.set(characterPosition.x, characterPosition.y + 1, characterPosition.z); // Adjust the Y position to be above the character
      bubbleRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={bubbleRef} >
      <mesh geometry={geometry} material={material} />
      <Text
        ref={textRef}
        position={[0, 0, 0.1]}
        fontSize={0.2}
        color="black"
        maxWidth={2}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
}

export default TextBubble;