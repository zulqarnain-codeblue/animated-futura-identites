"use client";
import React, { useRef } from "react";
import { ProductContent } from "@/types/product";
import { H2, H3, Paragraph, SubHeading } from "../ui/Typography";
import productList from "@/data/products";
import Image from "next/image";
import NotchButton from "../ui/NotchButton";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
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
  const isInView = useInView(ref, { once: true, margin: "50px" });

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
  const isInView = useInView(ref, { once: true, margin: "100px" });

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

// --- Animated border line ---
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

// --- Component to render the individual product section ---
interface ProductBlockProps {
  content: ProductContent;
  index: number;
}

const ProductBlock: React.FC<ProductBlockProps> = ({ content, index }) => {
  const {
    id,
    title,
    subtitle,
    slug,
    description,
    mainImageUrl,
    smallImageUrl,
    layout,
    tag,
  } = content;

  const isLeftLayout = layout === "left";
  const layoutClasses = isLeftLayout ? "md:flex-row" : "md:flex-row-reverse";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

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
    <div className="bg-white py-6 md:py-14">
      <div className="max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className={`flex flex-col gap-6 md:gap-10 lg:gap-14 xl:gap-20 ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 1. Image Column */}
          <motion.div
            className="w-full md:w-[55%] relative"
            variants={imageVariants}
          >
            <div className="relative z-10">
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
                    className="w-full h-auto aspect-square object-cover object-center"
                  />
                </motion.div>
              </ImageReveal>

              {/* Animated Horizontal Tag */}
              {tag && (
                <motion.div
                  className={`h-full flex items-start mt-3 ${
                    layout === "left" ? "justify-start" : "justify-end"
                  } hidden md:flex`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.8, ease, delay: 0.4 }}
                >
                  <p
                    className={`text-sm tracking-widest uppercase text-black transform whitespace-nowrap flex justify-center items-center gap-2 ${
                      layout === "left" ? "flex-row-reverse" : "flex-row"
                    }`}
                    style={{ transformOrigin: "0 0" }}
                  >
                    <motion.span
                      className="bg-theme h-0.5 w-20 inline-block"
                      // 1. Define originX directly in the states (initial/animate)
                      initial={{
                        scaleX: 0,
                        originX: layout === "left" ? 0 : 1, // <-- MOVED HERE
                      }}
                      // 2. Define originX directly in the states (initial/animate)
                      animate={
                        isInView
                          ? {
                              scaleX: 1,
                              originX: layout === "left" ? 0 : 1, // <-- MOVED HERE
                            }
                          : {
                              scaleX: 0,
                              originX: layout === "left" ? 0 : 1, // <-- MOVED HERE (Ensures consistency)
                            }
                      }
                      // 3. Keep only transition timing properties here
                      transition={{
                        duration: 0.8,
                        ease,
                        delay: 0.5,
                        // originX is REMOVED from here
                      }}
                    />
                    <motion.span
                      className="opacity-50"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {tag}
                    </motion.span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Dots Mesh pattern with fade animation */}
            {id !== 1 && (
              <motion.div
                className={`max-w-[250px] xl:max-w-sm absolute -top-20 xl:-top-30 ${
                  layout === "left"
                    ? "-left-20 xl:-left-40"
                    : "-right-20 xl:-right-40"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.8, ease, delay: 0.3 }}
              >
                <Image
                  src="/images/d56eac3a7219904deaaff9bd7cad01e6c0d7e110.webp"
                  width={484}
                  height={484}
                  alt="dots mesh"
                />
              </motion.div>
            )}
          </motion.div>

          {/* 2. Text Content Column */}
          <motion.div
            className="w-full md:w-[45%] flex flex-col sm:flex-row md:flex-col gap-6 sm:gap-8 justify-between"
            variants={textVariants}
          >
            <div>
              <RevealText delay={0.2}>
                <H2 className="mb-6">{subtitle}</H2>
              </RevealText>

              {/* Description Block with Animated Border */}
              <FadeUp delay={0.3}>
                <div className="flex border-l-4 border-theme pl-6 mb-8 max-w-md relative">
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

            {/* Small Image and Button Section */}
            <FadeUp delay={0.5} className="relative z-10">
              <div
                className={`flex items-start justify-between gap-2 sm:gap-0 relative z-10
                ${
                  layout !== "left"
                    ? "sm:flex-col md:flex-row-reverse"
                    : "sm:flex-col md:flex-row"
                }
                `}
              >
                {/* Small Optional Image */}
                {smallImageUrl && (
                  <motion.div
                    className={`sm:mt-0 sm:ml-0 w-1/2 sm:w-full w-max-w-[250px] lg:w-1/2 xl:w-max-w-[350px] relative z-10 sm:top-0 md:top-10 lg:top-10 z-0
                    ${
                      layout === "left"
                        ? "md:-left-24 lg:-left-40"
                        : "md:-right-24 lg:-right-40"
                    }`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : { opacity: 0, scale: 0.8, rotate: -5 }
                    }
                    transition={{
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.4,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <ImageReveal
                      delay={0.35}
                      direction={isLeftLayout ? "right" : "left"}
                    >
                      <Image
                        src={smallImageUrl}
                        alt={`Detail for ${subtitle}`}
                        className="w-full h-auto sm:min-w-[110px] lg:w-full"
                        width={332}
                        height={206}
                      />
                    </ImageReveal>
                  </motion.div>
                )}

                {/* Magnetic Button */}
                <div
                  className={`relative z-10 ${
                    layout === "left"
                      ? "-translate-x-8 sm:-translate-x-4 md:-translate-x-10"
                      : "-translate-x-8 sm:-translate-x-4 md:translate-x-0"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.8, ease, delay: 0.6 }}
                  >
                    <Magnetic strength={0.25}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <NotchButton
                          href={`/products-capabilities/${slug}`}
                          label="Explore More!"
                          className="px-4 sm:px-6 py-3 sm:py-4 bg-theme text-nowrap w-fit"
                          textSize="text-[14px] md:text-[16px] xl:text-[19px]"
                          showCircle={true}
                          circleClassName="w-[110px] lg:w-[120px] xl:w-[130px] h-[110px] lg:h-[120px] xl:h-[130px]"
                        />
                      </motion.div>
                    </Magnetic>
                  </motion.div>
                </div>
              </div>
            </FadeUp>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Parent Component ---
const ProductsCapabilitiesSection: React.FC = () => {
  const ProductBlocks = [...productList];

  return (
    <section className="bg-white px-8 sm:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto pt-26 sm:pt-40 pb-0">
        <RevealText>
          <SubHeading className="sm:mb-3">
            Transforming Your Brand Identity
          </SubHeading>
        </RevealText>
        <RevealText delay={0.1}>
          <H2>Products & Capabilities</H2>
        </RevealText>
      </div>
      <div className="mb-10">
        {ProductBlocks.map((block, index) => (
          <ProductBlock key={block.id} content={block} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductsCapabilitiesSection;
