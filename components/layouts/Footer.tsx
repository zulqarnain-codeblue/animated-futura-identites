"use client";
import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoMdArrowUp, IoIosSend } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Reusable Premium Hover Link — Same DNA as your Header MenuItem
const PremiumLink = ({
  href,
  children,
  index,
  className = "",
}: {
  href: string;
  children: string;
  index: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className={`group relative block py-1.5 ${className}`}>
        <motion.div
          className="flex items-center gap-4"
          animate={{ x: isHovered ? 16 : 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Text Layers */}
          <div className="relative overflow-hidden flex-1">
            {/* Base Text */}
            <motion.div
              className="text-gray-300 group-hover:text-white transition-colors"
              animate={{ y: isHovered ? "-100%" : 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              {children}
            </motion.div>

            {/* Theme Color Text */}
            <motion.div
              className="absolute inset-0 text-theme font-medium"
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? 0 : "100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              {children}
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
            }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="ml-auto"
          >
            <IoMdArrowUp size={20} className="text-theme rotate-45" />
          </motion.div>
        </motion.div>

        {/* Hover Theme Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-theme"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ originX: 0 }}
        />
      </Link>
    </motion.li>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.7, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sitemapLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Portfolio", href: "/products-capabilities" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Who We Are", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const servicesLinks = [
    "Project Management",
    "Design & Branding",
    "Engineering",
    "Permits",
    "Manufacturing",
    "Installation",
    "After-Sales Support",
  ].map((s) => ({ name: s, href: "/services" }));

  const productsLinks = [
    "QRS Solution",
    "Exterior Signage",
    "Interior Signage",
    "Architectural Elements",
    "ADA Solution",
    "Lighting Solutions",
    "Fleet Branding",
    "Wayfinding Signs",
    "Large Format Printing",
  ].map((p) => ({
    name: p,
    href: `/products-capabilities/${p
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-")}`,
  }));

  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-theme/5 via-transparent to-transparent opacity-50" />

      <div className="max-w-[1450px] mx-auto px-8 py-16 relative z-10">
        {/* Logo + Social */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-gray-800"
        >
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/logos/logo.svg"
                alt="Futura Identities"
                width={150}
                height={150}
                className="w-32 sm:w-[150px]"
                priority
              />
            </motion.div>
          </Link>

          <div className="flex gap-10 mt-8 md:mt-0">
            {[
              { Icon: FaFacebookF, label: "Facebook" },
              { Icon: FaLinkedinIn, label: "LinkedIn" },
              { Icon: FaInstagram, label: "Instagram" },
            ].map((s, i) => (
              <motion.a
                key={s.label}
                href="#"
                whileHover={{ scale: 1.2, y: -4 }}
                className="text-white uppercase text-sm tracking-wider flex items-center gap-2"
              >
                <s.Icon size={20} />
                <span className="hidden sm:block">{s.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Sitemap */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-8 relative inline-block">
              Sitemap
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-2 left-0 h-1 bg-theme"
              />
            </h3>
            <ul className="space-y-2">
              {sitemapLinks.map((link, i) => (
                <PremiumLink key={link.name} href={link.href} index={i}>
                  {link.name}
                </PremiumLink>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-8 relative inline-block">
              Our Services
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-theme"
              />
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((link, i) => (
                <PremiumLink key={link.name} href={link.href} index={i}>
                  {link.name}
                </PremiumLink>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-8 relative inline-block">
              Products & Capabilities
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-2 left-0 h-1 bg-theme"
              />
            </h3>
            <ul className="space-y-2">
              {productsLinks.map((link, i) => (
                <PremiumLink key={link.name} href={link.href} index={i}>
                  {link.name}
                </PremiumLink>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-8 relative inline-block">
              Contact US
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-2 left-0 h-1 bg-theme"
              />
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <MdEmail size={20} className="text-theme" />
                <a
                  href="mailto:sales@futurasigns.com"
                  className="hover:text-theme transition-colors"
                >
                  sales@futurasigns.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MdPhone size={20} className="text-theme" />
                <a
                  href="tel:+12153333337"
                  className="text-theme font-bold text-xl"
                >
                  +1 215 333 3337
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MdLocationOn size={20} className="text-gray-500 mt-1" />
                <span className="text-gray-400">
                  101 E. Luzerne St. Philadelphia, PA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <h3 className="text-white text-2xl md:text-3xl font-semibold">
              Subscribe To Our Newsletter
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto max-w-2xl p-1 sm:p-2 bg-white"
            >
              <div className="relative flex-1 lg:min-w-[400px]">
                <MdEmail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-14 pr-4 py-4 text-black focus:outline-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-theme px-10 py-4 text-white font-bold flex items-center gap-2 cursor-pointer"
              >
                Submit <IoIosSend size={22} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Futura Identities. All rights reserved</p>
          <div className="flex gap-6">
            <PremiumLink href="/privacy" index={0}>
              Privacy Policy
            </PremiumLink>
            <span className="text-gray-700">•</span>
            <PremiumLink href="/terms" index={1}>
              Terms & Conditions
            </PremiumLink>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        style={{ y, opacity }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-theme text-white p-4 rounded-full shadow-2xl z-50 backdrop-blur-md border border-white/20 cursor-pointer"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoMdArrowUp size={28} />
      </motion.button>
    </footer>
  );
};

export default Footer;
