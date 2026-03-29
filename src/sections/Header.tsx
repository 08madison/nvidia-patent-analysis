import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { navItems } from '@/data/patents';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-[#76b900]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">NVIDIA</span>
              <span className="text-[#76b900] ml-1">PATENTS</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative text-sm font-medium text-[#e0e0e0] hover:text-[#76b900] transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#76b900] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#newsletter')}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              Subscribe
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[70px] left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-[#333] transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container-custom py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-lg font-medium text-[#e0e0e0] hover:text-[#76b900] transition-colors duration-300 py-2"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => scrollToSection('#newsletter')}
            className="btn-primary mt-4 flex items-center justify-center gap-2"
          >
            Subscribe
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
}
