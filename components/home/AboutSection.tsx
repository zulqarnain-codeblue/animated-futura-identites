"use client";

import React, { useRef } from "react";
import Section from "@/components/ui/Section";
import NotchButton from "../ui/NotchButton";
import Image from "next/image";
import { H2, SubHeading, Paragraph } from "../ui/Typography";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// --- Magnetic Component (Unchanged) ---
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

  const reset = () => { x.set(0); y.set(0); };

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

// --- Text Reveal (Unchanged) ---
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

// --- Fade Up (Unchanged) ---
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

// --- FIXED IMAGE REVEAL COMPONENT ---
// 1. We separate the ref (trigger) from the motion.div (animation).
// 2. We reduced the margin requirement so it triggers easier.
const ImageReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right";
}> = ({ children, delay = 0, direction = "left" }) => {
  const triggerRef = useRef(null);
  // Removed negative margin. amount={0.1} means "trigger when 10% is visible"
  const isInView = useInView(triggerRef, { once: true, amount: 0.1 });

  return (
    <div ref={triggerRef} className="relative overflow-hidden w-full h-full block">
      <motion.div
        initial={{
          clipPath: direction === "left"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)"
        }}
        animate={isInView ? {
          clipPath: "inset(0% 0% 0% 0%)"
        } : {}}
        transition={{ duration: 1.2, ease, delay }}
        className="relative w-full h-full"
      >
        <motion.div
          initial={{ scale: 1.3 }} // Increased scale slightly for more drama
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{ duration: 1.4, ease, delay }}
          className="w-full h-full block"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <Section fullWidth={true}>
      <div
        ref={sectionRef}
        className="relative bg-[#F6EDE4] overflow-hidden pt-14 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28"
      >
        {/* Decorative Circle */}
        <motion.div
          className="absolute top-[73%] xl:top-1/5 left-1/2 xl:right-1/7 w-96 h-96 bg-[#F7E1CB] rounded-full -translate-x-1/2 xl:translate-x-1/4 -translate-y-1/2 xl:-translate-y-1/4 opacity-60"
          style={{ y: circleY, scale: circleScale }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />

        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row items-start lg:items-start gap-14 xl:gap-0">
            
            {/* --- LEFT IMAGE SECTION --- */}
            {/* Removed outer motion.div entirely to prevent conflict */}
            <div className="relative group flex flex-col max-w-[250px] sm:max-w-[400px] lg:max-w-[500px] lg:flex-[0_0_300px] xl:flex-[0_0_450px] 2xl:flex-[0_0_490px] order-2 xl:order-1">
              
              {/* Image Container */}
              <div className="w-full">
                <ImageReveal delay={0.2} direction="left">
                   {/* We wrap Image in a div to ensure it behaves block-level for the scale animation */}
                   <div className="relative w-full h-full">
                      <Image
                        src="/images/Mask group.png"
                        alt="Whitlock Mills Building Sign"
                        width={595} // Removed decimals, standard integers are safer
                        height={660}
                        className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-none object-center object-cover"
                        priority // Added priority to ensure it loads fast
                      />
                   </div>
                </ImageReveal>
              </div>

              {/* CTA Button */}
              <FadeUp delay={0.5} className="z-20 flex justify-end relative pointer-events-none">
                {/* Pointer events set to auto on the button wrapper itself */}
                <div className="pointer-events-auto">
                    <Magnetic strength={0.15}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <NotchButton
                        href="/about"
                        label="LEARN MORE ABOUT US"
                        className="bg-theme -right-1/4 sm:-right-1/6 xl:-right-1/3 xl:px-[43.5px] xl:py-[23.5px]"
                        circleClassName="w-[120px] lg:w-[170px] xl:w-[200px] h-[120px] lg:h-[170px] xl:h-[200px]"
                        />
                    </motion.div>
                    </Magnetic>
                </div>
              </FadeUp>
            </div>

            {/* --- RIGHT CONTENT SECTION --- */}
            <div className="pl-10 lg:pl-14 xl:pl-18 order-1 xl:order-2">
              <div className="space-y-2">
                <RevealText delay={0}>
                  <SubHeading>ABOUT FUTURA IDENTITIES</SubHeading>
                </RevealText>
                <RevealText delay={0.1}>
                  <H2>Innovators in Branding & Signage</H2>
                </RevealText>
                <FadeUp delay={0.3}>
                  <Paragraph className="max-w-[350px] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-lg 2xl:max-w-xl ml-auto pr-10 lg:pr-14 xl:pr-24 mt-6 lg:mt-6 xl:mt-10 2xl:mt-14 2xl:text-[22px]">
                    At Futura Identities, our talent is our people. With a team of
                    75 skilled professionals working from our 50,000 sq. ft.
                    facility in Mount Holly, NJ, we bring creativity, precision,
                    and expertise to every project. Our continuous investment in
                    advanced manufacturing capabilities allows us to explore new
                    fabrication techniques and push the boundaries of design.
                  </Paragraph>
                </FadeUp>
              </div>
            </div>

            {/* --- RIGHT IMAGE SECTION --- */}
            <div className="mt-5 md:mt-10 xl:mt-70 flex justify-end max-w-[220px] sm:max-w-[300px] lg:flex-[0_0_200px] xl:flex-[0_0_280px] 2xl:flex-[0_0_330px] order-3 self-end">
              <div className="relative w-full group">
                 <ImageReveal delay={0.3} direction="right">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/Mask group 1.png"
                            alt="Person working at Futura Identities"
                            className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-none object-center object-cover"
                            width={437}
                            height={618}
                        />
                    </div>
                 </ImageReveal>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;