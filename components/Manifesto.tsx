import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={containerRef} className="relative w-full py-24 px-[5vw] bg-ox-black text-ox-white min-h-screen flex flex-col justify-center items-center overflow-hidden">
      
      {/* Decorative Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            y: gridY,
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl z-10 w-full flex flex-col gap-[15vh]">
        
        {/* Block 1 */}
        <motion.div style={{ y: textY1 }}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="md:w-1/4 font-mono text-ox-red text-sm pt-4">
                [ 01_DISCONNECT ]
              </div>
              <div className="md:w-3/4">
                {/* Fluid Typography: clamp(min, preferred, max) */}
                <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight mb-6">
                  Esc<span className="text-transparent hover:text-white transition-colors duration-300 stroke-text">ape</span> The <br/> Algorithm.
                </h2>
                <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-mono opacity-60 leading-relaxed max-w-xl">
                  We live in a world of constant noise. Signals. Notifications. The infinite scroll. OX is the anti-platform. A physical space to engage with the tangible.
                </p>
              </div>
            </motion.div>
        </motion.div>

        {/* Block 2 */}
        <motion.div style={{ y: textY2 }}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-start text-right md:flex-row-reverse"
            >
              <div className="md:w-1/4 font-mono text-ox-red text-sm pt-4">
                [ 02_THE_VOID ]
              </div>
              <div className="md:w-3/4 flex flex-col items-end">
                <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight mb-6">
                  Ent<span className="text-transparent hover:text-white transition-colors duration-300 stroke-text">er</span> The <br/> Silence.
                </h2>
                <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-mono opacity-60 leading-relaxed max-w-xl">
                  State 0 is the void. It is the absence of digital clutter. It is where creativity breathes. Reclaim your attention span.
                </p>
              </div>
            </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-12 flex justify-center"
        >
            <motion.button 
                data-hover="true"
                whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(255, 0, 0, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative px-12 py-6 bg-ox-white text-ox-black font-bold text-xl uppercase tracking-widest overflow-hidden"
            >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Initiate System</span>
                <div className="absolute inset-0 bg-ox-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.button>
        </motion.div>

      </div>
      
      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px white;
        }
      `}</style>
    </section>
  );
};