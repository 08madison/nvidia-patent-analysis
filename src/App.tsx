import { useState } from 'react';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import PatentCategories from '@/sections/PatentCategories';
import FeaturedPatent from '@/sections/FeaturedPatent';
import Statistics from '@/sections/Statistics';
import LatestAnalysis from '@/sections/LatestAnalysis';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';
import PatentDetailModal from '@/components/custom/PatentDetailModal';
import type { Patent } from '@/types';
import './App.css';

function App() {
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePatentClick = (patent: Patent) => {
    setSelectedPatent(patent);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Make handlePatentClick available globally for section components
  (window as unknown as { openPatentDetail: (patent: Patent) => void }).openPatentDetail = handlePatentClick;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <PatentCategories />
        <FeaturedPatent />
        <Statistics />
        <LatestAnalysis />
        <Newsletter />
      </main>
      <Footer />

      {/* Patent Detail Modal */}
      <PatentDetailModal
        patent={selectedPatent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
