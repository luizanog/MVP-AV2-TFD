export interface Trend {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  image: string;
  tags: string[];
  status: 'EMERGING' | 'STABLE' | 'AESTHETIC' | 'HYPED';
  growth: number; // percentage, e.g. 78 for +78%
  views: number;
  category: 'Visual Art' | 'AI/ML' | 'Biotech' | 'Web3' | 'Materials' | string;
  colorPalette: string[];
  growthStats: { month: string; value: number }[];
}

export type SidebarTab = 'All' | 'Saved' | 'Analytics' | 'Briefings' | 'Settings';
