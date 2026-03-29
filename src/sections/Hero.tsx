import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Play, FileText } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(118, 185, 0, 0.4)';
        ctx.fill();

        // Draw connections
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && connections < 3) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(118, 185, 0, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            connections++;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#0a1a00]" />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(118, 185, 0, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(118, 185, 0, 0.25) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '20%',
            right: '15%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center px-4">
        {/* Eyebrow */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#76b900]/30 bg-[#76b900]/5 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
          <span className="text-sm font-medium text-[#76b900] tracking-wider uppercase">
            Patent Analysis Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6">
          <span
            className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Unlocking Nvidia&apos;s
          </span>
          <span
            className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <span className="text-gradient">Innovation Landscape</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-[#e0e0e0] max-w-2xl mx-auto mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          Deep insights into the patents driving AI, graphics, and computing breakthroughs.
          Professional analysis for technical decision-makers.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            onClick={() => scrollToSection('#analysis')}
            className="btn-primary flex items-center gap-2 text-base px-8 py-4 animate-pulse-glow"
          >
            <FileText className="w-5 h-5" />
            Explore Patents
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToSection('#featured')}
            className="btn-outline flex items-center gap-2 text-base px-8 py-4"
          >
            <Play className="w-5 h-5" />
            Watch Overview
          </button>
        </div>

        {/* Stats Preview */}
        <div
          className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#76b900]">15K+</div>
            <div className="text-xs md:text-sm text-[#a0a0a0] mt-1">Global Patents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#76b900]">415</div>
            <div className="text-xs md:text-sm text-[#a0a0a0] mt-1">AI/ML Patents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#76b900]">#1</div>
            <div className="text-xs md:text-sm text-[#a0a0a0] mt-1">Citations</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
