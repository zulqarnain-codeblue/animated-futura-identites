"use client";

import { motion } from "framer-motion";

// The "Stairway" transition effect
const variants = {
  initial: {
    height: "100vh",
  },
  enter: (i: number) => ({
    height: "0vh",
    transition: {
      duration: 0.75,
      delay: 0.05 * i, // Stagger effect
      ease: [0.76, 0, 0.24, 1], // High-end easing
    },
  }),
};

// Subtle content fade-in to accompany the shutters
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: 0.4 } 
  }
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* The 5 Columns (Shutters) */}
      <div className="fixed inset-0 flex pointer-events-none z-[50]">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={variants}
            initial="initial"
            animate="enter"
            className="w-full bg-[#141516] border-r border-white/5 last:border-r-0 relative"
          />
        ))}
      </div>

      {/* The Page Content */}
      <motion.main
        variants={contentVariants}
        initial="initial"
        animate="enter"
      >
        {children}
      </motion.main>
    </div>
  );
}