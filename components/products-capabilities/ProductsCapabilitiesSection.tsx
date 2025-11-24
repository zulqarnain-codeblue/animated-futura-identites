import React from "react";
import { ProductContent } from "@/types/product"; // Assuming type file exists
import { H2, H3, Paragraph, SubHeading } from "../ui/Typography";
import Image from "next/image";
import NotchButton from "../ui/NotchButton";

// --- Component to render the individual service section ---
interface ProductBlockProps {
  content: ProductContent;
}

const ProductBlock: React.FC<ProductBlockProps> = ({ content }) => {
  const {
    id,
    title,
    subtitle,
    slug,
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
    <div className="bg-white py-6 md:py-14">
      <div className=" max-w-4xl lg:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* --- Layout Container (Handles alternating columns) --- */}
        <div
          className={`flex flex-col gap-6 md:gap-10 lg:gap-14 xl:gap-20 ${layoutClasses}`}
        >
          {/* 1. Image Column (This column will be reordered based on layoutClasses) */}
          <div className="w-full md:w-[55%] relative ">
            <div className="relative z-10">
              {/* Main Image */}
              {/* In a real Next.js app, you'd use the <Image> component */}
              <Image
                src={mainImageUrl}
                alt={title}
                className="w-full h-auto aspect-square object-cover object-center"
                width={658}
                height={500}
              />

              {/* Vertical Tag Overlay (Mimics 'PROJECT MANAGEMENT' text) */}
              {tag && (
                <div
                  className={`h-full flex items-start mt-3 ${
                    layout === "left" ? "justify-start" : "justify-end"
                  } hiddden md:flex`}
                >
                  <p
                    className={`text-sm tracking-widest uppercase text-black transform  whitespace-nowrap flex justify-center items-center gap-2 ${
                      layout === "left" ? "flex-row-reverse" : "flex-row"
                    } `}
                    style={{ transformOrigin: "0 0" }} // Adjust transform origin for better rotation placement
                  >
                    <span className="bg-theme h-0.5 w-20 inline-block"></span>
                    <span className="opacity-50"> {tag}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Dots Mesh pattern */}
            {id !== 1 && (
              <div
                className={`max-w-[250px] xl:max-w-sm absolute -top-20 xl:-top-30 ${
                  layout === "left"
                    ? "-left-20 xl:-left-40"
                    : "-right-20 xl:-right-40"
                }`}
              >
                <Image
                  src="/images/d56eac3a7219904deaaff9bd7cad01e6c0d7e110.png"
                  width={484}
                  height={484}
                  alt="dots mesh"
                />
              </div>
            )}
          </div>

          {/* 2. Text Content Column */}
          <div className="w-full md:w-[45%] flex flex-col sm:flex-row md:flex-col gap-6 sm:gap-8 justify-between">
            <div>
              <H2 className="mb-6">{subtitle}</H2>

              {/* Description Block with Vertical Accent Line */}
              <div className="flex border-l-4 border-theme pl-6 mb-8 max-w-md">
                <Paragraph className="leading-relaxed opacity-60">
                  {description}
                </Paragraph>
              </div>
            </div>
            <div
              className={`flex items-start justify-between gap-2 sm:gap-0 relative z-10
              ${
                layout !== "left"
                  ? "sm:flex-col md:flex-row-reverse"
                  : "sm:flex-col md:flex-row"
              }
              `}
            >
              {/* Small Optional Image (Only renders if smallImageUrl is provided) */}
              {smallImageUrl && (
                <div
                  className={`sm:mt-0 sm:ml-0 w-1/2 sm:w-full w-max-w-[250px] lg:w-1/2 xl:w-max-w-[350px] relative z-10 sm:top-0 md:top-10 lg:top-10 z-0
                ${
                  layout === "left"
                    ? "md:-left-24 lg:-left-40"
                    : "md:-right-24 lg:-right-40"
                }
                
                `}
                >
                  {/* Use a fixed size or constrained wrapper for the small image */}
                  <Image
                    src={smallImageUrl}
                    alt={`Detail for ${subtitle}`}
                    className="w-full h-auto sm:min-w-[110px] lg:w-full"
                    width={332}
                    height={206}
                  />
                </div>
              )}

              <div
                className={`relative z-10 ${
                  layout === "left"
                    ? "-translate-x-8 sm:-translate-x-4 md:-translate-x-10"
                    : "-translate-x-8 sm:-translate-x-4 md:translate-x-0"
                }`}
              >
                <NotchButton
                  href={`/products-capabilities/${slug}`}
                  label="Explore More!"
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-theme text-nowrap w-fit"
                  textSize="text-[14px] md:text-[16px] xl:text-[19px]"
                  showCircle={true}
                  circleClassName="w-[110px] lg:w-[120px] xl:w-[130px] h-[110px] lg:h-[120px] xl:h-[130px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Parent Component to hold the section header and multiple blocks ---
const ProductsCapabilitiesSection: React.FC = () => {
  // --- Data Definition for the different blocks ---
  const ProductBlocks: ProductContent[] = [
    {
      id: 1,
      title: "Branding & Signage Solutions",
      subtitle: "QRS Solution",
      slug: "qrs-solution",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams  rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernatur",
      mainImageUrl: "/images/Rounded Rectangle 1.png",
      smallImageUrl: "/images/Rectangle 5.png", // This block includes the small image
      layout: "left", // Image on Left
      tag: "QRS Solution",
    },
    {
      id: 2,
      title: "Design & Engineering",
      subtitle: "Exterior Signage",
      slug: "exterior-signage",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 8.png",
      smallImageUrl: "/images/Rectangle 9.png", // This block omits the small image
      layout: "right", // Image on Right
      tag: "Exterior Signage",
    },
    {
      id: 3,
      title: "Design & Engineering",
      subtitle: "Interior Signage",
      slug: "interior-signage",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed.",
      mainImageUrl: "/images/Rectangle 77.png",
      smallImageUrl: "/images/Rectangle 20.png", // This block omits the small image
      layout: "left", // Image on Right
      tag: "Interior Signage",
    },

    {
      id: 4,
      title: "Design & Engineering",
      subtitle: "Architectural Elements",
      slug: "architectural-elements",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 17.png",
      smallImageUrl: "/images/Rectangle 18.png", // This block omits the small image
      layout: "right", // Image on Right
      tag: "Architectural Elements",
    },

    {
      id: 5,
      title: "Design & Engineering",
      subtitle: "ADA Solution ",
      slug: "ada-solution",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 23.png",
      smallImageUrl: "/images/Rectangle 24.png", // This block omits the small image
      layout: "left", // Image on Right
      tag: "ADA Solution",
    },

    {
      id: 6,
      title: "Design & Engineering",
      subtitle: "Lighting Solutions",
      slug: "lighting-solutions",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 27.png",
      smallImageUrl: "/images/Rectangle 28.png", // This block omits the small image
      layout: "right", // Image on Right
      tag: "Lighting Solutions",
    },

    {
      id: 7,
      title: "Design & Engineering",
      subtitle: "Wayfinding Signs",
      slug: "wayfinding-signs",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 35.png",
      smallImageUrl: "/images/Rectangle 36.png", // This block omits the small image
      layout: "left", // Image on Right
      tag: "Wayfinding Signs",
    },

    {
      id: 8,
      title: "Design & Engineering",
      subtitle: "Fleet Branding",
      slug: "fleet-branding",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 31.png",
      smallImageUrl: "/images/Rectangle 32.png", // This block omits the small image
      layout: "right", // Image on Right
      tag: "Fleet Branding",
    },

    {
      id: 9,
      title: "Design & Engineering",
      subtitle: "Large Format Printing",
      slug: "large-format-printing",
      description:
        "Perspiciatis unde aut omnis iste natus sit voluptatem accusantium doloremu laudantium quia totams rem aperiam eaque ipsa quae aib inventore veritatis et quasi ars beatae vitae a dicta sunt explicuabs nemo ipsam voluptatem volusaspernaturw aut odit aut fugit, sed. ",
      mainImageUrl: "/images/Rectangle 38.png",
      smallImageUrl: "/images/Rectangle 39.png", // This block omits the small image
      layout: "left", // Image on Right
      tag: "Large Format Printing",
    },
    // Add more blocks as needed...
  ];

  return (
    <section className="bg-white px-8 sm:px-10 overflow-hidden">
      {/* --- Main Section Header (Matches the provided image's header) --- */}
      <div className="max-w-6xl mx-auto pt-26 sm:pt-40 pb-0">
        {/* Soft Background Accent for Header */}
        <SubHeading className="sm:mb-3">
          Transforming Your Brand Identity
        </SubHeading>
        <H2>Products & Capabilities</H2>
      </div>
      <div className="mb-10">
        {/* Render the alternating blocks */}
        {ProductBlocks.map((block) => (
          <ProductBlock key={block.id} content={block} />
        ))}
      </div>
    </section>
  );
};

export default ProductsCapabilitiesSection;
