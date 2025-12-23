import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SunModelProps {
  scrollOffset?: number;
}

const SunModel: React.FC<SunModelProps> = ({ scrollOffset = 0 }) => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      // Rotation based on scroll
      sunRef.current.rotation.y = scrollOffset * Math.PI * 2;
      sunRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group position={[8, 0, 0]}>
      {/* Main sun body - much larger and more detailed */}
      <Sphere ref={sunRef} args={[7, 128, 128]}>
        <MeshDistortMaterial
          color="#FF6B35"
          emissive="#FF8C42"
          emissiveIntensity={1.5}
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>

      {/* Point light from sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        distance={25}
        color="#FF8C42"
        decay={2}
      />
      
      {/* Additional warm ambient light */}
      <pointLight
        position={[2, 2, 2]}
        intensity={1}
        distance={15}
        color="#FFB347"
        decay={2}
      />
    </group>
  );
};

export default SunModel;
