import { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, PerspectiveCamera, Environment } from '@react-three/drei';
import SunModel from './SunModel';
import MoonModel from './MoonModel';
import StoryIcon3D from './StoryIcon3D';

interface Hero3DProps {
  onScrollUpdate?: (progress: number) => void;
}

// Scene component that receives theme and scroll
interface SceneProps {
  theme: string;
  onScrollUpdate?: (progress: number) => void;
}

function Scene({ theme, onScrollUpdate }: SceneProps) {
  const scroll = useScroll();
  const [scrollOffset, setScrollOffset] = useState(0);

  useFrame(() => {
    if (scroll) {
      const offset = scroll.offset;
      setScrollOffset(offset);
      if (onScrollUpdate) {
        onScrollUpdate(offset);
      }
    }
  });

  // Determine which story icons to show based on scroll position
  const currentPage = Math.floor(scrollOffset * 4);
  const stories = theme === 'dark' 
    ? ['terminal', 'rocket', 'energy'] as const
    : ['coffee', 'laptop', 'blueprint'] as const;
  
  const iconPosition: [number, number, number] = theme === 'dark' ? [5, 0, 2] : [-5, 0, 2];

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

      {/* Render story icon for current page */}
      {currentPage > 0 && currentPage <= 3 && (
        <StoryIcon3D
          type={stories[currentPage - 1]}
          position={iconPosition}
          theme={theme}
        />
      )}

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 12]}
        fov={75}
      />
    </>
  );
}

const Hero3D: React.FC<Hero3DProps> = ({ onScrollUpdate }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-3d-background">
      <Canvas>
        <ScrollControls pages={4} damping={0.1}>
          <Scene theme={theme} onScrollUpdate={onScrollUpdate} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Hero3D;
