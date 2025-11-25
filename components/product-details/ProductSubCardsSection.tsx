"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import Section from "../ui/Section";
import { H2, SubHeading } from "../ui/Typography";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProductContent } from "@/types/product"; // Assuming type file exists
import {
  motion,
  useAnimation,
  useMotionValue,
  AnimatePresence,
  useInView,
  Variants, // <--- 1. Import this
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

const cardVariants: Variants = {
  hover: { scale: 0.98, transition: { duration: 0.4 } },
};

const imageVariants: Variants = {
  rest: { scale: 1.05 },
  hover: { scale: 1.15, transition: { duration: 0.6, ease: "easeOut" } },
};

const arrowVariants: Variants = {
  rest: { rotate: 0, scale: 1, backgroundColor: "#ffffff", color: "#f97316" },
  hover: {
    rotate: 45,
    scale: 1.1,
    backgroundColor: "#f97316",
    color: "#ffffff",
    transition: { duration: 0.3 },
  },
};

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

interface ProductHeroSectionProps {
  content: ProductContent;
}

export default function ProductSubCardsSection({
  content,
}: ProductHeroSectionProps) {
  const { subtitle, products } = content;

  if (!products) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-semibold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <Section className="bg-white" fullWidth={true}>
      <div className="max-w-[1000px] xl:max-w-[1400px] bg-white mx-auto py-10 sm:py-20 px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <RevealText>
            <H2 className="text-black 2xl:text-[50px]">Our Products</H2>
          </RevealText>
          <RevealText delay={0.1}>
            <SubHeading className="sm:mt-3">{subtitle}</SubHeading>
          </RevealText>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
          {products.map((item, i) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden group h-full flex-[0_0_270px] sm:flex-[0_0_400px] xl:flex-[0_0_550px]"
              initial="rest"
              whileHover="hover"
              variants={cardVariants}
            >
              {/* Image Wrapper for scaling */}
              <div className="w-full h-full overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  width={624}
                  height={523}
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
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>

                  <Link href="#" aria-label="Link"className="relative z-20">
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
        </div>
      </div>
    </Section>
  );
}
