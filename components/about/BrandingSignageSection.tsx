"use client";

import { useRef } from "react";
import { FiPlay } from "react-icons/fi";
import { H2, H3, Paragraph, SubHeading, SubParagraph } from "../ui/Typography";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// Magnetic effect for interactive elements
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

// Text reveal animation
const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.5, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Fade up animation
const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

// Image reveal with clip-path (Using whileInView for reliable state persistence)
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up";
}> = ({ children, delay = 0, direction = "up" }) => {
  const clipPaths = {
    left: {
      hidden: "inset(0px 100% 0px 0px)",
      visible: "inset(0px 0% 0px 0px)",
    },
    right: {
      hidden: "inset(0px 0px 0px 100%)",
      visible: "inset(0px 0% 0px 0px)",
    },
    up: { hidden: "inset(100% 0px 0px 0px)", visible: "inset(0% 0px 0px 0px)" },
  };

  return (
    <motion.div
      initial={{ clipPath: clipPaths[direction].hidden }}
      whileInView={{ clipPath: clipPaths[direction].visible }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Rotating text animation for "Who we are"
const RotatingText: React.FC<{
  text: string;
  delay?: number;
}> = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  return (
    <motion.p
      ref={ref}
      className="text-sm tracking-widest uppercase text-black transform -rotate-90 whitespace-nowrap flex justify-center items-center gap-2"
      style={{ transformOrigin: "0 0" }}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}
    >
      <motion.span
        className="opacity-50"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.12 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="bg-theme w-12 h-0.5 inline-block"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: delay + 0.24 }}
        style={{ originX: 0 }}
      />
    </motion.p>
  );
};

// Animated border line
const AnimatedBorder: React.FC<{
  delay?: number;
  className?: string;
}> = ({ delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleY: 0 }}
      animate={isInView ? { scaleY: 1 } : {}}
      transition={{ duration: 0.5, ease, delay }}
      style={{ originY: 0 }}
    />
  );
};

export default function BrandingSignageSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for images
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-8 px-6 md:px-12 lg:px-16 pt-26 sm:pt-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <RevealText>
            <SubHeading className="text-theme-500 font-semibold text-sm tracking-wide sm:mb-4">
              OUR STORY
            </SubHeading>
          </RevealText>
          <RevealText delay={0.06}>
            <H2 className="mb-0 md:mb-8">
              Innovators in
              <br />
              Branding & Signage
            </H2>
          </RevealText>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-16 items-start">
          {/* 🌟 Left Column - Re-added motion.div with simple Fade In to ensure trigger 🌟 */}
          <motion.div
            className="space-y-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            {/* Main Image */}
            <div className="relative">
              {/* The Vertical 'Who we are' Text Overlay (Hidden on mobile) */}
              <div className="absolute top-[158px] -left-8 h-full w-0 hidden md:flex items-start justify-start">
                <RotatingText text="Who we are" delay={0.3} />
              </div>

              <ImageReveal delay={0.2} direction="left">
                <motion.div
                  style={{ y: imageY }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/Rectangle 52.webp"
                    alt="Pop Bol signage installation"
                    className="w-full h-auto object-cover"
                    width={622}
                    height={697}
                  />
                </motion.div>
              </ImageReveal>

              {/* Decorative bar with animation (Hidden on mobile) */}
              <motion.div
                className="absolute -left-14 bottom-0 w-14 bg-theme-500 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: "10rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.36 }}
              />
            </div>
          </motion.div>

          {/* Right Column - Future of Branding */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
          >
            <div>
              <div className="max-w-md">
                <RevealText delay={0.18}>
                  <H3 className="font-bold mb-6 text-black 2xl:text-5xl">
                    Future of branding & Signage
                  </H3>
                </RevealText>

                {/* Description with left border */}
                <div className="border-l-2 border-theme pl-6 mb-8 relative">
                  {/* Animated border overlay */}
                  <AnimatedBorder
                    delay={0.24}
                    className="absolute left-0 top-0 w-0.5 bg-theme"
                  />

                  <FadeUp delay={0.3}>
                    <Paragraph className="leading-7 opacity-60">
                      At Futura Identities, our talent is our people. With a
                      team of 75 skilled professionals working from our 50,000
                      sq. ft. facility in Mount Holly, NJ, we bring creativity,
                      precision, and expertise to every project. Our continuous
                      investment in advanced manufacturing capabilities allows
                      us to explore new fabrication techniques and push the
                      boundaries of design.
                    </Paragraph>
                  </FadeUp>
                </div>
              </div>

              <div className="flex justify-between items-end gap-3">
                {/* Watch Button */}
                <FadeUp delay={0.36}>
                  <Magnetic strength={0.2}>
                    <motion.button
                      className="bg-theme hover:bg-theme-600 transition-colors text-white font-semibold py-4 px-5 flex flex-col items-start justify-center gap-3 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Watch Futura Identities"
                    >
                      {/* Hover overlay effect */}
                      <motion.div
                        className="absolute inset-0 bg-black/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.24, ease }}
                      />

                      {/* Play icon with animation */}
                      <motion.div
                        className="relative z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiPlay size={24} fill="currentColor" />
                      </motion.div>

                      <SubParagraph className="text-white font-light text-left text-nowrap relative z-10">
                        Watch
                        <br />
                        Futura Identities
                      </SubParagraph>

                      {/* Animated corner accent */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-2 h-2 bg-white/30"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.18 }}
                      />
                    </motion.button>
                  </Magnetic>
                </FadeUp>

                {/* Right Image (Rectangle 53.webp) */}
                <FadeUp delay={0.42} className="overflow-hidden w-1/2">
                  <ImageReveal delay={0.3} direction="right">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Image
                        src="/images/Rectangle 53.webp"
                        alt="Fabrication work"
                        className="w-full h-full object-cover"
                        width={332}
                        height={206}
                      />
                    </motion.div>
                  </ImageReveal>
                </FadeUp>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
