"use client";
import { FaLinkedinIn } from "react-icons/fa6";
import React, { useRef } from "react";
import { TeamMember, teamMembers } from "./data/teamData";
import { H2, SubHeading } from "../ui/Typography";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Animated Heading with Letter-by-Letter Reveal ---
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

// --- Enhanced Team Card with Hover Effects ---
const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        ease,
        delay: index * 0.15 + 0.4, // Staggered entry
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.4, ease },
      }}
      className="flex-[1_1_200px] max-w-[250px] group"
    >
      <div className="flex flex-col items-center text-center">
        {/* Image Container */}
        <motion.div
          className="w-full aspect-square bg-gray-100 flex items-center justify-center mb-4 hover:rounded-2xl overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            className="w-1/2 h-1/2 text-gray-300 group-hover:text-gray-400 transition-colors duration-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM12 12A6 6 0 1012 0a6 6 0 000 12z" />
          </svg>
        </motion.div>

        {/* Name, Title, LinkedIn */}
        <div className="flex items-start justify-between w-full border-b border-gray-200 pb-6 pt-2">
          <div className="text-left">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.7, duration: 0.6 }}
              className="text-lg font-bold text-gray-800"
            >
              {member.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
              className="text-xs text-gray-600"
            >
              {member.title}
            </motion.p>
          </div>

          {/* LinkedIn Icon with Pulse */}
          <motion.span
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-400 p-2 rounded-full cursor-pointer group-hover:bg-linkedin-blue transition-colors duration-300"
          >
            <FaLinkedinIn size={16} className="text-white" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Team Section with Parallax Scroll Effect ---
const TeamSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax background movement
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.9]
  );

  const headingInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 sm:py-20 md:py-24 overflow-hidden relative"
    >
      {/* Optional subtle background decoration */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-300 to-red-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-full blur-3xl" />
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-4xl mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <SubHeading className="mb-2 text-gray-600">Our Team</SubHeading>
          </motion.div>

          <RevealText delay={0.1}>
            <H2>It’s a Team Effort!</H2>
          </RevealText>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-6 gap-y-16">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TeamSection;
