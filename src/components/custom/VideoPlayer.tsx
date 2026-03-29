import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, isOpen, onClose, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowThumbnail(true);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
        <h3 className="text-white font-semibold truncate max-w-lg">{title}</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 text-[#a0a0a0] hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="relative w-full max-w-5xl aspect-video bg-[#0f0f0f] rounded-xl overflow-hidden">
          {/* Thumbnail */}
          {showThumbnail && (
            <div className="absolute inset-0 z-10">
              <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-[#76b900] flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_40px_rgba(118,185,0,0.5)]"
                >
                  <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onClick={togglePlay}
          />

          {/* Custom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#76b900]"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
