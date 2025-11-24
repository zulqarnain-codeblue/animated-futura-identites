"use client";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import Section from "../ui/Section";

const services = [
  {
    id: 1,
    title: "Project Management",
    description:
      "Maintain nationwide consistency through a frictionless experience with transparent communication.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 2,
    title: "Design & Branding",
    description:
      "Create compelling visual identities that resonate with your audience and elevate your brand presence.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 3,
    title: "Engineering",
    description:
      "Expert technical solutions ensuring durability and performance of all signage installations.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 4,
    title: "Permits",
    description:
      "Navigate regulatory requirements seamlessly with our comprehensive permit management services.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 5,
    title: "Manufacturing",
    description:
      "State-of-the-art production facilities delivering high-quality signage solutions with precision.",
    image:
      "https://images.unsplash.com/photo-1578575437980-63e430f3e7de?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
  {
    id: 6,
    title: "Installation",
    description:
      "Professional installation services ensuring your signage is positioned perfectly and securely.",
    image:
      "https://images.unsplash.com/photo-1586163381514-47a8cd960e5b?w=500&h=500&fit=crop",
    subtitle: "9 Years Partnerships",
    subtitleDesc:
      "It is a long established fact that a reader will be distracted by the readable.",
  },
];

const industries = [
  { id: 1, name: "Healthcare", icon: "⊕", color: "gray" },
  { id: 2, name: "Manufacturing Facilities", icon: "⊟", color: "orange" },
  { id: 3, name: "Custom Iconic Signage", icon: "⚐", color: "gray" },
  { id: 4, name: "Real Estate Developers", icon: "🏢", color: "gray" },
  { id: 5, name: "Corporate Identity", icon: "⚙", color: "gray" },
  { id: 6, name: "Education", icon: "🏛", color: "blue" },
  { id: 7, name: "Restaurants", icon: "🍴", color: "blue" },
  { id: 8, name: "Franchising", icon: "⊙", color: "blue" },
];

const OutlineFilledCircle = ({ className }: { className?: string }) => (
  <span
    className={`bg-theme-500 ring-4 ring-theme/20 w-2 h-2 aspect-square inline-block rounded-full ${className}`}
  ></span>
);

export default function TextMarqueeSection() {
  return (
    <Section fullWidth={true} className="bg-white">
      {/* Scrolling Banner */}
      <div className="border-t border-gray-300 overflow-hidden py-3">
        <div className="animate-scroll whitespace-nowrap">
          <span className="inline-block text-gray-400 font-semibold mr-8 text-2xl">
            Now Offering Lease Financing!{" "}
            <OutlineFilledCircle className="mx-4 -translate-y-1" /> Branding Made Easy!{" "}
            <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Branding Made
            Easy! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing!
          </span>
          <span className="inline-block text-gray-400 font-semibold mr-8 text-2xl">
            Now Offering Lease Financing!{" "}
            <OutlineFilledCircle className="mx-4 -translate-y-1" /> Branding Made Easy!{" "}
            <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Branding Made
            Easy! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing!
          </span>
          <span className="inline-block text-gray-400 font-semibold mr-8 text-2xl">
            Now Offering Lease Financing!{" "}
            <OutlineFilledCircle className="mx-4 -mt-4" /> Branding Made Easy!{" "}
            <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Branding Made
            Easy! <OutlineFilledCircle className="mx-4 -translate-y-1" /> Now Offering Lease
            Financing!
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
        }
      `}</style>
    </Section>
  );
}
