import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface PPTViewerProps {
  slides: string[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function PPTViewer({ slides, isOpen, onClose, title }: PPTViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-semibold truncate max-w-md">{title}</h3>
          <span className="text-[#666] text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-[#a0a0a0] text-sm w-16 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-[#333] mx-2" />
          <button
            onClick={() => {}}
            className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors ml-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div
          className="relative transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#333]">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {/* Slide Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xl px-4">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentSlide
                  ? 'border-[#76b900] ring-2 ring-[#76b900]/30'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={slide} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
