import { useEffect, useRef, useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118, 185, 0, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '20%',
            left: '10%',
            animation: 'float 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118, 185, 0, 0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '10%',
            right: '15%',
            animation: 'float 30s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block text-sm font-medium text-[#76b900] tracking-wider uppercase mb-4">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-lg text-[#e0e0e0] mb-10">
              Get the latest patent analysis delivered to your inbox. No spam, just insights.
            </p>
          </div>

          {/* Form Container */}
          <div
            className={`glass rounded-3xl p-8 md:p-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-[#76b900]/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#76b900]" />
                </div>
                <h3 className="text-xl font-bold text-white">You&apos;re Subscribed!</h3>
                <p className="text-[#a0a0a0]">Thank you for joining our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="input-dark w-full pr-4 pl-4 py-4 text-base"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#666] text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap items-center justify-center gap-6 mt-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Check className="w-4 h-4 text-[#76b900]" />
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Check className="w-4 h-4 text-[#76b900]" />
              <span>No Spam</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Check className="w-4 h-4 text-[#76b900]" />
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
