"use client";

import React, { useRef } from "react";
import { FaRegHandshake, FaTools } from "react-icons/fa";
import { H2, Paragraph } from "../ui/Typography"; // Ensure these paths are correct
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

interface PhilosophyPoint {
  icon: React.ElementType;
  title: string;
  content: string;
}

const philosophyPoints: PhilosophyPoint[] = [
  {
    icon: FaTools,
    title: "Fabrication & Integrity",
    content:
      "By integrating cutting-edge fabrication techniques with a deep understanding of design integrity, we ensure that every element we create meets the highest industry standards.",
  },
  {
    icon: FaRegHandshake,
    title: "Collaboration & Satisfaction",
    content:
      "Our focus on collaboration, transparency, & customer satisfaction drives us to exceed expectations, turning visionary concepts into reality. Whether it's a small scale project or a nationwide rollout, we prioritize quality, efficiency, and lasting impact.",
  },
];

// --- Animation Components ---

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

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

// Image reveal with clip-path
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}> = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  // Adjusted margin to ensure it triggers sooner on smaller screens
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const clipPaths = {
    // Hidden: Clip from the right edge inward
    left: { 
      hidden: "inset(0% 100% 0% 0%)", 
      visible: "inset(0% 0% 0% 0%)" 
    },
    // Hidden: Clip from the left edge inward
    right: { 
      hidden: "inset(0% 0% 0% 100%)", 
      visible: "inset(0% 0% 0% 0%)" 
    },
    // Hidden: Clip from the top edge downward (Reveals bottom-up)
    up: { 
      hidden: "inset(100% 0% 0% 0%)", 
      visible: "inset(0% 0% 0% 0%)" 
    },
    // Hidden: Clip from the bottom edge upward (Reveals top-down)
    down: {
      hidden: "inset(0% 0% 100% 0%)",
      visible: "inset(0% 0% 0% 0%)"
    }
  };

  return (
    <motion.div
      ref={ref}
      // We set the initial manually to ensure server-side rendering matches
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
      transition={{ duration: 1.2, ease, delay }}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.4, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RotatingText: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.p
      ref={ref}
      className="text-sm tracking-widest uppercase text-white transform -rotate-90 whitespace-nowrap flex justify-center items-center gap-2"
      style={{ transformOrigin: "0 0" }}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
    >
      <motion.span
        className="opacity-50"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="bg-theme w-12 h-0.5 inline-block"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: delay + 0.4 }}
        style={{ originX: 0 }}
      />
    </motion.p>
  );
};

const AnimatedBorder: React.FC<{
  delay?: number;
  className?: string;
}> = ({ delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleY: 0 }}
      animate={isInView ? { scaleY: 1 } : {}}
      transition={{ duration: 1, ease, delay }}
      style={{ originY: 0 }}
    />
  );
};

const StaggerParagraph: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <Paragraph ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.4, ease, delay: delay + i * 0.02 }}
        >
          {word}
        </motion.span>
      ))}
    </Paragraph>
  );
};

// --- Main Component ---

const PhilosophySection: React.FC = () => {
  const mainImage = "/images/Mask group 9.webp";
  const smallImage = "/images/Mask group 10.webp";
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for main image
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      // FIX: Removed 'overflow-hidden' from here so the absolute image can hang out
      className="bg-black py-12 sm:py-20 md:py-24 text-white relative"
    >
      {/* FIX: Added a wrapper with overflow-hidden specifically for background elements 
        (Grid and Particles) so they don't break page width, but content stays visible.
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="philosophyGrid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <motion.path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#philosophyGrid)" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-theme/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center px-8 mb-16 relative z-10">
        <RevealText>
          <H2 className="mb-4 text-white">Our Philosophy</H2>
        </RevealText>
        <FadeUp delay={0.2}>
          <Paragraph className="text-white leading-relaxed">
            At Futura Identities, our mission is to deliver high-quality
            architectural elements while providing an exceptional client
            experience. We are committed to precision, innovation, and
            excellence in every project we undertake.
          </Paragraph>
        </FadeUp>

        {/* Animated underline */}
        <motion.div
          className="w-24 h-1 bg-theme mx-auto mt-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        />
      </div>

      {/* Main Content & Layout */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
          {/* Left Content Column (Text) */}
          <motion.div
            className="lg:w-1/2 space-y-8 border-l-2 border-theme pl-5 relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Animated border overlay */}
            <AnimatedBorder
              delay={0.3}
              className="absolute left-0 top-0 w-0.5 bg-theme h-full"
            />

            {philosophyPoints.map((point, index) => (
              <FadeUp key={index} delay={0.4 + index * 0.2}>
                <StaggerParagraph
                  text={point.content}
                  className="leading-relaxed text-white opacity-70 font-light"
                  delay={0.5 + index * 0.2}
                />
              </FadeUp>
            ))}

            {/* Decorative line connector */}
            <motion.div
              className="absolute -right-12 top-1/2 w-12 h-px bg-theme/30 hidden lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.8 }}
              style={{ originX: 0 }}
            />
          </motion.div>

          {/* Right Content Column (Image Container) */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] w-full">
              <ImageReveal delay={0.4} direction="right">
                <motion.div
                  style={{ y: imageY }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Image
                    src={mainImage}
                    alt="Installation of a Walgreens store sign on a sunny day."
                    className="w-full h-full object-cover shadow-2xl"
                    width={572}
                    height={428}
                  />

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute -inset-4 bg-theme/0 group-hover:bg-theme/10 blur-2xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </ImageReveal>

              {/* The Vertical 'OUR PHILOSOPHY' Text Overlay */}
              <div className="absolute top-[190px] -right-4 h-full w-0 hidden md:flex items-start justify-start">
                <RotatingText text="Our Philosophy" delay={0.6} />
              </div>

              {/* Corner decorations */}
              <motion.div
                className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-theme/60"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-theme/60"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Small Bottom-Left Feature Image */}
          <motion.div
            className="absolute -bottom-1/2 -left-1/5 max-w-[180px] hidden lg:block"
            // Ensure z-index is high enough if sections overlap, though z-10 on parent usually handles it
            style={{ zIndex: 20 }} 
            initial={{ opacity: 0, y: 40, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.5 }}
          >
            <ImageReveal delay={0.7} direction="up">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={smallImage}
                  alt="Close-up of a circular TGI Fridays sign at night."
                  className="w-full h-full object-cover object-center shadow-2xl"
                  width={313}
                  height={248}
                />

                {/* Border accent */}
                <motion.div
                  className="absolute inset-0 border-2 border-theme/30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </ImageReveal>
          </motion.div>
        </div>
      </div>

      {/* Decorative accent elements */}
      <motion.div
        className="absolute top-1/4 right-16 w-3 h-3 bg-theme rounded-full hidden xl:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-20 w-2 h-2 bg-theme/50 rounded-full hidden xl:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default PhilosophySection;