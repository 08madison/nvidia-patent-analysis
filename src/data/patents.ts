import type { Patent, PatentCategory, Comment, Statistic, AnalysisItem } from '@/types';

export const patentCategories: PatentCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    count: 415,
    icon: 'Brain',
    description: 'Deep learning, neural networks, and AI acceleration technologies powering modern intelligent systems.',
    tags: ['Tensor Cores', 'Transformer Engine', 'CUDA', 'Deep Learning'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
  },
  {
    id: 'graphics',
    name: 'Computer Graphics',
    count: 194,
    icon: 'Monitor',
    description: 'Ray tracing, rendering, and visual computing innovations for immersive experiences.',
    tags: ['RTX', 'DLSS', 'Omniverse', 'Ray Tracing'],
    image: 'https://images.unsplash.com/photo-1614726365723-49cfae927846?w=800&h=600&fit=crop'
  },
  {
    id: 'hardware',
    name: 'Hardware & Architecture',
    count: 218,
    icon: 'Cpu',
    description: 'GPU architectures, memory systems, and semiconductor designs for maximum performance.',
    tags: ['Hopper', 'Blackwell', 'HBM', 'Tensor Cores'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
  },
  {
    id: 'autonomous',
    name: 'Autonomous Systems',
    count: 141,
    icon: 'Car',
    description: 'Self-driving vehicles, robotics, and edge AI solutions for the future of transportation.',
    tags: ['DRIVE', 'Jetson', 'Isaac', 'Edge AI'],
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&h=600&fit=crop'
  }
];

export const featuredPatent: Patent = {
  id: 'us10885698b2',
  number: 'US10,885,698B2',
  title: 'Tensor Core Architecture for AI Acceleration',
  category: 'AI & Machine Learning',
  subcategory: 'Hardware Acceleration',
  date: '2024-01-15',
  excerpt: 'A groundbreaking patent covering specialized matrix computation units that power modern AI training and inference workloads.',
  description: 'This patent describes a specialized processing unit designed to accelerate matrix operations commonly used in deep learning workloads. The invention introduces mixed-precision computation capabilities, allowing for efficient processing of FP16, BF16, and FP8 data types.',
  readTime: '12 min',
  tags: ['Tensor Cores', 'AI Acceleration', 'Matrix Operations', 'Mixed Precision'],
  keyPoints: [
    'Mixed-precision computation (FP16, BF16, FP8) for optimal performance',
    '4x throughput improvement over standard CUDA cores',
    'Sparsity support for efficient model execution',
    'Native support for common deep learning operations'
  ],
  citations: 277,
  hasPPT: true,
  hasVideo: true,
  image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop'
};

export const patents: Patent[] = [
  {
    id: 'us11456789b2',
    number: 'US11,456,789B2',
    title: 'Transformer Engine Optimization',
    category: 'AI & Machine Learning',
    subcategory: 'Neural Networks',
    date: '2024-12-15',
    excerpt: 'Novel approach to mixed-precision training for transformer models with dynamic scaling.',
    description: 'This patent introduces advanced optimization techniques for transformer-based neural networks.',
    readTime: '8 min',
    tags: ['Transformer', 'Mixed Precision', 'Training Optimization'],
    keyPoints: ['Dynamic precision scaling', 'Memory optimization', 'Training speed improvement'],
    citations: 45,
    hasPPT: true,
    hasVideo: true
  },
  {
    id: 'us11234567b2',
    number: 'US11,234,567B2',
    title: 'Ray Tracing Acceleration Hardware',
    category: 'Computer Graphics',
    subcategory: 'Rendering',
    date: '2024-12-10',
    excerpt: 'Hardware-software co-design for real-time ray tracing in gaming and professional visualization.',
    description: 'Revolutionary hardware architecture for accelerating ray tracing computations.',
    readTime: '10 min',
    tags: ['Ray Tracing', 'RTX', 'Real-time Rendering'],
    keyPoints: ['RT Core enhancement', 'BVH traversal optimization', 'Real-time performance'],
    citations: 89,
    hasPPT: true,
    hasVideo: false
  },
  {
    id: 'us11123456b2',
    number: 'US11,123,456B2',
    title: 'NVLink Interconnect Architecture',
    category: 'Hardware & Architecture',
    subcategory: 'Interconnects',
    date: '2024-12-05',
    excerpt: 'High-speed GPU-to-GPU communication protocol for scalable multi-GPU systems.',
    description: 'Advanced interconnect technology enabling efficient multi-GPU communication.',
    readTime: '12 min',
    tags: ['NVLink', 'Multi-GPU', 'High-speed Interconnect'],
    keyPoints: ['900 GB/s bandwidth', 'Cache coherence', 'Scalable topology'],
    citations: 156,
    hasPPT: true,
    hasVideo: true
  },
  {
    id: 'us10987654b2',
    number: 'US10,987,654B2',
    title: 'DLSS Frame Generation Technology',
    category: 'Computer Graphics',
    subcategory: 'Upscaling',
    date: '2024-11-28',
    excerpt: 'AI-powered frame interpolation for enhanced gaming performance and visual quality.',
    description: 'Deep Learning Super Sampling technology for real-time frame generation.',
    readTime: '9 min',
    tags: ['DLSS', 'Frame Generation', 'AI Upscaling'],
    keyPoints: ['2x frame rate boost', 'Optical flow estimation', 'Low latency'],
    citations: 203,
    hasPPT: true,
    hasVideo: true
  },
  {
    id: 'us10876543b2',
    number: 'US10,876,543B2',
    title: 'CUDA Unified Memory Architecture',
    category: 'Hardware & Architecture',
    subcategory: 'Memory Systems',
    date: '2024-11-20',
    excerpt: 'Unified memory architecture for seamless CPU-GPU data sharing and management.',
    description: 'Revolutionary memory management system for heterogeneous computing.',
    readTime: '11 min',
    tags: ['CUDA', 'Unified Memory', 'Heterogeneous Computing'],
    keyPoints: ['Transparent data migration', 'Page fault optimization', 'Large address space'],
    citations: 178,
    hasPPT: true,
    hasVideo: false
  },
  {
    id: 'us10765432b2',
    number: 'US10,765,432B2',
    title: 'Omniverse Physics Simulation Engine',
    category: 'Autonomous Systems',
    subcategory: 'Simulation',
    date: '2024-11-15',
    excerpt: 'Real-time physics simulation for digital twins and robotics development.',
    description: 'Advanced physics engine for accurate real-time simulation in virtual environments.',
    readTime: '7 min',
    tags: ['Omniverse', 'Physics Simulation', 'Digital Twins'],
    keyPoints: ['Real-time simulation', 'Multi-physics support', 'Cloud scalability'],
    citations: 67,
    hasPPT: true,
    hasVideo: true
  }
];

