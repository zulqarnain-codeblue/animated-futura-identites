"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShutterLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    // Simulate load time
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Generate 5 columns
  const columns = Array.from({ length: 5 });

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none">
          {columns.map((_, i) => (
            <Column key={i} index={i} total={columns.length} />
          ))}
          
          {/* Central Logo/Text Overlay - Fades out before shutters open */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <h1 className="text-white text-4xl font-bold tracking-[0.2em] uppercase">
              Futura
            </h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Column({ index, total }: { index: number; total: number }) {
  return (
    <motion.div
      initial={{ height: "100%" }}
      exit={{
        height: "0%",
        transition: {
          duration: 0.8,
          // Calculate stagger based on index
          delay: 0.05 * index, 
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      className="relative w-full bg-[#141516] border-r border-white/5 last:border-r-0"
    />
  );
}