import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight, Star, Calendar, Clock } from 'lucide-react';
import { featuredPatent } from '@/data/patents';
import type { Patent } from '@/types';

export default function FeaturedPatent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenPatent = () => {
    (window as unknown as { openPatentDetail?: (patent: Patent) => void }).openPatentDetail?.(featuredPatent);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#76b900]/5 blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-sm font-medium text-[#76b900] tracking-wider uppercase mb-4">
            Deep Dive Analysis
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured Patent Review
          </h2>
          <p className="text-lg text-[#e0e0e0] max-w-2xl mx-auto">
            In-depth examination of Nvidia&apos;s most impactful innovations
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Patent Number */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#76b900]/10 border border-[#76b900]/30 mb-6">
              <span className="text-[#76b900] font-mono font-bold tracking-wider">
                {featuredPatent.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {featuredPatent.title}
            </h3>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#a0a0a0]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{featuredPatent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{featuredPatent.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#76b900]" />
                <span>{featuredPatent.citations} citations</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#e0e0e0] text-lg leading-relaxed mb-8">
              {featuredPatent.description}
            </p>

            {/* Key Points */}
            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Key Innovations
              </h4>
              <ul className="space-y-3">
                {featuredPatent.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#76b900]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#76b900]" />
                    </div>
                    <span className="text-[#e0e0e0]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {featuredPatent.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 text-[#e0e0e0] border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleOpenPatent}
                className="btn-primary flex items-center gap-2"
              >
                Read Full Analysis
                <ArrowRight className="w-4 h-4" />
              </button>
              {featuredPatent.hasVideo && (
                <button 
                  onClick={handleOpenPatent}
                  className="btn-outline flex items-center gap-2"
                >
                  Watch Video
                </button>
              )}
            </div>
          </div>

          {/* Right - Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={featuredPatent.image}
                alt={featuredPatent.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="px-3 py-1.5 rounded-full bg-[#76b900] text-black text-xs font-bold animate-pulse">
                  AI/ML
                </div>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
                  2024
                </div>
                <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-[#76b900] text-xs font-medium border border-[#76b900]/30">
                  ★★★★★
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#76b900]/20 animate-orbit"
              style={{ animationDuration: '20s' }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-[#76b900]/10"
              style={{ animation: 'orbit 25s linear infinite reverse' }}
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-[#76b900]/20 blur-2xl -z-10 animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
