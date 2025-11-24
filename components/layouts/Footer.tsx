"use client";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoMdArrowUp, IoMdSend } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-[1450px] mx-auto px-8 py-12 sm:py-16">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-gray-800">
          <div className="mb-8 md:mb-0">
            <div className="w-56">
              <div className="flex items-center gap-4">
                <div>
                  <Link href="/">
                    <Image
                      src="/logos/logo.svg"
                      alt="Futura Identities Logo"
                      width={150}
                      height={150}
                      priority
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-3 sm:gap-12">
            <a
              href="#"
              className="text-white hover:text-white transition-colors flex gap-1.5 sm:gap-3 uppercase"
            >
              <FaFacebookF size={20} />
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="text-white hover:text-white transition-colors flex gap-1.5 sm:gap-3 uppercase"
            >
              <FaLinkedinIn size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href="#"
              className="text-white hover:text-white transition-colors flex gap-1.5 sm:gap-3 uppercase"
            >
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Sitemap */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Sitemap
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-theme"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-theme"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Project Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Design & Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Engineering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Permits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Manufacturing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Installation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  After-Sales Support
                </a>
              </li>
            </ul>
          </div>

          {/* Products & Capabilities */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Products & Capabilities
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-theme"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Brand Rollouts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Exterior Signage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Interior Signage
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Architectural Elements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ADA Signs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Lighting Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Fleet Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wayfinding Signs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Large Format Printing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact US */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Contact US
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-theme"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdEmail className="text-white  mt-1 flex-shrink-0" size={20} />
                <a
                  href="mailto:sales@futurasigns.com"
                  className="hover:text-white transition-colors"
                >
                  sales@futurasigns.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdPhone className="text-white mt-1 flex-shrink-0" size={20} />
                <a
                  href="tel:+12345678910"
                  className="text-theme font-semibold text-2xl hover:text-theme-400 transition-colors"
                >
                  +12153333337
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdLocationOn
                  className="text-gray-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <span> 101 E. Luzerne St. Philadelphia, PA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col lg:flex-row sm:items-center justify-between gap-4 sm:gap-8">
            <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-semibold">
              Subscribe To Our Newsletter
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto max-w-2xl p-1 sm:p-2 bg-white"
            >
              <div className="relative flex-1 lg:min-w-[400px]">
                <MdEmail
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-white text-black pl-7.5 sm:pl-12 pr-4 py-3 sm:py-4 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-theme hover:bg-theme-600 text-white px-3 sm:px-8 py-3 sm:py-4 font-semibold transition-colors flex items-center gap-2"
              >
                SUBMIT
                <IoIosSend size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Futura Identities. All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-theme hover:bg-theme-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <IoMdArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
