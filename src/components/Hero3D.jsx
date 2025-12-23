import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ScrollControls, useScroll, PerspectiveCamera, Environment } from '@react-three/drei';
import SunModel from './SunModel';
import MoonModel from './MoonModel';

// Camera animation component
function CameraRig() {
  const scroll = useScroll();
  const cameraRef = useRef();

  useFrame(() => {
    if (cameraRef.current && scroll) {
      const offset = scroll.offset;
      
      // Move camera based on scroll
      cameraRef.current.position.y = -offset * 5;
      cameraRef.current.position.z = 8 - offset * 2;
      
      // Look at center
      cameraRef.current.lookAt(0, -offset * 3, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 8]}
      fov={75}
    />
  );
}

// Scene component that receives theme
function Scene({ theme }) {
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(0);

  useFrame(() => {
    if (scroll) {
      setScrollOffset(scroll.offset);
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={theme === 'dark' ? 0.3 : 0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={theme === 'dark' ? 0.5 : 1}
      />

      {/* Environment for reflections */}
      <Environment preset={theme === 'dark' ? 'night' : 'sunset'} />

      {/* Render Sun or Moon based on theme */}
      {theme === 'dark' ? (
        <MoonModel scrollOffset={scrollOffset} />
      ) : (
        <SunModel scrollOffset={scrollOffset} />
      )}

      {/* Camera animation */}
      <CameraRig />
    </>
  );
}

const Hero3D = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme') || 'light';
      setTheme(newTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for theme attribute changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-3d-background">
      <Canvas>
        <ScrollControls pages={4} damping={0.1}>
          <Scene theme={theme} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Hero3D;
