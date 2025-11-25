"use client";
import React, { useRef } from "react";
import { ServiceContent } from "@/types/service";
import { H2, H3, Paragraph, SubHeading } from "../ui/Typography";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Text reveal animation ---
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

// --- Fade up animation ---
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

// --- Image reveal with clip-path ---
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up";
}> = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      ref={ref}
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

// --- Animated border line ---
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
      transition={{ duration: 0.8, ease, delay }}
      style={{ originY: 0 }}
    />
  );
};

// --- Parallax Image Component ---
const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}> = ({ src, alt, width, height, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div ref={ref} style={{ y }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </motion.div>
  );
};

// --- Component to render the individual service section ---
interface ServiceBlockProps {
  content: ServiceContent;
  index: number;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({ content, index }) => {
  const {
    title,
    subtitle,
    description,
    mainImageUrl,
    smallImageUrl,
    layout,
    tag,
  } = content;

  const isLeftLayout = layout === "left";
  const layoutClasses = isLeftLayout ? "md:flex-row" : "md:flex-row-reverse";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Container animation with stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Image column animation
  const imageVariants = {
    hidden: { opacity: 0, x: isLeftLayout ? -80 : 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease,
      },
    },
  };

  // Text content animation
  const textVariants = {
    hidden: { opacity: 0, x: isLeftLayout ? 80 : -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease,
      },
    },
  };

  return (
    <div className="bg-white py-6 md:py-12">
      <div className="max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className={`flex flex-col gap-6 md:gap-10 lg:gap-14 xl:gap-20 ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 1. Image Column with Clip-path Reveal */}
          <motion.div
            className="w-full md:w-[55%] relative"
            variants={imageVariants}
          >
            <div className="relative overflow-hidden rounded-lg">
              {/* Main Image with Clip-path Reveal */}
              <ImageReveal
                delay={0.2}
                direction={isLeftLayout ? "left" : "right"}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ParallaxImage
                    src={mainImageUrl}
                    alt={title}
                    width={658}
                    height={500}
                    className="w-full h-auto"
                  />
                </motion.div>
              </ImageReveal>

              {/* Animated Vertical Tag Overlay */}
              {tag && (
                <motion.div
                  className={`absolute top-0 h-full w-4 flex items-start justify-center ${
                    isLeftLayout
                      ? "-left-5 lg:-left-10"
                      : "-right-5 lg:-right-10"
                  } hidden md:flex`}
                  initial={{ opacity: 0, x: isLeftLayout ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, ease, delay: 0.4 }}
                >
                  <p
                    className="text-sm tracking-widest uppercase text-black transform whitespace-nowrap flex justify-center items-center gap-2 [writing-mode:sideways-lr]"
                    style={{ transformOrigin: "0 0" }}
                  >
                    <motion.span
                      className="opacity-50"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 0.5 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {tag}
                    </motion.span>
                    <motion.span
                      className="bg-theme h-12 w-0.5 inline-block"
                      // 1. Define originY directly in the initial state
                      initial={{
                        scaleY: 0,
                        originY: 0, // <-- MOVED HERE: Sets the transform origin to the top (0)
                      }}
                      // 2. Define originY directly in the animate state
                      animate={
                        isInView
                          ? {
                              scaleY: 1,
                              originY: 0, // <-- MOVED HERE: Ensures the origin remains the same during animation
                            }
                          : {}
                      }
                      // 3. Keep only transition timing properties here
                      transition={{
                        duration: 0.8,
                        ease,
                        delay: 0.6,
                        // originY is REMOVED from here
                      }}
                    />
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 2. Text Content Column */}
          <motion.div
            className="w-full md:w-[45%] flex flex-col-reverse sm:flex-row md:flex-col gap-6 sm:gap-8 justify-between self-center"
            variants={textVariants}
          >
            <div>
              <RevealText delay={0.2}>
                <H2 className="mb-6">{subtitle}</H2>
              </RevealText>

              {/* Description Block with Animated Border */}
              <FadeUp delay={0.3}>
                <div className="flex border-l-4 border-theme pl-6 mb-8 max-w-lg relative">
                  {/* Animated border overlay */}
                  <AnimatedBorder
                    delay={0.4}
                    className="absolute left-0 top-0 w-0.5 bg-theme"
                  />

                  <Paragraph className="leading-relaxed opacity-60">
                    {description}
                  </Paragraph>
                </div>
              </FadeUp>
            </div>

            {/* Small Optional Image with Clip-path Reveal */}
            {smallImageUrl && (
              <FadeUp delay={0.5} className="overflow-hidden">
                <ImageReveal
                  delay={0.4}
                  direction={isLeftLayout ? "right" : "left"}
                >
                  <motion.div
                    className="-mt-24 ml-10 sm:mt-0 sm:ml-0 w-1/2 max-w-[350px] relative overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={smallImageUrl}
                      alt={`Detail for ${subtitle}`}
                      className="w-full h-auto"
                      width={332}
                      height={206}
                    />
                  </motion.div>
                </ImageReveal>
              </FadeUp>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Parent Component ---
const WhatWeDoSection: React.FC = () => {
  const serviceBlocks: ServiceContent[] = [
    {
      id: 1,
      title: "Branding & Signage Solutions",
      subtitle: "We Build Relationships",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams  rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernatur",
      mainImageUrl: "/images/Rectangle 76.webp",
      smallImageUrl: "",
      layout: "left",
      tag: "",
    },
    {
      id: 2,
      title: "Design & Engineering",
      subtitle: "We Build Identities",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 77.webp",
      smallImageUrl: "",
      layout: "right",
      tag: "",
    },
    {
      id: 3,
      title: "Design & Engineering",
      subtitle: "Concept To Execution",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 79.webp",
      smallImageUrl: "",
      layout: "left",
      tag: "",
    },
  ];

  return (
    <section className="bg-white px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto pt-26 sm:pt-40 pb-0">
        <RevealText>
          <SubHeading className="sm:mb-3">What we do</SubHeading>
        </RevealText>
        <RevealText delay={0.1}>
          <H2>End-to-End Branding & Signage Solutions for Your Business</H2>
        </RevealText>
      </div>
      <div className="mb-10">
        {serviceBlocks.map((block, index) => (
          <ServiceBlock key={block.id} content={block} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
