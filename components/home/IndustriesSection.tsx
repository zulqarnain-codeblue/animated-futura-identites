"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { H2, SubHeading } from "../ui/Typography";
// 1. Add 'Variants' to the import list
import { motion, useScroll, useTransform, Variants, useInView } from "framer-motion";

const industries = [
  { id: 1, name: "Healthcare", icon: "/icons/image_10_27x26_1.webp", color: "orange" },
  {
    id: 2,
    name: "Manufacturing Facilities",
    icon: "/icons/manufacturing_facilities.webp",
    color: "orange",
  },
  {
    id: 3,
    name: "Stadium and Casinos",
    icon: "/icons/image_9_27x26_1.webp",
    color: "orange",
  },
  {
    id: 4,
    name: "Corporate Identity",
    icon: "/icons/image_8_27x26_1.webp",
    color: "orange",
  },
  { id: 5, name: "Education", icon: "/icons/image_6_27x26_1.webp", color: "orange" },
  {
    id: 6,
    name: "QRS Solution",
    icon: "/icons/image_7_27x26_1.webp",
    color: "orange",
  },
];

// --- Animation Variants ---

// 2. Add the ': Variants' type annotation here
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// 3. Add the ': Variants' type annotation here
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
};

// 4. Add the ': Variants' type annotation here
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
        duration: 0.8, 
        // 5. Add 'as const' to fix strict array typing for ease curves
        ease: [0.22, 1, 0.36, 1] as const 
    },
  },
};

export default function IndustriesSection() {
  const sectionRef = useRef(null);

  // Parallax Effect Logic
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to vertical movement (Parallax)
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
    >
      {/* Animated Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: yBg,
          backgroundImage:
            "url('/images/57d39b3833772ab5377a7a1cbbb904758e469cea.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Main Content */}
      <div className="relative z-10 py-24 px-8">
        <div>
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={headerVariants}
          >
            <SubHeading className="mb-4 block">WHO WE SERVE</SubHeading>
            <H2 className="text-white block">Industries We've Worked With</H2>
          </motion.div>

          {/* Grid Section */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {industries.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Extracted Card Component
function IndustryCard({ industry }: { industry: (typeof industries)[0] }) {
  const isOrange = industry.color === "orange";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(35, 35, 35, 0.95)",
        borderColor: isOrange ? "rgb(249 115 22)" : "rgba(255, 255, 255, 0.4)",
        zIndex: 10,
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-8 sm:py-12 text-center cursor-pointer 
        bg-[#1a1a1ad3] backdrop-blur-sm transition-colors duration-300
        border-2 border-transparent
        group
      `}
    >
      {/* ICON */}
      <motion.div
        className="text-4xl mb-4 text-center"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={industry.icon}
          alt={industry.name}
          width={27}
          height={27}
          className="
            mx-auto 
            grayscale 
            group-hover:grayscale-0 
            transition-all 
            duration-300
          "
        />
      </motion.div>

      {/* TEXT */}
      <h3 className="font-semibold text-white/70 group-hover:text-white transition-colors">
        {industry.name}
      </h3>
    </motion.div>
  );
}
