import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface BinaryMarkProps {
  mouseX: number;
  mouseY: number;
}

// Staggered container for the text
const textContainerVariants: Variants = {
  hidden: { 
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1, when: "afterChildren" }
  },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0, when: "beforeChildren" } 
  },
};

// Sophisticated Fade - No Popping, No Movement
const charVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(10px)", // Cinematic blur out
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { 
        duration: 0.5,
        ease: "linear"
    }
  },
};

export const BinaryMark: React.FC<BinaryMarkProps> = ({ mouseX, mouseY }) => {
  const [hoverO, setHoverO] = useState(false);
  const [hoverX, setHoverX] = useState(false);

  return (
    // Container uses responsive gap based on viewport width
    <div className="relative w-full max-w-[90vw] aspect-video flex items-center justify-center gap-[10vw] md:gap-[30vw] pointer-events-none select-none">
      
      {/* Left Wrapper: THE VOID [O] */}
      <motion.div 
        className="relative group pointer-events-auto"
        onHoverStart={() => setHoverO(true)}
        onHoverEnd={() => setHoverO(false)}
        onClick={() => setHoverO(!hoverO)}
        data-hover="true"
      >
        {/* Dynamic Size using vmin ensures it fits on mobile/desktop proportionally */}
        <div className="w-[30vmin] h-[30vmin] max-w-[320px] max-h-[320px] flex items-center justify-center relative overflow-visible">
            
            {/* The O Shape */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none"
                animate={{ 
                    opacity: hoverO ? 0 : 1,
                    scale: hoverO ? 0.95 : 1, // Subtle scale down instead of big shrink
                    filter: hoverO ? "blur(5px)" : "blur(0px)"
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
               {/* Border thickness scales with vmin */}
               <div className="w-full h-full rounded-full border-[3vmin] border-white bg-black transition-transform duration-500 ease-out group-hover:scale-105" />
            </motion.div>

            {/* The Text: OFFLINE */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={textContainerVariants}
                initial="hidden"
                animate={hoverO ? "visible" : "hidden"}
            >
                {/* Dynamic Font Size - Reduced to 5vmin for consistency */}
                <div className="text-[5vmin] font-black text-white tracking-tighter uppercase whitespace-nowrap flex py-4">
                    {"OFFLINE".split("").map((char, i) => (
                        <motion.span key={i} variants={charVariants}>
                            {char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
        
        {/* Label for O */}
        <motion.div 
            animate={{ opacity: hoverO ? 0 : 1 }}
            className="absolute -bottom-[5vmin] left-1/2 -translate-x-1/2 text-center mix-blend-difference pointer-events-none"
        >
             <span className="block font-mono text-[1.5vmin] tracking-[0.3em] text-white uppercase opacity-80 whitespace-nowrap">The Void</span>
             <span className="block font-mono text-[1.2vmin] text-ox-red mt-[0.5vmin] opacity-60">[ NULL ]</span>
        </motion.div>
      </motion.div>

      {/* Right Wrapper: THE SYSTEM [X] */}
      <motion.div 
        className="relative group pointer-events-auto"
        onHoverStart={() => setHoverX(true)}
        onHoverEnd={() => setHoverX(false)}
        onClick={() => setHoverX(!hoverX)}
        data-hover="true"
      >
         <div className="w-[30vmin] h-[30vmin] max-w-[320px] max-h-[320px] flex items-center justify-center relative overflow-visible">
            {/* The X Shape */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ 
                    opacity: hoverX ? 0 : 1,
                    scale: hoverX ? 0.95 : 1,
                    rotate: hoverX ? 90 : 0,
                    filter: hoverX ? "blur(5px)" : "blur(0px)"
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="relative w-full h-full transition-transform duration-300 ease-out">
                    <div className="absolute top-1/2 left-1/2 w-[120%] h-[3vmin] bg-ox-black -translate-x-1/2 -translate-y-1/2 rotate-45" />
                    <div className="absolute top-1/2 left-1/2 w-[120%] h-[3vmin] bg-ox-black -translate-x-1/2 -translate-y-1/2 -rotate-45" />
                </div>
            </motion.div>

            {/* The Text: XPERIENCE */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={textContainerVariants}
                initial="hidden"
                animate={hoverX ? "visible" : "hidden"}
            >
                 {/* Dynamic Font Size - Reduced to 5vmin to prevent clipping */}
                 <div className="text-[5vmin] font-black text-ox-black tracking-tighter uppercase whitespace-nowrap flex py-4">
                    {"XPERIENCE".split("").map((char, i) => (
                        <motion.span key={i} variants={charVariants}>
                            {char}
                        </motion.span>
                    ))}
                 </div>
            </motion.div>
         </div>

        {/* Label for X */}
        <motion.div 
            animate={{ opacity: hoverX ? 0 : 1 }}
            className="absolute -bottom-[5vmin] left-1/2 -translate-x-1/2 text-center pointer-events-none"
        >
             <span className="block font-mono text-[1.5vmin] tracking-[0.3em] text-ox-black uppercase opacity-80 whitespace-nowrap">The System</span>
             <span className="block font-mono text-[1.2vmin] text-ox-red mt-[0.5vmin] opacity-60">[ EXE ]</span>
        </motion.div>
      </motion.div>
      
    </div>
  );
};