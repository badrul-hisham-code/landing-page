import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import SunModel from './SunModel';
import MoonModel from './MoonModel';
import StoryIcon3D from './StoryIcon3D';
import { Hero3DProps, SceneProps } from '../interfaces';

function Scene({ theme, onScrollUpdate, scrollOffset }: SceneProps) {
  // Notify parent of scroll progress when it changes
  useEffect(() => {
    if (onScrollUpdate) {
      onScrollUpdate(scrollOffset);
    }
  }, [scrollOffset, onScrollUpdate]);

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

  // Track scroll offset from window
  const [scrollOffset, setScrollOffset] = useState(0);

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

  // Native scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const offset = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollOffset(offset);
      if (onScrollUpdate) onScrollUpdate(offset);
    };
    window.addEventListener('scroll', handleScroll);
    // Initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollUpdate]);

  return (
    <div className="hero-3d-background">
      <Canvas>
        {/* Pass scrollOffset to Scene via prop */}
        <Scene theme={theme} onScrollUpdate={onScrollUpdate} scrollOffset={scrollOffset} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
