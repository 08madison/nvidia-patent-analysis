import { useState } from 'react';
import { X, FileText, Play, Calendar, Clock, Star, Check, ArrowLeft } from 'lucide-react';
import type { Patent } from '@/types';
import PPTViewer from './PPTViewer';
import VideoPlayer from './VideoPlayer';
import CommentSection from './CommentSection';
import { comments } from '@/data/patents';

interface PatentDetailModalProps {
  patent: Patent | null;
  isOpen: boolean;
  onClose: () => void;
}

// Sample PPT slides for demo
const sampleSlides = [
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1555617981-778dd1c43165?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
];

export default function PatentDetailModal({ patent, isOpen, onClose }: PatentDetailModalProps) {
  const [showPPT, setShowPPT] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  if (!isOpen || !patent) return null;

  const patentComments = comments.filter((c) => c.patentId === patent.id);

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-[#333]">
          <div className="container-custom py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[#a0a0a0] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Analysis</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              {patent.image && (
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={patent.image}
                    alt={patent.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}

              {/* Patent Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#76b900]/20 text-[#76b900] text-sm font-mono">
                    {patent.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[#a0a0a0] text-sm">
                    {patent.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{patent.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#a0a0a0]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {patent.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {patent.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#76b900]" />
                    {patent.citations} citations
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {patent.hasPPT && (
                  <button
                    onClick={() => setShowPPT(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View PPT
                  </button>
                )}
                {patent.hasVideo && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="btn-outline flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Video
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
                <p className="text-[#e0e0e0] leading-relaxed">{patent.description}</p>
              </div>

              {/* Key Points */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Key Innovations</h2>
                <ul className="space-y-3">
                  {patent.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#76b900]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#76b900]" />
                      </div>
                      <span className="text-[#e0e0e0]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Related Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {patent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-white/5 text-[#e0e0e0] border border-white/10 hover:border-[#76b900]/50 hover:text-[#76b900] transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <CommentSection comments={patentComments} patentId={patent.id} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Related Patents Card */}
                <div className="bg-[#0f0f0f] rounded-2xl border border-[#333] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Related Patents</h3>
                  <div className="space-y-4">
                    {['US11,234,567B2', 'US10,987,654B2', 'US10,765,432B2'].map((num) => (
                      <div
                        key={num}
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <div className="text-sm font-mono text-[#76b900]">{num}</div>
                        <div className="text-sm text-[#a0a0a0] mt-1">Related technology patent</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citation Info */}
                <div className="bg-[#0f0f0f] rounded-2xl border border-[#333] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Citation Impact</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#a0a0a0]">Forward Citations</span>
                        <span className="text-[#76b900] font-bold">{patent.citations}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#76b900] rounded-full"
                          style={{ width: `${Math.min((patent.citations / 1000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#333]">
                      <p className="text-sm text-[#666]">
                        This patent has been cited by {patent.citations} other patents, indicating
                        significant influence in the field.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PPT Viewer */}
      <PPTViewer
        slides={sampleSlides}
        isOpen={showPPT}
        onClose={() => setShowPPT(false)}
        title={patent.title}
      />

      {/* Video Player */}
      <VideoPlayer
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        thumbnailUrl={patent.image || ''}
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        title={patent.title}
      />
    </>
  );
}
