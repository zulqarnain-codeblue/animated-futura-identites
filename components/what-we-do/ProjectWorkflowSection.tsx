"use client"
import React, { useRef } from "react";
import { H2, SubHeading } from "../ui/Typography";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  stagger,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Text reveal animation ---
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

// --- Fade up animation ---
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

// --- Image reveal with clip-path ---
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}> = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  const clipPaths = {
    left: { hidden: "inset(0px 100% 0px 0px)", visible: "inset(0px 0% 0px 0px)" },
    right: {
      hidden: "inset(0px 0px 0px 100%)",
      visible: "inset(0px 0% 0px 0px)",
    },
    up: { hidden: "inset(100% 0px 0px 0px)", visible: "inset(0% 0px 0px 0px)" },
    down: { hidden: "inset(0px 0px 100% 0px)", visible: "inset(0% 0px 0px 0px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
      transition={{ duration: 0.7, ease, delay }}
    >
      <motion.div
        initial={{ scale: 1.1, rotate: 0 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 1.1, rotate: 0 }}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- Parallax Image Component ---
const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  objectCover?: boolean;
}> = ({ src, alt, objectCover = true }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className={objectCover ? "object-cover" : "object-contain"}
      />
    </motion.div>
  );
};

// --- Grid Item Component ---
interface GridItemProps {
  src: string;
  alt: string;
  index: number;
  direction?: "left" | "right" | "up" | "down";
}

const GridItem: React.FC<GridItemProps> = ({
  src,
  alt,
  index,
  direction = "up",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  return (
    <FadeUp delay={index * 0.06} className="relative h-64 w-full overflow-hidden group">
    <ImageReveal delay={index * 0.05} direction={direction}>
        <motion.div
          ref={ref}
          className="relative w-full h-64"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
        >
          <ParallaxImage src={src} alt={alt} />

          {/* Hover overlay effect */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
          />
        </motion.div>
      </ImageReveal>
    </FadeUp>
  );
};

function ProjectWorkflowSection() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  // Grid items with their properties
  const gridItems = [
    {
      src: "/images/Rectangle 76.webp",
      alt: "Red Shirt Staff",
      span: "col-span-1",
      direction: "up" as const,
    },
    {
      src: "/images/952979167243b22cd2d6da01fa097bbcbd6af7e7.webp",
      alt: "Red Letter Sign",
      span: "col-span-1 md:col-span-2",
      direction: "left" as const,
    },
    {
      src: "/images/Rectangle 3.webp",
      alt: "Workshop Team",
      span: "col-span-1",
      direction: "right" as const,
    },
    {
      src: "/images/Rectangle 5.webp",
      alt: "Mysie Sign",
      span: "col-span-1",
      direction: "left" as const,
    },
    {
      src: "/images/Mask group 3.webp",
      alt: "Barbershop Sign",
      span: "col-span-1",
      direction: "up" as const,
    },
    {
      src: "/images/8d5f49a047f48f48b696f2ddbbe57f94b05ffe36.webp",
      alt: "PGW Sign",
      span: "col-span-1 md:col-span-2",
      direction: "right" as const,
    },
  ];

  return (
    <section className="bg-white px-10 py-12 overflow-hidden">
      {/* --- Main Section Header with Text Reveal --- */}
      <div className="max-w-6xl mx-auto pt-0 pb-0 text-center">
        <RevealText>
          <SubHeading className="sm:mb-3">Project Workflow</SubHeading>
        </RevealText>
        <RevealText delay={0.06}>
          <H2>Project Workflow Visual</H2>
        </RevealText>
      </div>

      {/* --- Animated Grid Layout --- */}
      <motion.div
        ref={containerRef}
        className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-1.5 max-w-6xl mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={isContainerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Row 1 */}
        <div className={gridItems[0].span}>
          <GridItem
            src={gridItems[0].src}
            alt={gridItems[0].alt}
            index={0}
            direction={gridItems[0].direction}
          />
        </div>

        <div className={gridItems[1].span}>
          <GridItem
            src={gridItems[1].src}
            alt={gridItems[1].alt}
            index={1}
            direction={gridItems[1].direction}
          />
        </div>

        <div className={gridItems[2].span}>
          <GridItem
            src={gridItems[2].src}
            alt={gridItems[2].alt}
            index={2}
            direction={gridItems[2].direction}
          />
        </div>

        {/* Row 2 */}
        <div className={gridItems[3].span}>
          <GridItem
            src={gridItems[3].src}
            alt={gridItems[3].alt}
            index={3}
            direction={gridItems[3].direction}
          />
        </div>

        <div className={gridItems[4].span}>
          <GridItem
            src={gridItems[4].src}
            alt={gridItems[4].alt}
            index={4}
            direction={gridItems[4].direction}
          />
        </div>

        <div className={gridItems[5].span}>
          <GridItem
            src={gridItems[5].src}
            alt={gridItems[5].alt}
            index={5}
            direction={gridItems[5].direction}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectWorkflowSection;