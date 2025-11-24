import React from "react";
import { ServiceContent } from "@/types/service"; // Assuming type file exists
import { H2, H3, Paragraph, SubHeading } from "../ui/Typography";
import Image from "next/image";

// --- Component to render the individual service section ---
interface ServiceBlockProps {
  content: ServiceContent;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({ content }) => {
  const {
    title,
    subtitle,
    description,
    mainImageUrl,
    smallImageUrl,
    layout,
    tag,
  } = content;

  // Conditional classes for alternating layout
  const layoutClasses =
    layout === "left"
      ? "md:flex-row" // Image on the left (default)
      : "md:flex-row-reverse"; // Image on the right (reversed)

  return (
    <div className="bg-white py-6 md:py-12">
      <div className=" max-w-4xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
        {/* --- Layout Container (Handles alternating columns) --- */}
        <div
          className={`flex flex-col gap-6 md:gap-10 lg:gap-14 xl:gap-20 ${layoutClasses}`}
        >
          {/* 1. Image Column (This column will be reordered based on layoutClasses) */}
          <div className="w-full md:w-[55%] relative">
            <div className="relative">
              {/* Main Image */}
              {/* In a real Next.js app, you'd use the <Image> component */}
              <Image
                src={mainImageUrl}
                alt={title}
                className="w-full h-auto"
                width={658}
                height={500}
              />

              {/* Vertical Tag Overlay (Mimics 'PROJECT MANAGEMENT' text) */}
              {tag && (
                <div
                  className={`absolute top-0 h-full w-4 flex items-start justify-center ${
                    layout === "left"
                      ? "-left-5 lg:-left-10"
                      : "-right-5 lg:-right-10"
                  } hiddden md:flex`}
                >
                  <p
                    className="text-sm tracking-widest uppercase text-black transform  whitespace-nowrap flex justify-center items-center gap-2 [writing-mode:sideways-lr]"
                    style={{ transformOrigin: "0 0" }} // Adjust transform origin for better rotation placement
                  >
                    <span className="opacity-50"> {tag}</span>
                    <span className="bg-theme h-12 w-0.5 inline-block"></span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 2. Text Content Column */}
          <div className="w-full md:w-[45%] flex flex-col-reverse sm:flex-row md:flex-col gap-6 sm:gap-8 justify-between self-center">
            <div>
              <H2 className="mb-6">{subtitle}</H2>

              {/* Description Block with Vertical Accent Line */}
              <div className="flex border-l-4 border-theme pl-6 mb-8 max-w-lg">
                <Paragraph className="leading-relaxed opacity-60">
                  {description}
                </Paragraph>
              </div>
            </div>

            {/* Small Optional Image (Only renders if smallImageUrl is provided) */}
            {smallImageUrl && (
              <div className="-mt-24 ml-10 sm:mt-0 sm:ml-0 w-1/2 max-w-[350px] relative">
                {/* Use a fixed size or constrained wrapper for the small image */}
                <Image
                  src={smallImageUrl}
                  alt={`Detail for ${subtitle}`}
                  className="w-full h-autos"
                  width={332}
                  height={206}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Parent Component to hold the section header and multiple blocks ---
const WhatWeDoSection: React.FC = () => {
  // --- Data Definition for the different blocks ---
  const serviceBlocks: ServiceContent[] = [
    {
      id: 1,
      title: "Branding & Signage Solutions",
      subtitle: "We Build Relationships",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams  rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernatur",
      mainImageUrl: "/images/Rectangle 76.png",
      smallImageUrl: "", // This block includes the small image
      layout: "left", // Image on Left
      tag: "",
    },
    {
      id: 2,
      title: "Design & Engineering",
      subtitle: "We Build Identities",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 77.png",
      smallImageUrl: "", // This block omits the small image
      layout: "right", // Image on Right
      tag: "",
    },
    {
      id: 3,
      title: "Design & Engineering",
      subtitle: "Concept To Execution",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 79.png",
      smallImageUrl: "", // This block omits the small image
      layout: "left", // Image on Right
      tag: "",
    },
  ];

  return (
    <section className="bg-white px-10 overflow-hidden">
      {/* --- Main Section Header (Matches the provided image's header) --- */}
      <div className="max-w-7xl mx-auto pt-26 sm:pt-40 pb-0">
        <SubHeading className="sm:mb-3">What we do</SubHeading>
        <H2>End-to-End Branding & Signage Solutions for Your Business</H2>
      </div>
      <div className="mb-10">
        {/* Render the alternating blocks */}
        {serviceBlocks.map((block) => (
          <ServiceBlock key={block.id} content={block} />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
