import { useEffect, useRef, useState } from 'react';
import { Clock, ArrowRight, FileText, Play } from 'lucide-react';
import { latestAnalysis, patents } from '@/data/patents';
import type { Patent } from '@/types';

export default function LatestAnalysis() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handlePatentClick = (patentNumber: string) => {
    // Find patent by number (remove commas for matching)
    const cleanNumber = patentNumber.replace(/,/g, '');
    const patent = patents.find((p) => p.number.replace(/,/g, '') === cleanNumber);
    if (patent) {
      (window as unknown as { openPatentDetail?: (patent: Patent) => void }).openPatentDetail?.(patent);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="analysis"
      ref={sectionRef}
      className="section-padding relative bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="inline-block text-sm font-medium text-[#76b900] tracking-wider uppercase mb-4">
              Recent Publications
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Latest Patent Analysis
            </h2>
            <p className="text-lg text-[#e0e0e0] max-w-xl">
              Stay current with our newest technical deep-dives
            </p>
          </div>
          <button className="btn-outline flex items-center gap-2 self-start md:self-auto">
            View All Analysis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestAnalysis.map((item, index) => {
            const isHovered = hoveredCard === item.id;
            const isOffset = index % 2 === 1;

            return (
              <article
                key={item.id}
                className={`group relative transition-all duration-700 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                  transform: isVisible ? `translateY(${isOffset ? '30px' : '0'})` : 'translateY(64px)',
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handlePatentClick(item.patentNumber)}
              >
                <div
                  className={`relative h-full rounded-2xl overflow-hidden bg-[#0f0f0f] border transition-all duration-500 ${
                    isHovered
                      ? 'border-[#76b900]/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)] -translate-y-3'
                      : 'border-[#333]'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-115 brightness-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/80 backdrop-blur-sm text-[#76b900] border border-[#76b900]/30">
                        {item.category}
                      </span>
                    </div>

                    {/* Media Indicators */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <FileText className="w-4 h-4 text-[#76b900]" />
                      </span>
                      <span className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <Play className="w-4 h-4 text-[#76b900]" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Patent Number */}
                    <div className="text-xs font-mono text-[#76b900]/70 mb-2">{item.patentNumber}</div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        isHovered ? 'text-[#76b900]' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                      <div className="flex items-center gap-4 text-xs text-[#666]">
                        <span>{item.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.readTime}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-[#76b900] text-sm font-medium transition-all duration-300 ${
                          isHovered ? 'translate-x-1' : ''
                        }`}
                      >
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(118,185,0,0.2) 0%, transparent 50%, rgba(118,185,0,0.1) 100%)',
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
