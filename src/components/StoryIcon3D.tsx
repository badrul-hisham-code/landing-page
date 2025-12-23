import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface StoryIcon3DProps {
  type: 'coffee' | 'laptop' | 'blueprint' | 'terminal' | 'rocket' | 'energy';
  position: [number, number, number];
  theme: string;
}

const StoryIcon3D: React.FC<StoryIcon3DProps> = ({ type, position, theme }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const color = theme === 'dark' ? '#00d4ff' : '#FF6B35';
  const emissive = theme === 'dark' ? '#b537f2' : '#FF8C42';

  const renderIcon = () => {
    switch (type) {
      case 'coffee':
        return (
          <>
            {/* Coffee mug */}
            <Cylinder args={[0.3, 0.4, 0.6, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Torus args={[0.35, 0.08, 16, 32]} position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </Torus>
          </>
        );
      
      case 'laptop':
        return (
          <>
            {/* Laptop base */}
            <Box args={[1.2, 0.1, 0.8]} position={[0, -0.3, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
            </Box>
            {/* Laptop screen */}
            <Box args={[1.2, 0.8, 0.05]} position={[0, 0.1, -0.35]} rotation={[-0.3, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} metalness={0.7} roughness={0.3} />
            </Box>
          </>
        );
      
      case 'blueprint':
        return (
          <>
            {/* Blueprint/diagram */}
            <Box args={[1, 0.02, 0.7]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.6} metalness={0.5} roughness={0.4} />
            </Box>
            <Box args={[0.6, 0.02, 0.4]} position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
              <meshStandardMaterial color={emissive} emissive={color} emissiveIntensity={0.8} metalness={0.5} roughness={0.4} />
            </Box>
          </>
        );
      
      case 'terminal':
        return (
          <>
            {/* Terminal window */}
            <Box args={[1.2, 0.8, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#1a1a1a" emissive={color} emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
            </Box>
            {/* Code lines */}
            <Box args={[0.8, 0.05, 0.12]} position={[-0.1, 0.2, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1} />
            </Box>
            <Box args={[0.6, 0.05, 0.12]} position={[-0.2, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1} />
            </Box>
            <Box args={[0.7, 0.05, 0.12]} position={[-0.15, -0.2, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1} />
            </Box>
          </>
        );
      
      case 'rocket':
        return (
          <>
            {/* Rocket body */}
            <Cylinder args={[0.2, 0.3, 1, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.7} metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Rocket nose */}
            <Cylinder args={[0, 0.2, 0.4, 32]} position={[0, 0.7, 0]}>
              <meshStandardMaterial color={emissive} emissive={color} emissiveIntensity={1} metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Fins */}
            <Box args={[0.5, 0.3, 0.05]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </Box>
          </>
        );
      
      case 'energy':
        return (
          <>
            {/* Energy drink can */}
            <Cylinder args={[0.25, 0.25, 0.8, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Can top */}
            <Cylinder args={[0.25, 0.2, 0.1, 32]} position={[0, 0.45, 0]}>
              <meshStandardMaterial color="#silver" emissive={color} emissiveIntensity={0.5} metalness={1} roughness={0.1} />
            </Cylinder>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <group ref={groupRef} position={position}>
      {renderIcon()}
      <pointLight position={[0, 0, 1]} intensity={1} distance={3} color={color} />
    </group>
  );
};

export default StoryIcon3D;
