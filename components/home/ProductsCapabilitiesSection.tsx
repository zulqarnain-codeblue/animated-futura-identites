"use client";
import React, { useState, useEffect, useRef } from "react";
import Section from "../ui/Section";
import { H2, SubHeading } from "../ui/Typography";
import Link from "next/link";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  motion,
  useAnimation,
  useMotionValue,
  AnimatePresence,
  useInView,
  Variants, // <--- 1. Import this
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "QRS Solution",
    slug: "qrs-solution",
    image:
      "/images/f61b0227453c53ed152b8c5d4c29998b8cfa4814_cropped_1_550x461_1.webp",
  },
  {
    id: 2,
    title: "Exterior Signage",
    slug: "exterior-signage",
    image:
      "/images/009a76d8bad95e47486d52bbe7075d26a1ef30ac_cropped_1_550x461_1.webp",
  },
  {
    id: 3,
    title: "Interior Signage",
    slug: "interior-signage",
    image:
      "/images/c6af0879ac84303217f05403e5fe09d06520440b_cropped_1_550x461_1.webp",
  },
  {
    id: 4,
    title: "Architectural Elements",
    slug: "architectural-elements",
    image: "/images/Rectangle 17.webp",
  },
  {
    id: 5,
    title: "ADA Solution",
    slug: "ada-solution",
    image: "/images/Rectangle 23.webp",
  },
  {
    id: 6,
    title: "Lighting Solutions",
    slug: "lighting-solutions",
    image: "/images/Rectangle 27.webp",
  },
  {
    id: 7,
    title: "Wayfinding Signs",
    slug: "wayfinding-signs",
    image: "/images/Rectangle 35.webp",
  },
];

// --- Animation Variants ---

// 2. Add ': Variants' type annotation to all your variant objects

const revealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: ease }, // Use the const 'ease'
  },
};

const cardVariants: Variants = {
  hover: { scale: 0.98, transition: { duration: 0.24 } },
};

const imageVariants: Variants = {
  rest: { scale: 1.05 },
  hover: { scale: 1.15, transition: { duration: 0.36, ease: "easeOut" } },
};

const arrowVariants: Variants = {
  rest: { rotate: 0, scale: 1, backgroundColor: "#ffffff", color: "#f97316" },
  hover: {
    rotate: 45,
    scale: 1.1,
    backgroundColor: "#f97316",
    color: "#ffffff",
                        transition: { duration: 0.18 },
  },
};
// Text reveal animation
const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const variants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.5, ease, delay },
    },
  };

  return (
    <motion.div
      className="overflow-hidden"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // triggers only once
    >
      {children}
    </motion.div>
  );
};
export default function ProductsCapabilitiesSection() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Calculate drag constraints and widths
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      );
    }
  }, []);

  // Handle slide logic
  // We determine the width of a card + gap (approx based on your CSS)
  // Responsive widths: 270px (mobile), 400px (sm), 550px (xl) + 16px gap
  const getCardWidth = () => {
    if (typeof window === "undefined") return 550;
    if (window.innerWidth >= 1280) return 550 + 16;
    if (window.innerWidth >= 640) return 400 + 16;
    return 270 + 16;
  };

  const nextSlide = () => {
    if (index < products.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      // Optional: Loop back to start
      setIndex(0);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else {
      // Optional: Loop to end
      setIndex(products.length - 1);
    }
  };

  // Sync animation with state
  useEffect(() => {
    const cardWidth = getCardWidth();
    controls.start({
      x: -index * cardWidth,
      transition: { type: "spring", stiffness: 150, damping: 20, mass: 1 },
    });
  }, [index, controls]);

  return (
    <Section className="bg-white overflow-hidden" fullWidth={true}>
      <div className="max-w-[1000px] xl:max-w-[1400px] bg-white ml-auto py-10 sm:py-20 pl-8">
        {/* Header with Text Reveal */}
        <div className="mb-12 overflow-hidden">
          <RevealText>
            <SubHeading className="sm:mb-3">
              TRANSFORMING YOUR BRAND IDENTITY
            </SubHeading>
          </RevealText>

          <RevealText delay={0.1}>
            <H2 className="text-black">Products & Capabilities</H2>
          </RevealText>
        </div>

        {/* Carousel Track */}
        <motion.div
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={carouselRef}
            className="flex gap-4"
            animate={controls}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            // Update index based on drag end position
            onDragEnd={(event, info) => {
              const offset = info.offset.x;
              const threshold = 50;
              if (offset < -threshold) nextSlide();
              else if (offset > threshold) prevSlide();
            }}
          >
            {products.map((item) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden group h-full flex-[0_0_270px] sm:flex-[0_0_400px] xl:flex-[0_0_550px]"
                initial="rest"
                whileHover="hover"
                variants={cardVariants}
              >
                {/* Image Wrapper for scaling */}
                <div className="w-full h-full overflow-hidden max-w-[550] max-h-[461]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    width={550}
                    height={461}
                    variants={imageVariants}
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end px-4 sm:px-6 py-6">
                  <div className="flex justify-between items-end w-full">
                    <motion.h3
                      className="text-white sm:text-xl xl:text-[25px] font-light z-10"
                      transition={{ duration: 0.18 }}
                    >
                      {item.title}
                    </motion.h3>

                    <Link
                      href={`/products-capabilities/${item.slug}`}
                      className="relative z-20"
                      aria-label="Link to Product Page"
                    >
                      <motion.div
                        className="w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full shadow-lg"
                        variants={arrowVariants}
                      >
                        <MdOutlineArrowOutward className="text-xl" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-0 mt-12 relative z-10 sm:max-w-xl lg:max-w-4xl pr-6 sm:pr-0">
          {/* Prev Button */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center bg-theme-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
            aria-label="Previous Slide Button"
          >
            <IoMdArrowBack className="text-xl" />
          </motion.button>

          {/* Pagination Line */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-full h-0.5 bg-theme-500 bg-gray-200 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gray-200"
                // Calculate width percentage: (current index + 1) / total items
                initial={{ width: "0%" }}
                animate={{ width: `${((index + 1) / products.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            <span className="font-bold whitespace-nowrap min-w-[60px] text-right">
              <span className="text-theme-600 text-xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-gray-400 text-sm">
                {" "}
                / {String(products.length).padStart(2, "0")}
              </span>
            </span>

            <div className="w-full h-0.5 bg-gray-200 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-theme-500"
                // Calculate width percentage: (current index + 1) / total items
                initial={{ width: "0%" }}
                animate={{ width: `${((index + 1) / products.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center bg-theme-500 text-white rounded-full hover:bg-theme-600 transition cursor-pointer shadow-lg shadow-theme-500/30"
            aria-label="Next Slide Button"
          >
            <IoMdArrowForward className="text-xl" />
          </motion.button>
        </div>
      </div>
    </Section>
  );
}
