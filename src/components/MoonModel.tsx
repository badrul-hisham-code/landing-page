import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface MoonModelProps {
  scrollOffset?: number;
}

const MoonModel: React.FC<MoonModelProps> = ({ scrollOffset = 0 }) => {
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (moonRef.current) {
      // Rotation based on scroll to show different phases
      moonRef.current.rotation.y = scrollOffset * Math.PI * 2;
      moonRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  // Create enhanced procedural crater texture
  const { moonTexture, bumpMap } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2D context');
    }

    // Base moon color with subtle variations
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(0.5, '#e0e0e0');
    gradient.addColorStop(1, '#c0c0c0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add many detailed craters
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const radius = Math.random() * 50 + 10;
      
      // Crater shadow
      const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      craterGradient.addColorStop(0, '#707070');
      craterGradient.addColorStop(0.3, '#909090');
      craterGradient.addColorStop(0.7, '#b0b0b0');
      craterGradient.addColorStop(1, '#e0e0e0');
      
      ctx.fillStyle = craterGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Crater rim highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + radius * 0.3, y - radius * 0.3, radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Add surface texture noise
    const imageData = ctx.getImageData(0, 0, 1024, 1024);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      imageData.data[i] += noise;
      imageData.data[i + 1] += noise;
      imageData.data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // Create bump map for 3D effect
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 1024;
    const bumpCtx = bumpCanvas.getContext('2d');
    if (bumpCtx) {
      bumpCtx.fillStyle = '#808080';
      bumpCtx.fillRect(0, 0, 1024, 1024);
      
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const radius = Math.random() * 50 + 10;
        
        const bumpGradient = bumpCtx.createRadialGradient(x, y, 0, x, y, radius);
        bumpGradient.addColorStop(0, '#000000');
        bumpGradient.addColorStop(0.5, '#404040');
        bumpGradient.addColorStop(1, '#808080');
        
        bumpCtx.fillStyle = bumpGradient;
        bumpCtx.beginPath();
        bumpCtx.arc(x, y, radius, 0, Math.PI * 2);
        bumpCtx.fill();
      }
    }
    
    const bump = new THREE.CanvasTexture(bumpCanvas);

    return { moonTexture: texture, bumpMap: bump };
  }, []);

  return (
    <group position={[-8, 0, 0]}>
      {/* Main moon body - much larger and more detailed */}
      <Sphere ref={moonRef} args={[7, 128, 128]}>
        <meshStandardMaterial
          map={moonTexture}
          bumpMap={bumpMap}
          bumpScale={0.3}
          color="#d8d8d8"
          emissive="#00d4ff"
          emissiveIntensity={0.15}
          roughness={0.9}
          metalness={0.05}
        />
      </Sphere>

      {/* Rim light for neon edge effect */}
      <pointLight
        position={[-3, 0, 0]}
        intensity={2}
        distance={20}
        color="#00d4ff"
        decay={2}
      />
      
      {/* Secondary neon accent */}
      <pointLight
        position={[-2, 2, 2]}
        intensity={1}
        distance={15}
        color="#b537f2"
        decay={2}
      />
    </group>
  );
};

export default MoonModel;
