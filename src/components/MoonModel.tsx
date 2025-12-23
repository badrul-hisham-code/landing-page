import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface MoonModelProps {
  scrollOffset?: number;
}

const MoonModel: React.FC<MoonModelProps> = ({ scrollOffset = 0 }) => {
  const moonRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (moonRef.current) {
      // Slow rotation to show different moon phases
      moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Scroll-based animations
      const scale = 1 + scrollOffset * 0.3;
      moonRef.current.scale.setScalar(scale);
      
      // Move moon based on scroll
      moonRef.current.position.y = -scrollOffset * 2;
    }

    // Pulsing neon glow effect
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15 + 1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  // Create procedural crater texture
  const createCraterTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2D context');
    }

    // Base moon color
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, 512, 512);

    // Add craters
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = Math.random() * 30 + 5;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#a0a0a0');
      gradient.addColorStop(0.5, '#b0b0b0');
      gradient.addColorStop(1, '#e0e0e0');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const moonTexture = createCraterTexture();

  return (
    <group position={[-4, 0, -2]}>
      {/* Outer neon glow */}
      <Sphere ref={glowRef} args={[2.5, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Main moon body */}
      <Sphere ref={moonRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={moonTexture}
          color="#d0d0d0"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Neon edge glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#b537f2"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Point light from moon - neon blue */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        distance={15}
        color="#00d4ff"
      />
    </group>
  );
};

export default MoonModel;
