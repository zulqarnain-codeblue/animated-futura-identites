"use client";
import React, { useRef } from "react";
import { ServiceContent } from "@/types/service";
import { H2, H3, Paragraph } from "../ui/Typography";
import Image from "next/image";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Magnetic effect for interactive elements ---
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

// --- Text reveal animation (matching the reference component) ---
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

// --- Parallax Image Component ---
const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
}> = ({ src, alt, width, height }) => {
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
        className="w-full h-auto"
      />
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

// --- Animated Service Block ---
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

  const layoutClasses =
    layout === "left" ? "md:flex-row" : "md:flex-row-reverse";
  const isLeftLayout = layout === "left";

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

  // Tag animation with clip-path
  const tagVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3,
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
          {/* Image Column with Parallax and Image Reveal */}
          <motion.div
            className="w-full md:w-[55%] relative"
            variants={imageVariants}
          >
            {/* Vertical Tag Overlay (Mimics 'PROJECT MANAGEMENT' text) */}
            {tag && (
              <div
                className={`absolute top-0 h-full w-4 flex items-start justify-center ${
                  layout === "left"
                    ? "-left-5 lg:-left-10"
                    : "-right-5 lg:-right-10"
                } hiddden md:flex`}
              >
                <p
                  className="text-sm tracking-widest uppercase text-black transform  whitespace-nowrap flex justify-center items-center gap-2 [writing-mode:vertical-lr]"
                  style={{
                    transformOrigin: "0 0",
                    writingMode: "sideways-lr",
                  }} // Adjust transform origin for better rotation placement
                >
                  <span className="opacity-50"> {tag}</span>
                  <span className="bg-theme h-12 w-0.5 inline-block"></span>
                </p>
              </div>
            )}

            <div className="relative overflow-hidden">
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
                  />
                </motion.div>
              </ImageReveal>

              {/* Decorative accent bar */}
              <motion.div
                className={`absolute bottom-0 ${
                  isLeftLayout ? "-left-14" : "-right-14"
                } w-14 bg-theme`}
                initial={{ height: 0 }}
                animate={isInView ? { height: "6rem" } : { height: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            className="w-full md:w-[45%] flex flex-col-reverse sm:flex-row md:flex-col gap-6 sm:gap-8 justify-between"
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

            {/* Small Optional Image with Enhanced Effects */}
            {smallImageUrl && (
              <FadeUp delay={0.5} className="overflow-hidden">
                <ImageReveal
                  delay={0.4}
                  direction={isLeftLayout ? "right" : "left"}
                >
                  <motion.div
                    className="-mt-24 ml-10 sm:mt-0 sm:ml-0 w-1/2 max-w-[350px] relative overflow-hidden"
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

                    {/* Hover overlay accent */}
                    <motion.div
                      className="absolute inset-0 bg-black/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
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
const ServicesSection: React.FC = () => {
  const serviceBlocks: ServiceContent[] = [
    {
      id: 1,
      title: "Branding & Signage Solutions",
      subtitle: "Brand Rollouts",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams  rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernatur",
      mainImageUrl: "/images/Rounded Rectangle 1.webp",
      smallImageUrl: "/images/Rectangle 53.webp",
      layout: "left",
      tag: "Project Management",
    },
    {
      id: 2,
      title: "Design & Engineering",
      subtitle: "Project Management",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 52.webp",
      smallImageUrl: "/images/Rectangle 53.webp",
      layout: "right",
      tag: "Project Management",
    },
    {
      id: 3,
      title: "Design & Engineering",
      subtitle: "Design & Engineering",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 55.webp",
      smallImageUrl: "/images/Rectangle 57.webp",
      layout: "left",
      tag: "Design & Engineering",
    },
    {
      id: 4,
      title: "Design & Engineering",
      subtitle: "Permits And Quotes",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 63.webp",
      smallImageUrl: "/images/Rectangle 57.webp",
      layout: "right",
      tag: "Permits And Quotes",
    },
    {
      id: 5,
      title: "Design & Engineering",
      subtitle: "Our Technology",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 66.webp",
      smallImageUrl: "/images/Rectangle 65.webp",
      layout: "left",
      tag: "Our Technology",
    },
    {
      id: 6,
      title: "Design & Engineering",
      subtitle: "Fabrication",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 71.webp",
      smallImageUrl: "/images/Rectangle 69.webp",
      layout: "right",
      tag: "Fabrication",
    },
    {
      id: 7,
      title: "Design & Engineering",
      subtitle: "Installation",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 74.webp",
      smallImageUrl: "/images/Rectangle 73.webp",
      layout: "left",
      tag: "INSTALLATION",
    },
    {
      id: 8,
      title: "Design & Engineering",
      subtitle: "After-Sales Support",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 71.webp",
      smallImageUrl: "/images/Rectangle 69.webp",
      layout: "right",
      tag: "after sales support",
    },
  ];

  return (
    <section className="bg-white px-10">
      <div className="max-w-7xl mx-auto pt-26 sm:pt-40 pb-0">
        <RevealText>
          <H2 className="text-theme">Our Services</H2>
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

export default ServicesSection;
