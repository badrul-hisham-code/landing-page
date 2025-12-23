import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SunModelProps {
  scrollOffset?: number;
}

const SunModel: React.FC<SunModelProps> = ({ scrollOffset = 0 }) => {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      // Slow rotation
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      
      // Scroll-based animations
      const scale = 1 + scrollOffset * 0.3;
      sunRef.current.scale.setScalar(scale);
      
      // Move sun based on scroll
      sunRef.current.position.y = -scrollOffset * 2;
    }

    // Pulsing glow effect
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[4, 0, -2]}>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.5, 64, 64]}>
        <meshBasicMaterial
          color="#FF8C42"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main sun body */}
      <Sphere ref={sunRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#FF6B35"
          emissive="#FF8C42"
          emissiveIntensity={2}
          distort={0.2}
          speed={1}
          roughness={0.1}
          metalness={0.3}
        />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[1.8, 64, 64]}>
        <meshBasicMaterial
          color="#FFB347"
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Point light from sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={15}
        color="#FF8C42"
      />
    </group>
  );
};

export default SunModel;
