"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Counter Logic
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);

    // Finish loading slightly after counter hits 100
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
          
          {/* Top Panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="flex-1 w-full bg-[#111] flex items-end justify-center pb-4 border-b border-white/10 relative"
          >
             {/* Text placed in top panel */}
             <motion.div 
               exit={{ opacity: 0 }} 
               className="text-white font-mono text-sm tracking-widest absolute bottom-8 left-8"
             >
                LOADING EXPERIENCE
             </motion.div>
          </motion.div>

          {/* Center Progress Line */}
          <motion.div 
             className="w-full h-[2px] bg-transparent relative z-50"
             exit={{ opacity: 0 }}
          >
             <motion.div 
                className="h-full bg-theme-500"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
             />
          </motion.div>

          {/* Bottom Panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="flex-1 w-full bg-[#111] flex items-start justify-center pt-4 border-t border-white/10 relative"
          >
              {/* Counter placed in bottom panel */}
              <motion.div 
                 exit={{ opacity: 0 }} 
                 className="text-white font-bold text-6xl md:text-8xl absolute top-4 right-8 opacity-20"
              >
                {counter}
              </motion.div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}