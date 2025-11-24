"use client";
import React, { useState, useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

// Mock components
const Section = ({ children, className, fullWidth }: any) => (
  <section className={className}>{children}</section>
);

const H2 = ({ children }: any) => (
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
    {children}
  </h2>
);

const SubHeading = ({ children, className }: any) => (
  <p
    className={`text-sm md:text-base font-semibold text-gray-600 tracking-wider ${className}`}
  >
    {children}
  </p>
);

const ease = [0.76, 0, 0.24, 1] as const;

const testimonials = [
  {
    id: 1,
    image: "/images/Mask group 8.png",
    text: `"Futura Identities completely transformed our brand presence! Their attention 
    to detail and commitment to quality made all the difference. Futura Identities 
    completely transformed our brand presence! Their attention to detail and 
    commitment to quality made all the difference."`,
    author: "Michael Reynolds",
    role: "Regional Franchise Manager",
  },
  {
    id: 2,
    image: "/images/Mask group 8.png",
    text: `"Amazing service and high-quality product delivery. We trust them fully!"`,
    author: "Sarah Jennings",
    role: "Brand Director",
  },
  {
    id: 3,
    image: "/images/Mask group 8.png",
    text: `"The team at Futura Identities exceeded our expectations with their exceptional 
    service and attention to detail. They delivered a stunning result that exceeded our expectations."`,
    author: "Michael Reynolds",
    role: "Regional Franchise Manager",
  },

  {
    id: 4,
    image: "/images/Mask group 8.png",
    text: `"Wow! The team at Futura Identities delivered a stunning result that exceeded our expectations. 
    They exceeded our expectations with their exceptional service and attention to detail."`,
    author: "Michael Reynolds",
    role: "Regional Franchise Manager",
  },
];

// Magnetic button effect
const MagneticButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Text reveal animation
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

// Fade up animation
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

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  // Slide variants for testimonial content
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <Section
      className="w-full bg-[#F6EDE4] py-12 sm:py-18 xl:py-24 relative overflow-hidden"
      fullWidth={true}
    >
      {/* Background circles with parallax */}
      <motion.div
        className="absolute left-[75%] top-[45%] -translate-1/2 w-72 h-72 bg-[#F7E1CB] rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      <motion.div
        className="absolute left-0 bottom-10 w-40 h-40 bg-[#F7E1CB] rounded-full hidden sm:block"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <RevealText delay={0}>
          <SubHeading className="mb-3">TESTIMONIALS</SubHeading>
        </RevealText>
        <RevealText delay={0.1}>
          <H2>
            What Our Customers Say
            <br />
            About Us
          </H2>
        </RevealText>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 relative z-10 items-start">
        {/* Left Image */}
        <div className="relative max-w-lg lg:max-w-full md:translate-x-0 lg:translate-x-16 px-4 sm:px-0">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`image-${t.id}`}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
            >
              <motion.img
                src={t.image}
                alt="testimonial"
                width={739}
                height={617}
                className="w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Testimonial Card */}
        <div className="bg-white px-8 lg:px-10 py-9 lg:py-13 relative max-w-full -mt-20 lg:mt-0 mx-10 sm:mx-0 sm:ml-20 lg:ml-0 lg:max-w-md md:translate-x-0 lg:-translate-x-16 md:translate-y-0 lg:translate-y-20">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`testimonial-${t.id}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
            >
              {/* Stars */}
              <div className="flex gap-0 mb-4 text-theme-500 text-xl">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.1 + 0.3,
                        duration: 0.3,
                        ease: "backOut",
                      }}
                    >
                      <TiStarFullOutline size={22} />
                    </motion.span>
                  ))}
              </div>

              {/* Text */}
              <p className="text-gray-900 leading-relaxed mb-8 text-lg">
                {t.text}
              </p>

              {/* Author */}
              <div className="mt-6 border-t border-gray-200 pt-6 relative">
                <p className="text-theme-500 font-semibold text-lg">
                  {t.author}
                </p>
                <p className="text-gray-500 text-sm">{t.role}</p>

                {/* Quote Icon */}
                <motion.span
                  className="absolute bottom-6 translate-y-1/2 right-3 font-bold inline-block text-right"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <img
                    src="/icons/quotes.png"
                    alt="quotes"
                    width={91}
                    height={80}
                    className="w-[80%]"
                  />
                </motion.span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination + Arrows */}
      <FadeUp
        delay={0.4}
        className="flex items-center justify-center lg:justify-start gap-0 mt-12 relative z-10 max-w-6xl mx-auto sm:translate-x-16"
      >
        {/* Prev */}
        <MagneticButton
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center bg-theme-200 text-theme-700 rounded-full hover:bg-theme-300 transition cursor-pointer"
        >
          <IoChevronBack className="text-xl" />
        </MagneticButton>

        {/* Line + Page */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-20 h-[2px] bg-gray-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.span
            className="font-bold"
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-theme-600 text-xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-400">
              {" "}
              / {String(testimonials.length).padStart(2, "0")}
            </span>
          </motion.span>

          <motion.div
            className="w-20 h-[2px] bg-gray-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        {/* Next */}
        <MagneticButton
          onClick={next}
          className="w-10 h-10 flex items-center justify-center bg-theme-500 text-white rounded-full hover:bg-theme-600 transition cursor-pointer"
        >
          <IoChevronForward className="text-xl" />
        </MagneticButton>
      </FadeUp>
    </Section>
  );
}
