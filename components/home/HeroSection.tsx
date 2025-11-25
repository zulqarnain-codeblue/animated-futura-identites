"use client";

import React, { useRef, useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import Link from "next/link";
import CircleNotch from "../ui/CircleNotch";
import Image from "next/image";
import { H1, Paragraph } from "../ui/Typography";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import HLSVideoPlayer from "../HLSVideoPlayer";

// FIX 1: "as const" fixes the red line on 'ease' by making it a readonly tuple
const ease = [0.76, 0, 0.24, 1] as const;

// --- Components ---

const Magnetic: React.FC<{ children: React.ReactNode; strength?: number }> = ({
  children,
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  shouldAnimate: boolean; // Added control prop
}> = ({ children, delay = 0, className = "", shouldAnimate }) => (
  <div className={cn("overflow-hidden", className)}>
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  </div>
);

const AnimatedLetters: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  shouldAnimate: boolean; // Added control prop
}> = ({ text, className, delay = 0, stagger = 0.03, shouldAnimate }) => {
  const letters = text.split("");

  return (
    <motion.span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0, rotateX: -90 }}
          animate={
            shouldAnimate
              ? { y: 0, opacity: 1, rotateX: 0 }
              : { y: "100%", opacity: 0, rotateX: -90 }
          }
          transition={{
            duration: 0.8,
            ease,
            delay: delay + i * stagger,
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const AnimatedLine: React.FC<{
  direction: "vertical" | "horizontal";
  delay?: number;
  className?: string;
  shouldAnimate: boolean; // Added control prop
}> = ({ direction, delay = 0, className = "", shouldAnimate }) => (
  <motion.div
    className={cn("bg-theme", className)}
    initial={direction === "vertical" ? { scaleY: 0 } : { scaleX: 0 }}
    animate={
      shouldAnimate
        ? direction === "vertical"
          ? { scaleY: 1 }
          : { scaleX: 1 }
        : direction === "vertical"
        ? { scaleY: 0 }
        : { scaleX: 0 }
    }
    transition={{ duration: 1.2, ease, delay }}
    style={{ originY: direction === "vertical" ? 0 : 0.5, originX: 0 }}
  />
);

const GlowingOrb: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Initial position off-screen to prevent flash
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    // Only start tracking after mount
    if (typeof window === "undefined") return;

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed w-[800px] h-[800px] rounded-full pointer-events-none z-0"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
};

const Particles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-theme/40 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

const VideoReveal: React.FC<{
  children: React.ReactNode;
  shouldAnimate: boolean;
}> = ({ children, shouldAnimate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={
        shouldAnimate
          ? { clipPath: "inset(0% 0 0 0)" }
          : { clipPath: "inset(100% 0 0 0)" }
      }
      transition={{ duration: 1.4, ease, delay: 0.5 }}
    >
      <motion.div style={{ y }}>{children}</motion.div>

      {/* Overlay that fades out */}
      <motion.div
        className="absolute inset-0 bg-black z-10"
        initial={{ opacity: 1 }}
        animate={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
    </motion.div>
  );
};

// FIX 2: Updated Interface to accept href and children
interface AnimatedCTAProps {
  href: string;
  children: React.ReactNode;
  shouldAnimate: boolean;
}

const AnimatedCTA: React.FC<AnimatedCTAProps> = ({
  href,
  children,
  shouldAnimate,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Magnetic strength={0.2}>
      <motion.div
        className="rotate-90 p-3"
        initial={{ opacity: 0, x: -30 }}
        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.8, ease, delay: 1.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={href}
          className="uppercase px-5 py-3 relative inline-block text-sm bg-theme group"
        >
          {/* Background hover effect */}
          <motion.div
            className="absolute inset-0 bg-orange-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ originX: 0 }}
          />

          <motion.span
            className="relative z-10"
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>

          {/* Arrow - positioned to the right */}
          <span className="absolute top-1/2 -right-5 -translate-y-1/2 flex items-center justify-center pointer-events-none group">
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <BsArrowRight
                size={24}
                className="transition-transform duration-300 text-theme group-hover:translate-x-2"
              />
            </motion.div>
          </span>

          {/* Circle Notch - positioned correctly */}
          <span className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                rotate: isHovered ? 90 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, ease }}
            >
              <CircleNotch
                color="white"
                className="w-[100px] lg:w-[120px] xl:w-[130px] h-[100px] lg:h-[120px] xl:h-[130px]"
              />
            </motion.div>
          </span>
        </Link>
      </motion.div>
    </Magnetic>
  );
};

// --- Main Hero Section ---

const HeroSection: React.FC = () => {
  const sectionRef = useRef(null);

  // FIX 3: Animation State Control
  const [startAnimation, setStartAnimation] = useState(false);
  const [timerAnimation, setTimerAnimation] = useState(1500);

  useEffect(() => {
    // Wait for the Preloader to finish (2.4 seconds matches the preloader logic)
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, timerAnimation);

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <Section
      fullWidth={true}
      // style={{
      //   background:
      //     "radial-gradient(circle at 50% 50%, rgba(81, 46, 9, 1) 0%, rgba(0, 0, 0, 1) 50%)",
      // }}
      className="overflow-hidden sm:pt-10 md:pt-30 lg:pt-40 relative min-h-screen"
    >
      <motion.div
        ref={sectionRef}
        style={{ opacity, scale }}
        className="relative"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(81, 46, 9, 1) 0%, rgba(0, 0, 0, 1) 50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        <GlowingOrb />
        <Particles />

        <div className="bg-black sm:bg-transparent container max-w-full text-white pt-40 sm:py-34 md:py-0 flex flex-col md:flex-row md:items-end gap:4 md:gap-10 xl:gap-4 relative z-10">
          {/* Left Content */}
          <div className="pl-10 sm:pl-10 md:pl-10 lg:pl-12 xl:pl-0 max-w-lg xl:max-w-md flex flex-col items-start gap-y-3 relative z-10 flex-1 xl:flex-0 ml-3 md:ml-8 lg:ml-16 xl:ml-30">
            <div className="flex flex-col items-start gap-y-0 pl-6 relative">
              {/* Animated vertical line */}
              <AnimatedLine
                direction="vertical"
                shouldAnimate={startAnimation}
                delay={0.3}
                className="absolute left-6 top-[68%] -translate-y-1/2 w-0.5 h-[70%] z-0"
              />

              {/* Subtitle with animation */}
              <motion.small
                className="text-lg border-l-2 border-orange-500 pl-2 relative"
                initial={{ opacity: 0 }}
                animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Animated horizontal line */}
                <motion.span
                  className="absolute -left-full top-[50%] -translate-y-1/2 w-full h-0.5 bg-theme z-0"
                  initial={{ x: "-100%" }}
                  animate={startAnimation ? { x: "0%" } : { x: "-100%" }}
                  transition={{ duration: 0.8, ease, delay: 0.5 }}
                />
                <span className="overflow-hidden inline-block">
                  <AnimatedLetters
                    text="Futura Identities"
                    delay={0.3}
                    stagger={0.04}
                    shouldAnimate={startAnimation}
                  />
                </span>
              </motion.small>

              {/* Main heading with staggered reveal */}
              <H1 className="overflow-hidden">
                <RevealText
                  shouldAnimate={startAnimation}
                  delay={0.4}
                  className="pl-2"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Building
                  </motion.span>
                </RevealText>

                <motion.span
                  className="bg-theme text-black px-2 inline-block overflow-hidden"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.6 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={
                      startAnimation
                        ? { x: 0, opacity: 1 }
                        : { x: "-100%", opacity: 0 }
                    }
                    transition={{ duration: 0.6, ease, delay: 0.9 }}
                  >
                    Experiences
                  </motion.span>
                </motion.span>

                <RevealText
                  shouldAnimate={startAnimation}
                  delay={0.8}
                  className="pl-2"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    Together.
                  </motion.span>
                </RevealText>
              </H1>

              {/* Paragraph with fade up */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, ease, delay: 1 }}
              >
                <Paragraph className="max-w-md pl-6 text-white">
                  We design, build, & protect your brand identity with precision
                  and consistency.
                </Paragraph>
              </motion.div>
            </div>

            {/* CTA Section */}
            <div className="min-h-56 flex items-center justify-center relative w-full">
              <div className="p-3 absolute -left-17 top-10">
                {/* Updated AnimatedCTA Usage */}
                <AnimatedCTA shouldAnimate={startAnimation} href="/about">
                  Explore More
                </AnimatedCTA>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <motion.div
            className="flex-1 max-h-[90vh] self-center xl:self-end flex items-end justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={
              startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1, ease, delay: 0.3 }}
            style={{ aspectRatio: "1260/896" }}
          >
            <VideoReveal shouldAnimate={startAnimation}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                {/* Video glow effect */}
                <motion.div className="absolute -inset-4 bg-theme/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <HLSVideoPlayer
                  src="/videos/hls/home-hero.m3u8"
                  poster="/images/home-hero_2_optimized.webp"
                  className="w-full h-auto relative z-10"
                />

                {/* Play indicator */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={startAnimation ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: 3 }}
                  >
                    <motion.div
                      className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"
                      initial={{ scale: 0 }}
                      animate={startAnimation ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1.8 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </VideoReveal>
          </motion.div>
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
            initial={{ scaleY: 0 }}
            animate={startAnimation ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"
            initial={{ scaleY: 0 }}
            animate={startAnimation ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>
      </motion.div>
    </Section>
  );
};

export default HeroSection;
