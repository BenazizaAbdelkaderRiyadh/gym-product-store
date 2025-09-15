import React, { useState, useRef, useEffect } from 'react';

const VigorLogo: React.FC = () => (
  <h1 className="text-3xl font-black tracking-tighter text-zinc-800">GYM</h1>
);

const ArrowIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PlayIcon: React.FC<{className?: string}> = ({ className = "w-12 h-12 ml-1" }) => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M81.25 43.6651C85.4167 46.0186 85.4167 51.9814 81.25 54.3349L31.25 82.9952C27.0833 85.3487 22.25 82.3673 22.25 77.6603L22.25 20.3397C22.25 15.6327 27.0833 12.6513 31.25 15.0048L81.25 43.6651Z" fill="white"/>
  </svg>
);

const PauseIcon: React.FC<{className?: string}> = ({ className = "w-12 h-12" }) => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="25" y="20" width="15" height="60" rx="7.5" fill="white"/>
    <rect x="60" y="20" width="15" height="60" rx="7.5" fill="white"/>
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const navItems = ['HOME', 'PRODUCTS', 'WORKOUTS', 'CONTACT'];
  return (
    <header className="flex items-center justify-between">
      <VigorLogo />
      <div className="flex items-center space-x-2">
        <nav className="hidden md:block bg-zinc-100 rounded-full p-1">
          {navItems.map((item) => (
            <a key={item} href="#" className="px-5 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors rounded-full">
              {item}
            </a>
          ))}
        </nav>
        <button className="flex items-center space-x-2 bg-zinc-800 text-white rounded-full px-5 py-3 text-xs font-bold hover:bg-zinc-700 transition-colors">
          <span>SHOP NOW</span>
          <ArrowIcon />
        </button>
      </div>
    </header>
  );
};

