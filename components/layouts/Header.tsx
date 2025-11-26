"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import { CgMenuRightAlt } from "react-icons/cg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products & Capabilities", href: "/products-capabilities" },
  { name: "What We Do", href: "/what-we-do" },
] as const;

const CONTACT_INFO = {
  phone: "+12153333337",
  email: "sales@futurasigns.com",
} as const;

// Smooth easing
const ease = [0.76, 0, 0.24, 1] as const;

// --- UTILITY HOOK FOR MOBILE DETECTION ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
// --- END UTILITY HOOK ---

// Cursor follower for menu - **Heavy animation, conditionally disabled on mobile**
const Cursor: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 60);
      cursorY.set(e.clientY - 60);
    };
    if (isVisible) window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed w-[120px] h-[120px] rounded-full pointer-events-none z-[60] mix-blend-difference flex items-center justify-center will-change-transform" // Added will-change-transform
      style={{ x, y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-black text-sm font-medium">View</span>
      </motion.div>
    </motion.div>
  );
};

// Magnetic wrapper
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
      className="will-change-transform" // Added will-change-transform
    >
      {children}
    </motion.div>
  );
};

// Split text animation component - **Optimized for mobile**
const SplitText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}> = ({ text, className, delay = 0, stagger = 0.02 }) => {
  const isMobile = useIsMobile(); // Check for mobile

  // OPTIMIZATION: Return regular text on mobile to avoid animating hundreds of elements
  if (isMobile) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              initial={{ y: "100%", rotate: 10 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: "-100%", rotate: -10 }}
              transition={{
                duration: 0.6,
                ease,
                delay: delay + (wi * word.length + ci) * stagger,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// Reveal mask animation
const RevealMask: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down";
}> = ({ children, delay = 0, direction = "up" }) => (
  <div className="overflow-hiddend">
    <motion.div
      initial={{ y: direction === "up" ? "100%" : "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: direction === "up" ? "-100%" : "100%" }}
      transition={{ duration: 0.8, ease, delay }}
      className="will-change-transform" // Added will-change-transform
    >
      {children}
    </motion.div>
  </div>
);

// Menu item with character animation
const MenuItem: React.FC<{
  item: (typeof MENU_ITEMS)[number];
  index: number;
  onClose: () => void;
  setHoveredItem: (index: number | null) => void;
  hoveredItem: number | null;
}> = ({ item, index, onClose, setHoveredItem, hoveredItem }) => {
  const isHovered = hoveredItem === index;
  const isOtherHovered = hoveredItem !== null && hoveredItem !== index;

  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      onMouseEnter={() => setHoveredItem(index)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Link
        href={item.href}
        onClick={onClose}
        className="group relative block py-2"
        aria-label="Menu Item"
      >
        <motion.div
          className="flex items-center gap-4 will-change-transform" // Added will-change-transform
          animate={{ x: isHovered ? 20 : 0, opacity: isOtherHovered ? 0.3 : 1 }}
          transition={{ duration: 0.4, ease }}
        >
          {/* Index */}
          <motion.span
            className="text-sm font-mono text-theme w-8"
            animate={{ opacity: isHovered ? 1 : 0.4 }}
          >
            0{index + 1}
          </motion.span>

          {/* Text container */}
          <div className="relative overflow-hidden">
            {/* Main text */}
            <motion.div
              className="text-md sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] will-change-transform" // Added will-change-transform
              animate={{ y: isHovered ? "-100%" : 0 }}
              transition={{ duration: 0.4, ease }}
            >
              {item.name}
            </motion.div>

            {/* Hover text */}
            <motion.div
              className="absolute inset-0 text-md sm:text-4xl md:text-6xl lg:text-7xl font-bold text-theme tracking-[-0.02em] will-change-transform" // Added will-change-transform
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? 0 : "100%" }}
              transition={{ duration: 0.4, ease }}
            >
              {item.name}
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            className="ml-auto will-change-transform" // Added will-change-transform
            initial={{ opacity: 0, x: -20, rotate: -45 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
              rotate: isHovered ? 0 : -45,
            }}
            transition={{ duration: 0.3, ease }}
          >
            <FiArrowUpRight className="text-theme text-3xl" />
          </motion.div>
        </motion.div>

        {/* Underline */}
        <motion.div
          className="absolute bottom-0 left-12 right-0 h-[1px] bg-white/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.5 + index * 0.1 }}
          style={{ originX: 0 }}
        />

        {/* Hover line */}
        <motion.div
          className="absolute bottom-0 left-12 right-0 h-[2px] bg-theme"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
          style={{ originX: 0 }}
        />
      </Link>
    </motion.li>
  );
};

// Animated background shapes - **Optimized for mobile**
const BackgroundShapes: React.FC = () => {
  const isMobile = useIsMobile(1024);
  const slowDown = isMobile ? 2 : 1; // Double the rotation/scale time on mobile

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl will-change-transform" // Added will-change-transform
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 30 * slowDown, repeat: Infinity, ease: "linear" },
          scale: { duration: 8 * slowDown, repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-600/10 to-transparent blur-3xl will-change-transform" // Added will-change-transform
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{
          rotate: { duration: 25 * slowDown, repeat: Infinity, ease: "linear" },
          scale: { duration: 6 * slowDown, repeat: Infinity },
        }}
      />

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Define social links with real gradient hover backgrounds
const SOCIAL_LINKS = [
  {
    key: "facebook",
    icon: <FaFacebookF size={18} />,
    href: "https://facebook.com",
    gradient: "hover:bg-[#1877F2] shadow-[#1877F2]", // Solid Facebook blue
    label: "Facebook",
  },
  {
    key: "linkedin",
    icon: <FaLinkedinIn size={18} />,
    href: "https://linkedin.com",
    gradient: "hover:bg-[#0A66C2] shadow-[#0A66C2]", // Solid LinkedIn blue
    label: "LinkedIn",
  },
  {
    key: "instagram",
    icon: <FaInstagram size={20} />,
    href: "https://instagram.com",
    gradient:
      "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:bg-clip-padding hover:shadow-[#c13584]",
    label: "Instagram",
  },
] as const;

// Updated Contact Section with Gradient Hover Backgrounds
const ContactSection: React.FC = () => (
  <motion.div
    className="sm:absolute bottom-12 left-0 right-0 px-8 lg:px-16"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.6, ease }}
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col md:flex-row gap-5 sm:gap-8 md:gap-16">
        <RevealMask delay={1.1}>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">
              Phone
            </p>
            <Link
              href={`tel:${CONTACT_INFO.phone}`}
              className="text-white text-md sm:text-xl font-semibold hover:text-theme transition-colors"
            >
              {CONTACT_INFO.phone}
            </Link>
          </div>
        </RevealMask>
        <RevealMask delay={1.2}>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-2">
              Email
            </p>
            <Link
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-white text-md sm:text-xl font-semibold hover:text-theme transition-colors"
            >
              {CONTACT_INFO.email}
            </Link>
          </div>
        </RevealMask>
      </div>

      {/* SOCIAL ICONS WITH GRADIENT HOVER BACKGROUND */}
      <RevealMask delay={1.3}>
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social, i) => (
            <Magnetic key={social.key} strength={0.5}>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
                className={`
                  relative w-12 h-12 rounded-full border-2 border-white/20 
                  flex items-center justify-center text-white/70
                  overflow-hidden transition-all duration-500
                  group backdrop-blur-sm
                  ${social.gradient}
                  hover:border-transparent hover:shadow-2xl
                `}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
              >
                {/* Icon with white → colored text on hover */}
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  {social.icon}
                </span>

                {/* Optional: subtle inner glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background:
                      social.key === "instagram"
                        ? "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.8), transparent 50%)"
                        : "radial-gradient(circle, rgba(255,255,255,0.6), transparent 60%)",
                  }}
                />
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </RevealMask>
    </div>
  </motion.div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const pathname = usePathname();
  const isMobile = useIsMobile(); // Use the mobile hook

  const { isHome, isProductDetail, showWhiteLogo } = useMemo(() => {
    const isHome = pathname === "/";
    const isProductDetail =
      pathname.startsWith("/products-capabilities/") &&
      pathname !== "/products-capabilities";
    return {
      isHome,
      isProductDetail,
      showWhiteLogo: (isHome || isProductDetail) && !isScrolled,
    };
  }, [pathname, isScrolled]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Only disable scroll on desktop if menu is open. On mobile, it's often needed.
    // However, keeping it simple:
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const textColor =
    isHome && !isScrolled
      ? "text-white"
      : !isProductDetail
      ? "text-black"
      : "text-white";

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 py-1 transition-colors duration-500 z-70 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1450px] mx-auto px-6 py-1 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Home">
              <Magnetic strength={0.2}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={
                      showWhiteLogo
                        ? "/logos/logo.svg"
                        : "/logos/black-logo.webp"
                    }
                    alt="Logo"
                    width={150}
                    height={150}
                    className="w-26 sm:w-[150px]"
                    priority
                  />
                </motion.div>
              </Magnetic>
            </Link>

            {/* Menu Button */}
            <Magnetic strength={0.3}>
              <motion.button
                onClick={toggleMenu}
                className={`flex items-center gap-3 pl-5 py-2 pr-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  isMenuOpen
                    ? "bg-theme text-black"
                    : `hover:bg-white/10 ${textColor}`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <motion.span
                  className="font-semibold text-sm tracking-wide"
                  animate={{ opacity: 1 }}
                >
                  {isMenuOpen ? "Close" : "Menu"}
                </motion.span>

                <motion.div
                  className={`p-2.5 rounded-full ${
                    isMenuOpen ? "bg-black" : "bg-theme"
                  }`}
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isMenuOpen ? (
                        <FiX size={18} className="text-theme" />
                      ) : (
                        <CgMenuRightAlt size={18} className="text-black" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* CONDITIONAL CURSOR RENDER FOR PERFORMANCE */}
            {!isMobile && <Cursor isVisible={hoveredItem !== null} />}

            {/* Background layers */}
            <motion.div
              className="fixed inset-0 z-40 bg-black will-change-transform" // Added will-change-transform
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 0.8, ease }}
            />

            {/* Content */}
            <motion.div
              className="fixed inset-0 z-50 flex flex-col overflow-hidden justify-end sm:block gap-14 pb-10 sm:pb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <BackgroundShapes />

              {/* Navigation */}
              <div className="sm:h-full sm:flex items-center px-6 sm:px-8 lg:px-16 sm:pt-20 sm:pb-32">
                <nav className="w-full max-w-5xl" aria-label="Main navigation">
                  <ul className="space-y-2">
                    {MENU_ITEMS.map((item, index) => (
                      <MenuItem
                        key={item.name}
                        item={item}
                        index={index}
                        onClose={closeMenu}
                        setHoveredItem={setHoveredItem}
                        hoveredItem={hoveredItem}
                      />
                    ))}
                  </ul>
                </nav>
              </div>

              <ContactSection />

              {/* Decorative lines */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-theme to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease, delay: 0.2 }}
                style={{ originX: 0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-theme to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease, delay: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
