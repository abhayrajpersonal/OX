import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { BinaryMark } from './components/BinaryMark';
import { Manifesto } from './components/Manifesto';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Split Screen calculation
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations for Hero
  const { scrollY } = useScroll();
  const bgTextX = useTransform(scrollY, [0, 500], [0, -200]);
  const bgTextOpacity = useTransform(scrollY, [0, 500], [0.2, 0]);
  const bgTextScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

  return (
    <main className="bg-ox-white min-h-screen w-full relative selection:bg-ox-red selection:text-white">
      <Cursor />
      <Header />

      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center sticky top-0"
      >
        {/* Background Layers */}
        <div className="absolute inset-0 flex">
            {/* Left Side: BLACK (The Void) */}
            <div className="w-1/2 h-full bg-ox-black relative overflow-hidden">
                <div className="absolute bottom-10 left-10 font-mono text-ox-white text-xs opacity-30 rotate-90 origin-bottom-left">
                    STATE: VOID [0]
                </div>
            </div>
            
            {/* Right Side: WHITE (The System) */}
            <div className="w-1/2 h-full bg-ox-white relative overflow-hidden">
                 <div className="absolute top-10 right-10 font-mono text-ox-black text-xs opacity-30 -rotate-90 origin-top-right">
                    STATE: SYSTEM [X]
                </div>
                {/* Subtle Grid on White Side */}
                 <div 
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                />
            </div>
        </div>

        {/* Central Vertical Line */}
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-ox-red opacity-50" />
        
        {/* Horizontal Line at Center */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-ox-red opacity-50" />

        {/* The Interactive Mark - Removed hardcoded scaling to rely on component responsiveness */}
        <div className="relative z-10 w-full flex justify-center">
             <BinaryMark mouseX={mousePos.x} mouseY={mousePos.y} />
        </div>

        {/* Big Background Typography (Parallax & Scroll) */}
        <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center mix-blend-overlay"
            style={{ opacity: bgTextOpacity }}
        >
             {/* Scroll Animation Wrapper */}
             <motion.div style={{ x: bgTextX, scale: bgTextScale }}>
                 {/* Mouse Parallax Inner */}
                 <h1 
                    className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap text-ox-white"
                    style={{ 
                        transform: `translateX(${(mousePos.x - windowWidth/2) * 0.1}px)` 
                    }}
                 >
                    OFFLINE
                 </h1>
             </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference text-white">
            <span className="font-mono text-[10px] tracking-widest uppercase animate-pulse">Scroll to Initiate</span>
            <div className="w-[1px] h-12 bg-white" />
        </div>
      </section>

      {/* Content Section */}
      <Manifesto />
      
      {/* Footer */}
      <footer className="bg-ox-black text-ox-white py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h3 className="font-bold text-2xl tracking-tighter uppercase mb-2">Offline Xperience</h3>
                <p className="font-mono text-xs text-gray-500">© 2025 ALL RIGHTS RESERVED. // NO SIGNAL DETECTED.</p>
            </div>
            <div className="flex gap-6 font-mono text-xs uppercase">
                <a href="#" className="hover:text-ox-red transition-colors" data-hover="true">Instagram</a>
                <a href="#" className="hover:text-ox-red transition-colors" data-hover="true">Twitter</a>
                <a href="#" className="hover:text-ox-red transition-colors" data-hover="true">Manifesto</a>
            </div>
        </div>
      </footer>

    </main>
  );
};

export default App;