export const latestAnalysis: AnalysisItem[] = [
  {
    id: 'analysis-1',
    patentNumber: 'US11,456,789B2',
    title: 'Transformer Engine Optimization',
    date: 'December 15, 2024',
    excerpt: 'Novel approach to mixed-precision training for transformer models with dynamic scaling...',
    readTime: '8 min',
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop'
  },
  {
    id: 'analysis-2',
    patentNumber: 'US11,234,567B2',
    title: 'Ray Tracing Acceleration Hardware',
    date: 'December 10, 2024',
    excerpt: 'Hardware-software co-design for real-time ray tracing in gaming and professional visualization...',
    readTime: '10 min',
    category: 'Computer Graphics',
    image: 'https://images.unsplash.com/photo-1614726365723-49cfae927846?w=600&h=400&fit=crop'
  },
  {
    id: 'analysis-3',
    patentNumber: 'US11,123,456B2',
    title: 'NVLink Interconnect Architecture',
    date: 'December 5, 2024',
    excerpt: 'High-speed GPU-to-GPU communication protocol for scalable multi-GPU systems...',
    readTime: '12 min',
    category: 'Hardware & Architecture',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop'
  },
  {
    id: 'analysis-4',
    patentNumber: 'US10,987,654B2',
    title: 'DLSS Frame Generation Technology',
    date: 'November 28, 2024',
    excerpt: 'AI-powered frame interpolation for enhanced gaming performance and visual quality...',
    readTime: '9 min',
    category: 'Computer Graphics',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop'
  },
  {
    id: 'analysis-5',
    patentNumber: 'US10,876,543B2',
    title: 'CUDA Unified Memory Architecture',
    date: 'November 20, 2024',
    excerpt: 'Unified memory architecture for seamless CPU-GPU data sharing and management...',
    readTime: '11 min',
    category: 'Hardware & Architecture',
    image: 'https://images.unsplash.com/photo-1555617981-778dd1c43165?w=600&h=400&fit=crop'
  },
  {
    id: 'analysis-6',
    patentNumber: 'US10,765,432B2',
    title: 'Omniverse Physics Simulation Engine',
    date: 'November 15, 2024',
    excerpt: 'Real-time physics simulation for digital twins and robotics development...',
    readTime: '7 min',
    category: 'Autonomous Systems',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&h=400&fit=crop'
  }
];

export const statistics: Statistic[] = [
  { value: '15553', label: 'Total Global Patents', suffix: '+' },
  { value: '76', label: 'Active Patent Rate', suffix: '%' },
  { value: '415', label: 'AI/ML Patents', suffix: '' },
  { value: '1', label: 'AI Chip Citations', prefix: '#' },
  { value: '602', label: 'Most Cited Patent', suffix: '' }
];

export const comments: Comment[] = [
  {
    id: 'comment-1',
    patentId: 'us10885698b2',
    author: 'Dr. Sarah Chen',
    avatar: 'SC',
    content: 'Excellent analysis of the Tensor Core architecture. The mixed-precision capabilities are truly game-changing for AI workloads.',
    date: '2024-12-20',
    likes: 24
  },
  {
    id: 'comment-2',
    patentId: 'us10885698b2',
    author: 'Michael Rodriguez',
    avatar: 'MR',
    content: 'Would love to see more details on the sparsity support implementation. Great work!',
    date: '2024-12-18',
    likes: 15
  },
  {
    id: 'comment-3',
    patentId: 'us11456789b2',
    author: 'Prof. James Liu',
    avatar: 'JL',
    content: 'The Transformer Engine optimization is a significant breakthrough. This analysis captures the technical nuances perfectly.',
    date: '2024-12-15',
    likes: 32
  }
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Patent Analysis', href: '#analysis' },
  { label: 'Technology Areas', href: '#categories' },
  { label: 'About', href: '#about' }
];
