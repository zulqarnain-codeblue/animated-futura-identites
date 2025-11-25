"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import NotchButton from "../ui/NotchButton";
import Section from "../ui/Section";
import { H2, H3, Paragraph, SubHeading, SubParagraph } from "../ui/Typography";
import {
  motion,
  AnimatePresence,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

const services = [
  {
    id: 1,
    title: "Project Management",
    description:
      "Maintain nationwide consistency through a frictionless experience with transparent communication.",
    image: "images/Mask group 2.webp",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 2,
    title: "Design & Branding",
    description:
      "Create compelling visual identities that resonate with your audience and elevate your brand presence.",
    image: "https://placehold.co/625x734?text=Design+%26+Branding",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 3,
    title: "Engineering",
    description:
      "Expert technical solutions ensuring durability and performance of all signage installations.",
    image: "https://placehold.co/625x734?text=Engineering",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 4,
    title: "Permits",
    description:
      "Navigate regulatory requirements seamlessly with our comprehensive permit management services.",
    image: "https://placehold.co/625x734?text=Permits",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 5,
    title: "Manufacturing",
    description:
      "State-of-the-art production facilities delivering high-quality signage solutions with precision.",
    image: "https://placehold.co/625x734?text=Manufacturing",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 6,
    title: "Installation",
    description:
      "Professional installation services ensuring your signage is positioned perfectly and securely.",
    image: "https://placehold.co/625x734?text=Installation",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
];

// Magnetic effect for buttons
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

export default function ComprehensiveBrandingSection() {
  const [activeService, setActiveService] = useState(0);
  const [mobileStartIndex, setMobileStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const current = services[activeService];

  const visibleServices = 3;
  const canScrollLeft = mobileStartIndex > 0;
  const canScrollRight = mobileStartIndex < services.length - visibleServices;

  const handleServiceChange = (index: number) => {
    setDirection(index > activeService ? 1 : -1);
    setActiveService(index);
  };

  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setMobileStartIndex(mobileStartIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (canScrollRight) {
      setMobileStartIndex(mobileStartIndex + 1);
    }
  };

  const visibleServicesOnMobile = services.slice(
    mobileStartIndex,
    mobileStartIndex + visibleServices
  );

  // Image animation variants
  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.1,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.95,
      x: dir > 0 ? -30 : 30,
    }),
  };

  // Content animation variants
  const contentVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 20 : -20,
    }),
    center: {
      opacity: 1,
      y: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -20 : 20,
    }),
  };

  return (
    <Section fullWidth={true}>
      <div ref={sectionRef} className="bg-white py-12 md:py-20 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-16 max-w-sm sm:max-w-xl lg:max-w-3xl xl:max-w-5xl mx-auto space-y-4">
          <RevealText>
            <SubHeading>OUR SERVICES</SubHeading>
          </RevealText>
          <RevealText delay={0.1}>
            <H2>Comprehensive Branding & Signage Solutions</H2>
          </RevealText>
          
          {/* Animated underline */}
          {/* <motion.div
            className="w-20 h-1 bg-theme mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            style={{ originX: 0.5 }}
          /> */}
        </div>

        <div className="md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Services List */}
            <div className="space-y-6 md:space-y-0 relative px-0 md:px-0">
              {/* Mobile/Tablet Navigation (< md) */}
              <div className="md:hidden">
                <div className={`flex items-start gap-0 ${!canScrollLeft ? "pl-3" : ""}`}>
                  {/* Left Arrow */}
                  {canScrollLeft && (
                    <Magnetic strength={0.4}>
                      <motion.button
                        onClick={handleScrollLeft}
                        disabled={!canScrollLeft}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          canScrollLeft
                            ? "border-theme-500 text-theme-500 hover:bg-theme-50"
                            : "border-gray-300 text-gray-300 cursor-not-allowed"
                        }`}
                        aria-label="Previous services"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <LuChevronLeft className="w-5 h-5" />
                      </motion.button>
                    </Magnetic>
                  )}
                  {/* Services Container */}
                  <div className="flex-1 relative">
                    <div className="flex items-start gap-0">
                      {visibleServicesOnMobile.map((service, visibleIndex) => {
                        const actualIndex = mobileStartIndex + visibleIndex;
                        return (
                          <motion.div
                            key={service.id}
                            className="flex-1 min-w-0 relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: visibleIndex * 0.1 }}
                          >
                            <button
                              onClick={() => handleServiceChange(actualIndex)}
                              className="w-full text-left transition-all duration-300 cursor-pointer relative"
                            >
                              {/* Connecting Line */}
                              <div
                                className="absolute w-full h-px top-4 left-0 z-0 transition-colors duration-300"
                                style={{
                                  backgroundColor:
                                    actualIndex === activeService ||
                                    actualIndex + 1 === activeService
                                      ? "#F97316"
                                      : "#99a1af",
                                }}
                              />

                              {/* Content Container */}
                              <div className="flex flex-col items-start gap-2 relative z-10">
                                {/* Number Circle */}
                                <motion.div
                                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all border relative ${
                                    activeService === actualIndex
                                      ? "bg-theme-500 text-white border-theme-500"
                                      : "bg-white border-gray-400 text-gray-400"
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {activeService === actualIndex && (
                                    <motion.div
                                      className="absolute inset-0 rounded-full bg-theme-500"
                                      initial={{ scale: 1 }}
                                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                  <span className="relative z-10">{service.id}</span>
                                </motion.div>

                                {/* Service Title - Fixed height container */}
                                <div className="w-full min-h-[2.5rem] flex items-start justify-start">
                                  <H3
                                    className={`text-sm transition-colors leading-tight px-1 ${
                                      activeService === actualIndex
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {service.title}
                                  </H3>
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <Magnetic strength={0.4}>
                    <motion.button
                      onClick={handleScrollRight}
                      disabled={!canScrollRight}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        canScrollRight
                          ? "border-theme-500 text-theme-500 hover:bg-theme-50"
                          : "border-gray-300 text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Next services"
                      whileHover={canScrollRight ? { scale: 1.1 } : {}}
                      whileTap={canScrollRight ? { scale: 0.95 } : {}}
                    >
                      <LuChevronRight className="w-5 h-5" />
                    </motion.button>
                  </Magnetic>
                </div>
              </div>

              {/* Desktop Navigation (>= md) */}
              <div className="hidden md:block relative">
                {services.map((service, index) => (
                  <motion.button
                    key={service.id}
                    onClick={() => handleServiceChange(index)}
                    className={`w-full text-left rounded-lg transition-all duration-300 cursor-pointer relative`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    {/* Vertical Line (Timeline Element) */}
                    {index < services.length - 1 && (
                      <div
                        className={`absolute z-0 w-px h-full transition-colors duration-300 left-4 top-8`}
                        style={{
                          backgroundColor:
                            index === activeService ? "#F97316" : "#99a1af",
                        }}
                      />
                    )}

                    {/* Content Container */}
                    <div className="flex items-start gap-4 pb-11 relative z-10">
                      {/* Number Circle */}
                      <motion.div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all border relative ${
                          activeService === index
                            ? "bg-theme-500 text-white border-theme-500"
                            : "bg-white border-gray-400 text-gray-400"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeService === index && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-theme-500"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <span className="relative z-10">{service.id}</span>
                      </motion.div>

                      {/* Service Content */}
                      <div className="w-full">
                        <H3
                          className={`transition-colors leading-7 ${
                            activeService === index
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {service.title}
                        </H3>
                        <AnimatePresence mode="wait">
                          {activeService === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease }}
                            >
                              <SubParagraph className="mt-2 opacity-70">
                                {service.description}
                              </SubParagraph>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="block md:hidden max-w-[280px] sm:max-w-[300px] ml-auto sm:translate-y-12">
                {/* Service Content */}
                <AnimatePresence mode="wait" custom={direction}>
                  {services.map((service, index) => (
                    activeService === index && (
                      <motion.div
                        key={service.id}
                        className="w-full"
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease }}
                      >
                        <H3
                          className={`text-[22px] font-medium transition-colors leading-5 ${
                            activeService === index
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {service.title}
                        </H3>

                        <SubParagraph className="mt-2 opacity-70">
                          {service.description}
                        </SubParagraph>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>

              {/* Contact Button */}
              <FadeUp delay={0.4} className="md:pt-6 md:pl-4 flex flex-col-reverse md:flex-col max-w-[200px] sm:max-w-[300px] md:max-w-md relative">
                <Magnetic strength={0.15}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NotchButton
                      href="/contact"
                      label="Explore More"
                      className="self-end bg-theme px-5 2xl:text-[20px] ml-auto max-w-fit"
                      circleClassName="w-[120px] lg:w-[120px] xl:w-[130px] h-[120px] lg:h-[120px] xl:h-[130px]"
                    />
                  </motion.div>
                </Magnetic>
                <motion.div
                  className="max-w-[150px] sm:max-w-[230px] md:max-w-full relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/Mask group 3.webp"
                    width={360}
                    height={265}
                    alt=""
                  />
                </motion.div>
                <motion.div
                  className="w-40 aspect-square bg-[#FFF1E3] rounded-full absolute -bottom-1/7 -left-1/9 hidden sm:block"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease, delay: 0.6 }}
                />
              </FadeUp>
            </div>

            {/* Right Side - Image and Details */}
            <FadeUp delay={0.2}>
              <div className="flex flex-col md:gap-8 max-w-xs lg:max-w-full ml-auto">
                <div className="max-w-[200px] ml-auto sm:ml-0 sm:max-w-full relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                      key={activeService}
                      src={current?.image}
                      alt={current?.title}
                      className="w-full sm:h-full object-cover"
                      width={625}
                      height={734}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="ml-auto mr-16 mt-10 md:mt-14 relative max-w-xs">
                  <div className="absolute -top-1/6 right-0 -translate-y-full flex flex-col items-center">
                    <motion.div
                      className="w-5 aspect-square bg-theme rounded-full relative"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute w-15 h-15 bg-theme/20 rounded-full"
                        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    <motion.div
                      className="w-0.5 bg-theme"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: "9rem" } : { height: 0 }}
                      transition={{ duration: 0.8, ease, delay: 0.4 }}
                    />
                  </div>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeService}
                      className="text-right gap-4"
                      custom={direction}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease }}
                    >
                      <div>
                        <Paragraph className="font-bold text-gray-900 text-lg">
                          {current.subtitle}
                        </Paragraph>
                        <SubParagraph className="opacity-70 leading-relaxed">
                          {current.subtitleDesc}
                        </SubParagraph>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </Section>
  );
}