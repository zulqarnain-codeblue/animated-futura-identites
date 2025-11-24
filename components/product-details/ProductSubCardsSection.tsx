"use client";
import React, { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import Section from "../ui/Section";
import { H2, SubHeading } from "../ui/Typography";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ProductContent } from "@/types/product"; // Assuming type file exists

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

  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + products.length) % products.length);

  const visible = [
    products[index],
    products[(index + 1) % products.length],
    products[(index + 2) % products.length],
  ];

  return (
    <Section className="bg-white" fullWidth={true}>
      <div className="max-w-[1000px] xl:max-w-[1400px] bg-white mx-auto py-10 sm:py-20 px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <H2 className="text-black 2xl:text-[50px]">Our Products</H2>
          <SubHeading className="sm:mt-3">{subtitle}</SubHeading>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
          {products.map((item, i) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group cursor-pointer h-full
              ${i === 1 ? "md:translate-x-0" : ""}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                width={624}
                height={523}
              />

              {/* Dark Gradient Bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80"></div>

              {/* Text + Arrow */}
              <div className="absolute inset-0 flex items-end px-4 sm:px-6 py-4">
                <div className="flex justify-between w-full">
                  <h3 className="text-white sm:text-xl xl:text-[25px] font-light">
                    {item.title}
                  </h3>
                  <Link
                    href="#"
                    className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-theme-500 bg-white rounded-full hover:bg-theme-600 hover:text-white transition"
                  >
                    <MdOutlineArrowOutward className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