const products = [
  {
    id: 1,
    name: 'MAX TITANUIM',
    tagline: 'WHEY PRO',
    price: '59.99',
    description: 'Fuel your recovery and build lean muscle. Each scoop delivers 25g of ultra-filtered whey protein for peak performance.',
    imageSrc: './assets/1.png',
  },
  {
    id: 2,
    name: 'VEGAN POWER',
    tagline: 'PLANT BASED',
    price: '64.99',
    description: 'A premium plant-based protein blend. Delivers 22g of protein from pea, brown rice, and quinoa.',
    imageSrc: './assets/2.png',
  },
  {
    id: 3,
    name: 'ISO-XTREM',
    tagline: 'ZERO CARB',
    price: '72.99',
    description: 'Pure whey protein isolate for rapid absorption. Perfect for post-workout recovery with zero fat and minimal carbs.',
    imageSrc: './assets/3.png'
  },
];

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeProduct = products[activeIndex];

  const scrollToProduct = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const slide = container.children[index] as HTMLElement;
      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    scrollToProduct(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < products.length - 1 ? activeIndex + 1 : products.length - 1;
    scrollToProduct(newIndex);
  };

  const handleEnterTheater = () => {
    setIsTheaterMode(true);
    const video = videoRef.current;
    if(video) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleExitTheater = () => {
    setIsTheaterMode(false);
    const video = videoRef.current;
    if(video) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleExitTheater();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveIndex(index);
            return;
          }
        }
      }, { root: container, threshold: 0.6 }
    );

    const children = container.querySelectorAll('.product-slide');
    children.forEach((child, index) => {
      child.setAttribute('data-index', String(index));
      observer.observe(child);
    });

    return () => {
      children.forEach(child => observer.unobserve(child));
    };
  }, []);
  
  return (
    <div className={`group overflow-hidden transition-all duration-700 transition-expo ${isTheaterMode ? 'fixed inset-0 w-screen h-screen rounded-none z-50' : 'relative mt-8 aspect-[4/3] md:aspect-[16/9] rounded-3xl'}`}>
      <video
        ref={videoRef}
        src="./assets/video.mp4"
        className="w-full h-full object-cover"
        autoPlay loop muted playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      <button 
        onClick={handleEnterTheater}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isTheaterMode ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 hover:bg-white/50'}`} 
        aria-label="Enter video theater mode"
      >
        <PlayIcon />
      </button>

      <div className={`absolute inset-0 transition-opacity duration-500 ${isTheaterMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={handleExitTheater} className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-2 hover:bg-black/75" aria-label="Exit theater mode">
          <CloseIcon className="w-6 h-6" />
        </button>
        <button onClick={handleMuteToggle} className="absolute bottom-6 left-6 text-white bg-black/50 rounded-full p-3 hover:bg-black/75" aria-label={isMuted ? "Unmute video" : "Mute video"}>
          {isMuted ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
        </button>
      </div>
      
      <div className={`absolute top-0 left-0 bg-white p-6 md:p-8 rounded-br-[4rem] w-full max-w-xs sm:max-w-sm md:max-w-md transition-all duration-500 transition-expo ${isTheaterMode ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
        <div key={activeProduct.id} className="flex flex-col animate-slide-in">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-800 tracking-tighter">{activeProduct.name}</h1>
            <div className="flex items-baseline mt-1">
              <span className="text-zinc-400 font-semibold text-lg mr-2">${activeProduct.price}</span>
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-500 tracking-tighter">{activeProduct.tagline}</span>
            </div>
          </div>
          <p className="text-zinc-600 mt-4 text-sm sm:text-base h-16 sm:h-12">
            {activeProduct.description}
          </p>
          <div className="flex items-center space-x-2 mt-6">
            <button className="border border-zinc-300 rounded-full px-5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors">BUY NOW</button>
            <button className="flex items-center space-x-2 border border-zinc-300 rounded-full px-5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors">
              <span>VIEW FLAVORS</span>
              <div className="bg-zinc-800 text-white rounded-full p-1">
                <ArrowIcon className="w-3 h-3"/>
              </div>
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProduct(index)}
                className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
                aria-label={`Go to product ${index + 1}`}
                aria-current={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 right-0 transition-all duration-500 transition-expo ${isTheaterMode ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
        style={{ width: "220px", height: "320px" }}
      >
        <div
          className="absolute inset-0 bg-zinc-400"
          style={{ clipPath: "polygon(0% 100%, 100% 0, 100% 100%)" }}
        />
        <div
          ref={scrollContainerRef}
          className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-slide flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4"
              aria-label={`${product.name} ${product.tagline}`}
            >
              <img
                src={product.imageSrc}
                alt={`${product.name} ${product.tagline} protein tub`}
                className="max-h-[85%] object-contain pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] product-image-transition"
                style={{
                  transform:
                    activeIndex === index
                      ? "rotate(-15deg) scale(1.6)"
                      : "rotate(0deg) scale(0.9)",
                  opacity: activeIndex === index ? 1 : 0.6,
                  transformOrigin: "center 70%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isTheaterMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button onClick={handlePrev} disabled={activeIndex === 0} className="carousel-arrow left-arrow" aria-label="Previous product">
          <ChevronLeftIcon />
        </button>
        <button onClick={handleNext} disabled={activeIndex === products.length - 1} className="carousel-arrow right-arrow" aria-label="Next product">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

const StyleInjector: React.FC = () => (
  <style>{`
    @keyframes slideInHorizontal {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideInHorizontal 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .nav-dot {
      width: 8px; height: 8px; border-radius: 9999px;
      background-color: #d4d4d8;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    .nav-dot.active { width: 24px; background-color: #18181b; }
    .transition-expo { transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1); }
    .product-image-transition {
      transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.5s ease-in-out;
    }
    .carousel-arrow {
      position: absolute; top: 50%;
      width: 48px; height: 48px;
      background-color: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(4px);
      border-radius: 9999px;
      display: flex; align-items: center; justify-content: center;
      color: #18181b;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease-in-out, transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 20;
    }
    .carousel-arrow.left-arrow { left: 2rem; transform: translateY(-50%) translateX(-20px); }
    .carousel-arrow.right-arrow { right: 2rem; transform: translateY(-50%) translateX(20px); }
    .group:not([class*='fixed']):hover .carousel-arrow:not(:disabled) {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
    .carousel-arrow:not(:disabled):hover {
      transform: translateY(-50%) translateX(0) scale(1.1);
    }
    .carousel-arrow:disabled {
      opacity: 0 !important;
      cursor: not-allowed;
    }
  `}</style>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <StyleInjector />
      <main className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl p-4 sm:p-6 lg:p-8">
        <Header />
        <Hero />
      </main>
    </div>
  );
};

export default App;