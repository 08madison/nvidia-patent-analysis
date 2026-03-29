# Nvidia Patent Analysis Platform

A professional patent analysis platform showcasing Nvidia's technological innovations through deep technical insights.

![Nvidia Patents](https://img.shields.io/badge/Nvidia-Patent%20Analysis-76b900?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🌐 Live Demo

**Website**: https://08madison.github.io/nvidia-patent-analysis/

## ✨ Features

### Core Modules
- **Hero Section** - Dynamic particle network background with smooth entrance animations
- **Patent Categories** - Four core technology domains (AI/ML, Graphics, Hardware, Autonomous Systems)
- **Featured Patent Analysis** - In-depth examination of Nvidia's most impactful innovations
- **Statistics Dashboard** - Animated counters showing patent portfolio scale
- **Latest Analysis** - Masonry grid of recent patent deep-dives
- **Newsletter Subscription** - Glass-morphism styled subscription form

### Interactive Features
- **Patent Detail Modal** - Click any patent card to view full details
- **PPT Viewer** - Slide browser with zoom, thumbnail navigation
- **Video Player** - Custom controls for patent analysis videos
- **Comment System** - Post comments and like interactions
- **Smooth Scroll Navigation** - Fixed header with smooth scrolling

## 🎨 Design Highlights

- **Nvidia Brand Colors** - #76b900 green as primary accent on dark theme
- **Professional Tech Style** - Clean, modern, enterprise-grade visual design
- **Smooth Animations** - Scroll-triggered animations, hover effects, particle background
- **Fully Responsive** - Desktop, tablet, and mobile optimized

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Icons**: Lucide React
- **Animation**: CSS Animations + Intersection Observer

## 📊 Patent Data

The platform showcases:
- **15,553+** Global Patents
- **415** AI/ML Patents
- **76%** Active Patent Rate
- **#1** AI Chip Citations

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/08madison/nvidia-patent-analysis.git

# Navigate to project directory
cd nvidia-patent-analysis

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── custom/          # Custom components (PPTViewer, VideoPlayer, CommentSection)
│   └── ui/              # shadcn/ui components
├── sections/            # Page sections (Header, Hero, Categories, etc.)
├── data/                # Patent data and content
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── App.tsx              # Main application component
└── index.css            # Global styles
```

## 🔧 Configuration

### GitHub Pages Deployment

The project is configured for GitHub Pages deployment:

1. Update `vite.config.ts` with your repository name:
```typescript
base: '/nvidia-patent-analysis/',
```

2. Enable GitHub Pages in repository settings

3. Push to main branch - GitHub Actions will automatically deploy

## 📝 License

This project is for educational and analytical purposes. Not affiliated with Nvidia Corporation.

## 🙏 Acknowledgments

- Patent data compiled from USPTO, EPO, and WIPO databases
- Images from Unsplash
- Icons from Lucide React

---

Built with ❤️ for the tech community.
