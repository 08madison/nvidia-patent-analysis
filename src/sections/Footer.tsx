import { useEffect, useRef, useState } from 'react';
import { Twitter, Linkedin, Github, Rss, ExternalLink } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Patent Analysis', href: '#analysis' },
  { label: 'Technology Areas', href: '#categories' },
  { label: 'About Us', href: '#about' },
];

const resources = [
  { label: 'USPTO Database', href: 'https://www.uspto.gov', external: true },
  { label: 'EPO Search', href: 'https://www.epo.org', external: true },
  { label: 'WIPO Patents', href: 'https://www.wipo.int', external: true },
  { label: 'Nvidia Research', href: 'https://research.nvidia.com', external: true },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Rss, href: '#', label: 'RSS' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-[#76b900]/20"
    >
      {/* Top Border Animation */}
      <div
        className={`absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#76b900] to-transparent transition-all duration-1000 ${
          isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
      />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div
            className={`lg:col-span-1 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <a href="#home" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-white">NVIDIA</span>
                <span className="text-[#76b900] ml-1">PATENTS</span>
              </span>
            </a>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Professional patent analysis and insights into Nvidia&apos;s innovation portfolio. 
              Deep technical dives for decision-makers.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#a0a0a0] hover:bg-[#76b900]/20 hover:text-[#76b900] transition-all duration-300 hover:scale-110 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                    style={{ transitionDelay: `${500 + index * 80}ms` }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={link.label}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 60}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-[#a0a0a0] hover:text-[#76b900] transition-colors duration-300 text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li
                  key={link.label}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${500 + index * 60}ms` }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a0a0a0] hover:text-[#76b900] transition-colors duration-300 text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#a0a0a0] hover:text-[#76b900] transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#a0a0a0] hover:text-[#76b900] transition-colors duration-300 text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#a0a0a0] hover:text-[#76b900] transition-colors duration-300 text-sm"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-16 pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-[#666] text-sm text-center md:text-left">
            © 2024 Nvidia Patent Analysis. All rights reserved.
          </p>
          <p className="text-[#666] text-xs text-center md:text-right">
            This is an independent analysis platform. Not affiliated with Nvidia Corporation.
          </p>
        </div>
      </div>

      {/* Logo Glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#76b900]/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </footer>
  );
}
