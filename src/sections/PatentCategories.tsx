import { useEffect, useRef, useState } from 'react';
import { Brain, Monitor, Cpu, Car, ArrowRight } from 'lucide-react';
import { patentCategories } from '@/data/patents';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Monitor,
  Cpu,
  Car,
};

export default function PatentCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      id="categories"
      ref={sectionRef}
      className="section-padding relative bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-sm font-medium text-[#76b900] tracking-wider uppercase mb-4">
            Technology Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Patent Categories
          </h2>
          <p className="text-lg text-[#e0e0e0] max-w-2xl mx-auto">
            Explore Nvidia&apos;s innovation across key technology domains driving the future of computing
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {patentCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Brain;
            const isHovered = hoveredCard === category.id;

            return (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                  transform: isVisible
                    ? `rotate(${index % 2 === 0 ? '-1' : '1'}deg) translateY(${isHovered ? '-15px' : '0'})`
                    : 'translateY(48px)',
                }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                </div>

                {/* Shimmer Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${
                    isHovered ? 'translate-x-full' : '-translate-x-full'
                  }`}
                />

                {/* Card Content */}
                <div className="relative p-8 lg:p-10 min-h-[320px] flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-[#76b900]/20 flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered ? 'bg-[#76b900]/40 rotate-[360deg]' : ''
                      }`}
                    >
                      <Icon className="w-7 h-7 text-[#76b900]" />
                    </div>

                    {/* Title & Count */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      <span className="text-3xl font-bold text-[#76b900]">{category.count}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[#e0e0e0] leading-relaxed">{category.description}</p>
                  </div>

                  {/* Bottom Section - Tags */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-x-0' : 'opacity-70'
                          }`}
                          style={{
                            transitionDelay: isHovered ? `${tagIndex * 50}ms` : '0ms',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      className={`flex items-center gap-2 mt-6 text-[#76b900] font-medium transition-all duration-300 ${
                        isHovered ? 'translate-x-2' : ''
                      }`}
                    >
                      <span>Explore Patents</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Border Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl border transition-all duration-500 pointer-events-none ${
                    isHovered ? 'border-[#76b900]/50 shadow-[0_0_30px_rgba(118,185,0,0.2)]' : 'border-white/10'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
