// 3D Model component interfaces
export interface SunModelProps {
  scrollOffset?: number;
}

export interface MoonModelProps {
  scrollOffset?: number;
}

export interface StoryIcon3DProps {
  type: 'coffee' | 'laptop' | 'blueprint' | 'terminal' | 'rocket' | 'energy';
  position: [number, number, number];
  theme: string;
}
