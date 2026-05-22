import { Trend } from './types';

export const INITIAL_TRENDS: Trend[] = [
  {
    id: 'bio-digital-aesthetics',
    title: 'Bio-Digital Aesthetics',
    description: 'The convergence of organic biological patterns and high-fidelity digital rendering techniques in modern interface design.',
    fullContent: 'This trend marks a profound shift where nature’s complex, generative geometries—like Fibonacci spirals, cell membranes, and mycelial growth networks—are simulated in digital interfaces. Powered by modern GPU shaders and real-time generation engines, UI components mimic respiratory rhythms, fluid dynamics, and organic self-organization. It bridges the gap between cold industrial minimalism and the warm, therapeutic, life-like rhythm of natural systems, creating interfaces that feel alive, breathable, and deeply soothing for long sessions.',
    image: '/src/assets/images/biodigital_flower_1779477191421.png',
    tags: ['EMERGING', 'GENERATIVE'],
    status: 'EMERGING',
    growth: 84,
    views: 12450,
    category: 'Visual Art',
    colorPalette: ['#4648d4', '#bdc2ff', '#e0dbff', '#fcf8ff'],
    growthStats: [
      { month: 'Jan', value: 12 },
      { month: 'Feb', value: 24 },
      { month: 'Mar', value: 38 },
      { month: 'Apr', value: 55 },
      { month: 'May', value: 84 },
    ]
  },
  {
    id: 'spatial-intelligence',
    title: 'Spatial Intelligence',
    description: 'How environments react and adapt to human movement through persistent AR layers and sensor-fusion technology.',
    fullContent: 'With the deployment of optical pass-through headsets and depth sensors, flat interface canvases are dissolving. Spatial Intelligence explores how applications understand their surroundings—contextualizing furniture, volume, natural lighting, and active human direction. Instead of fixed dialog boxes, information sits statically in three-dimensional coordinates (world-anchored), adjusting its transparency and glow relative to the observer’s distance. It relies on real-time spatial calculations, predicting cognitive load based on gaze and ambient movement.',
    image: '/src/assets/images/spatial_phone_1779477208883.png',
    tags: ['STABLE', 'ARCHITECTURE'],
    status: 'STABLE',
    growth: 62,
    views: 8900,
    category: 'AI/ML',
    colorPalette: ['#2c2abc', '#565e74', '#cfd2ff', '#1b1b23'],
    growthStats: [
      { month: 'Jan', value: 40 },
      { month: 'Feb', value: 48 },
      { month: 'Mar', value: 52 },
      { month: 'Apr', value: 58 },
      { month: 'May', value: 62 },
    ]
  },
  {
    id: 'micro-glass-textures',
    title: 'Micro-Glass Textures',
    description: 'Refining the glassmorphism trend with ultra-fine grain and chromatic aberration at the edge of semi-transparent surfaces.',
    fullContent: 'Glassmorphism returns with scientific precision. Micro-Glass Textures leverages physical properties of high-index lenses: tiny, microscopic surface irregularities (roughness/noise), subtle chromatic refraction indexes (which separate white light into micro-fringes of red, green, and blue at sharp borders), and varying depths of bokeh. This creates a highly tactile, physical sense of glass holding deep value, replacing clinical digital surfaces with tangible micro-elements that react dynamically to mouse coordinates.',
    image: '/src/assets/images/microglass_plates_1779477226076.png',
    tags: ['AESTHETIC', 'UI TRENDS'],
    status: 'AESTHETIC',
    growth: 78,
    views: 15120,
    category: 'Visual Art',
    colorPalette: ['#bdc2ff', '#6063ee', '#efecf8', '#4651b9'],
    growthStats: [
      { month: 'Jan', value: 20 },
      { month: 'Feb', value: 35 },
      { month: 'Mar', value: 50 },
      { month: 'Apr', value: 68 },
      { month: 'May', value: 78 },
    ]
  },
  {
    id: 'bacterial-hardware',
    title: 'Bacterial Computing Arrays',
    description: 'SaaS monitoring layers and visual interfaces configured for wetware metabolic and biological processors.',
    fullContent: 'As biotech chips emerge, biological processors (composed of living neural arrays or light-sensitive bacterial cultures) require specialized administrative consoles. We are tracking the visual identity of Bio-Tech wetware controllers: metabolic health tracks, organic nourishment triggers, and light-stimulation layouts. Interfaces adopt soft pastel lavender and off-white bases with pulsing green active state indicators to bridge computing dashboards with alive organic states.',
    image: 'https://picsum.photos/seed/biotech/800/600',
    tags: ['EMERGING', 'METABOLIC'],
    status: 'EMERGING',
    growth: 91,
    views: 4320,
    category: 'Biotech',
    colorPalette: ['#2d37a0', '#4651b9', '#dae2fc', '#fcf8ff'],
    growthStats: [
      { month: 'Jan', value: 10 },
      { month: 'Feb', value: 30 },
      { month: 'Mar', value: 55 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 91 },
    ]
  },
  {
    id: 'decentralized-sentiment',
    title: 'Decentralized Sentiment Grids',
    description: 'Autonomous global networks plotting atmospheric and narrative mood layers back onto localized dynamic typography.',
    fullContent: 'Decentralized sentiment mapping traces decentralized peer-to-peer visual feeds across metropolitan areas. The design pattern maps global human sentiments directly to font weights and tracking configurations. Overly positive clusters cause typography to relax and swell (higher weights, airy leading), while ambient pressure or stress shrinks text into ultra-compact, brutalist letter blocks. It presents a dynamic atmospheric reader replacing typical raw figures with raw sensory content.',
    image: 'https://picsum.photos/seed/crypto/800/600',
    tags: ['HYPED', 'NARRATIVE'],
    status: 'HYPED',
    growth: 45,
    views: 7100,
    category: 'Web3',
    colorPalette: ['#565e74', '#4648d4', '#d7dff9', '#fbf9ff'],
    growthStats: [
      { month: 'Jan', value: 15 },
      { month: 'Feb', value: 28 },
      { month: 'Mar', value: 35 },
      { month: 'Apr', value: 40 },
      { month: 'May', value: 45 },
    ]
  }
];

export const CATEGORIES = ['All', 'Visual Art', 'AI/ML', 'Biotech', 'Web3'];

export const DAILY_BRIEFINGS = [
  {
    id: 'brief-1',
    title: 'The Organic Shift in Modern Dashboards',
    insight: 'Design teams are replacing sharp neon containers with lavender backgrounds (#fcf8ff) and tactile glass elements to decrease cognitive fatigue.',
    impact: 'Visual Fatigue reduction by 32%'
  },
  {
    id: 'brief-2',
    title: 'Metabolic Visual Coding',
    insight: 'Continuous real-time radial glows are replacing alert bells. Color shifts (e.g., violet-to-orange) act as subtle ambient alerts.',
    impact: 'System notification friction reduced by 40%'
  }
];
