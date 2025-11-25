"use client";

import React, { useRef, useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import Link from "next/link";
import CircleNotch from "../ui/CircleNotch";
import Image from "next/image";
import { H1, Paragraph } from "../ui/Typography";
import { BsArrowRight } from "react-icons/bs";
import { ProductContent } from "@/types/product";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Magnetic component for CTA ---
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

// --- Reveal Text Animation ---
const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  shouldAnimate: boolean;
}> = ({ children, delay = 0, shouldAnimate }) => {
  const ref = useRef(null);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={
          shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }
        }
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Animated Letters ---
const AnimatedLetters: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  shouldAnimate: boolean;
}> = ({ text, delay = 0, stagger = 0.03, shouldAnimate }) => {
  const letters = text.split("");

  return (
    <motion.span>
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

// --- Animated Line ---
const AnimatedLine: React.FC<{
  direction: "vertical" | "horizontal";
  delay?: number;
  shouldAnimate: boolean;
}> = ({ direction, delay = 0, shouldAnimate }) => (
  <motion.div
    className="bg-theme"
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
    style={{ originY: 0, originX: 0 }}
  />
);

// --- Animated CTA Button ---
const AnimatedCTA: React.FC<{
  href: string;
  label: string;
  shouldAnimate: boolean;
}> = ({ href, label, shouldAnimate }) => {
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
            {label}
          </motion.span>

          {/* Arrow */}
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

          {/* Circle Notch */}
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

// --- Image Reveal with Clip-path ---
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  shouldAnimate: boolean;
}> = ({ children, delay = 0, shouldAnimate }) => (
  <motion.div
    initial={{ clipPath: "inset(100% 0 0 0)" }}
    animate={
      shouldAnimate
        ? { clipPath: "inset(0% 0 0 0)" }
        : { clipPath: "inset(100% 0 0 0)" }
    }
    transition={{ duration: 1.4, ease, delay }}
    className="relative overflow-hidden"
  >
    <motion.div
      initial={{ scale: 1.1 }}
      animate={shouldAnimate ? { scale: 1 } : { scale: 1.1 }}
      transition={{ duration: 1.4, ease, delay }}
    >
      {children}
    </motion.div>

    {/* Overlay that fades out */}
    <motion.div
      className="absolute inset-0 bg-black z-10"
      initial={{ opacity: 1 }}
      animate={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, delay: delay + 1.2 }}
    />
  </motion.div>
);

// --- GlowingOrb Component ---
const GlowingOrb: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
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

// --- Particles Component ---
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

interface ProductHeroSectionProps {
  content: ProductContent;
}

export default function ProductHeroSection({
  content,
}: ProductHeroSectionProps) {
  const { subtitle } = content;
  const [word1, word2, ...rest] = subtitle.split(" ");

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // FIX 3: Animation State Control
  const [startAnimation, setStartAnimation] = useState(false);
  const [timerAnimation, setTimerAnimation] = useState(1000);

  useEffect(() => {
    // Wait for the Preloader to finish (2.4 seconds matches the preloader logic)
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, timerAnimation);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Section
      fullWidth={true}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(81, 46, 9, 1) 0%, rgba(0, 0, 0, 1) 50%)",
      }}
      className="overflow-hidden sm:pt-10 md:pt-30 relative min-h-screen"
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
                "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 50%)",
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
          <div className="pl-10 sm:pl-0 md:pl-10 lg:pl-12 xl:pl-0 max-w-lg xl:max-w-md flex flex-col items-start gap-y-3 relative z-10 flex-1 xl:flex-0 ml-3 md:ml-8 lg:ml-16 xl:ml-30">
            <div className="flex flex-col items-start gap-y-0 pl-6 relative">
              {/* Animated vertical line */}
              <AnimatedLine
                direction="vertical"
                shouldAnimate={startAnimation}
                delay={0.3}
              />

              {/* Subtitle with animation */}
              <motion.small
                className="text-lg border-l-2 border-orange-500 pl-2 relative before:absolute before:-left-full before:top-[50%] before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-theme before:z-0"
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
                <RevealText shouldAnimate={startAnimation} delay={0.4}>
                  <motion.span
                    className="pl-2 inline-block"
                    initial={{ opacity: 0 }}
                    animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {word1}
                  </motion.span>
                </RevealText>

                <motion.span
                  className="bg-theme text-white px-2 inline-block overflow-hidden"
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
                    {word2}
                  </motion.span>
                </motion.span>

                {rest.length > 0 && (
                  <RevealText shouldAnimate={startAnimation} delay={0.8}>
                    <motion.span
                      className="pl-2 inline-block"
                      initial={{ opacity: 0 }}
                      animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      {rest.join(" ")}
                    </motion.span>
                  </RevealText>
                )}
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
              <div className="p-3 absolute -left-14 top-10">
                <AnimatedCTA
                  shouldAnimate={startAnimation}
                  href="/about"
                  label="Explore More"
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <motion.div
            className="flex-1 max-h-[90vh] self-center xl:self-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={
              startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            <ImageReveal shouldAnimate={startAnimation} delay={0.5}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                {/* Image glow effect */}
                <motion.div className="absolute -inset-4 bg-theme/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src="/images/f61b0227453c53ed152b8c5d4c29998b8cfa4814.webp"
                  className="w-full relative z-10"
                  alt="Hero Image"
                  width={1260}
                  height={896}
                />
              </motion.div>
            </ImageReveal>
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
}
