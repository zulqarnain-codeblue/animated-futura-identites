"use client";
import React, { useRef } from "react";
import { H2, H3, Paragraph } from "../ui/Typography";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// Your original RevealText — untouched
const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const FacilitySection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const neonImage = "/images/33b921fcccec99552501830d4f7c45a967ed3d54.webp";
  const amazonFacility = "/images/a806a3e2cb0e78cffec1298cabbc6b1721c73b47.webp";

  return (
    <section
      ref={containerRef}
      className="bg-white py-12 sm:py-20 md:py-28 relative overflow-hidden"
    >
      {/* Parallax Background Orbs */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10 opacity-8 pointer-events-none"
      >
        <div className="absolute top-0 -left-64 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-64 w-80 h-80 bg-gradient-to-tl from-indigo-500 to-purple-600 rounded-full blur-3xl" />
      </motion.div>

      <div className="md:max-w-4xl xl:max-w-6xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left: Text with your RevealText */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <RevealText>
              <H2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Our Facility
              </H2>
            </RevealText>

            <RevealText delay={0.15}>
              <H3 className="text-black opacity-90 font-semibold leading-tight">
                Where the best value comes <br className="hidden sm:inline" />
                with the best values
              </H3>
            </RevealText>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex border-l-4 border-theme pl-6 mt-10"
            >
              <Paragraph className="opacity-75 leading-relaxed text-base">
                Our focus on collaboration, transparency, and customer
                satisfaction drives us to exceed expectations, turning visionary
                concepts into reality. Whether it's a small-scale project or a
                nationwide rollout, we prioritize quality, efficiency, and
                lasting impact.
              </Paragraph>
            </motion.div>
          </motion.div>

          {/* Right: Image Collage with CLIP-PATH Magic */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.4 }}
            className="lg:w-1/2 relative"
            style={{ perspective: 1400 }}
          >
            <div className="relative">
              {/* Top Image – Diagonal Clip-Path Reveal */}
              <motion.div
                initial={{ rotate: -6, scale: 0.9 }}
                animate={isInView ? { rotate: 0, scale: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 0.8 }}
                whileHover={{ rotate: -2, y: -12, scale: 1.04 }}
                className="relative w-[67%] ml-auto origin-right z-10"
              >
                {/* Animated Border Frame */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.6, delay: 1.4 }}
                  className="absolute -top-4 left-4 w-full h-full border-2 border-gray-300 origin-left -z-10"
                />

                {/* Image with Diagonal Clip-Path Reveal */}
                <div className="overflow-hidden shadow-2xl">
                  <motion.div
                    initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
                    animate={
                      isInView
                        ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
                        : {}
                    }
                    transition={{ duration: 1.8, ease, delay: 1 }}
                    className="w-full h-[280px] md:h-[320px]"
                  >
                    <Image
                      src={neonImage}
                      alt="Creative neon art"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Bottom Image – Bottom-to-Top Clip-Path Sweep */}
              <motion.div
                initial={{ y: 100, rotate: 8, scale: 0.85 }}
                animate={isInView ? { y: 0, rotate: 0, scale: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 1.1 }}
                whileHover={{ y: -20, scale: 1.06 }}
                className="relative -mt-20 ml-10 w-[52%] origin-bottom-left z-10"
              >
                <div className="overflow-hidden shadow-2xl">
                  <motion.div
                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                    animate={
                      isInView
                        ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
                        : {}
                    }
                    transition={{ duration: 1.6, ease, delay: 1.4 }}
                    className="w-full h-[200px] md:h-[240px]"
                  >
                    <Image
                      src={amazonFacility}
                      alt="Amazon logistics facility"
                      width={700}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Vertical Text + Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.6 }}
                className="absolute top-48 -right-8 hidden md:block"
              >
                <p className="text-sm tracking-widest uppercase text-gray-800 transform -rotate-90 origin-left flex items-center gap-4 whitespace-nowrap">
                  <span className="opacity-50">OUR FACILITY</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 2 }}
                    className="bg-theme w-20 h-0.5 origin-left"
                  />
                </p>
              </motion.div>

              {/* Center Logo – Final Hero Moment */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                transition={{ duration: 1.6, delay: 1.8, ease }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Image
                  src="/images/d56eac3a7219904deaaff9bd7cad01e6c0d7e110.webp"
                  alt="Brand emblem"
                  width={540}
                  height={540}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;