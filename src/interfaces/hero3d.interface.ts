// Hero3D component interfaces
export interface Hero3DProps {
  onScrollUpdate?: (progress: number) => void;
}

export interface SceneProps {
  theme: string;
  onScrollUpdate?: (progress: number) => void;
  scrollOffset: number;
}
