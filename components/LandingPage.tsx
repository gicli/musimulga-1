import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, Download } from 'lucide-react';

interface LandingPageProps {
  onStart: (query: string) => void;
  onInstall?: () => void;
  canInstall?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onInstall, canInstall }) => {
  const [query, setQuery] = useState('');
  const [bgLoaded, setBgLoaded] = useState(false);

  // Pollinations AI URL for a consistent oil painting style background
  const bgImage = "https://image.pollinations.ai/prompt/oil%20painting%20style%20landscape%20of%20a%20mysterious%20and%20beautiful%20flower%20garden,%20claude%20monet%20style,%20impressionism,%20thick%20brush%20strokes,%20soft%20pastel%20colors,%20warm%20sunlight,%20masterpiece?width=1920&height=1080&nologo=true&seed=42";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(query);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Image with Fade-in Effect */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <img 
          src={bgImage} 
          alt="Oil Painting Background" 
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-2000 scale-105 ${bgLoaded ? 'opacity-100 scale-100' : 'opacity-0'}`}
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
      </div>

      {/* Main Content Card */}
      <div className="relative z-20 w-full max-w-3xl px-6">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center animate-fade-in-up">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-yellow-200" />
            <span className="tracking-wide">AI Gardening Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
            뭐 <span className="italic text-emerald-300">심지?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-200 font-light mb-10 leading-relaxed drop-shadow-md">
            당신의 정원에 예술을 심어보세요.<br/>
            계절별 추천 꽃부터 특정 식물 정보까지 찾아드립니다.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-5 text-white/60 w-5 h-5 group-focus-within:text-emerald-300 transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="8월에 뭐 심지? 또는 수국, 튤립" 
                className="w-full pl-14 pr-14 py-4 bg-black/20 backdrop-blur-md border border-white/30 rounded-full text-lg text-white placeholder:text-white/50 focus:outline-none focus:bg-black/40 focus:border-emerald-400/50 transition-all shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-2 p-2.5 bg-white text-emerald-900 rounded-full hover:bg-emerald-300 transition-colors shadow-lg"
                aria-label="검색"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-3 justify-center text-sm text-white/70">
            <button onClick={() => onStart("지금 심기 좋은 꽃")} className="hover:text-white hover:underline decoration-emerald-400 underline-offset-4 transition-all">#지금_심기_좋은</button>
            <span className="text-white/20">|</span>
            <button onClick={() => onStart("수국")} className="hover:text-white hover:underline decoration-emerald-400 underline-offset-4 transition-all">#수국</button>
            <span className="text-white/20">|</span>
            <button onClick={() => onStart("라벤더")} className="hover:text-white hover:underline decoration-emerald-400 underline-offset-4 transition-all">#라벤더</button>
          </div>

          {canInstall && onInstall && (
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
              <button 
                onClick={onInstall}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
              >
                <Download size={18} />
                앱 설치하기
              </button>
            </div>
          )}

        </div>

        <footer className="mt-8 text-center text-white/40 text-xs font-light tracking-widest">
          DESIGNED FOR YOUR BEAUTIFUL GARDEN LIFE
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;