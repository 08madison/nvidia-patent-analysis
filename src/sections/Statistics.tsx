import { useEffect, useRef, useState } from 'react';
import { statistics } from '@/data/patents';

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  isVisible,
}: {
  value: string;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value, 10);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), targetValue);
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
        setCount(targetValue);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, targetValue]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span className="tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Connecting Line SVG */}
      <svg
        className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 pointer-events-none hidden lg:block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#76b900" stopOpacity="0" />
            <stop offset="50%" stopColor="#76b900" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#76b900" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="8 4"
          className={`transition-all duration-[2000ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            strokeDashoffset: isVisible ? 0 : 1000,
            transition: 'stroke-dashoffset 2s ease-out, opacity 1s ease-out',
          }}
        />
      </svg>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-sm font-medium text-[#76b900] tracking-wider uppercase mb-4">
            Portfolio Overview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-[#e0e0e0] max-w-2xl mx-auto">
            Nvidia&apos;s patent portfolio demonstrates exceptional quality and strategic focus on high-value technologies
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${500 + index * 150}ms`,
                transform: isVisible ? `translateY(${index % 2 === 0 ? '0' : '-10px'})` : 'translateY(48px)',
              }}
            >
              {/* Card */}
              <div className="relative p-6 lg:p-8 rounded-2xl bg-[#0f0f0f] border border-[#333] text-center transition-all duration-500 group-hover:border-[#76b900]/50 group-hover:shadow-[0_0_30px_rgba(118,185,0,0.15)]">
                {/* Value */}
                <div className="text-4xl lg:text-5xl font-bold text-[#76b900] mb-2 glow-text">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>

                {/* Label */}
                <div className="text-sm text-[#a0a0a0] font-medium">{stat.label}</div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#76b900]/10 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
                </div>
              </div>

              {/* Floating Animation */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl bg-[#76b900]/5 blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  animation: isVisible ? `float ${5 + index * 0.5}s ease-in-out infinite` : 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Source Note */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <p className="text-xs text-[#666]">
            Data compiled from USPTO, EPO, and WIPO databases (2024)
          </p>
        </div>
      </div>
    </section>
  );
}
