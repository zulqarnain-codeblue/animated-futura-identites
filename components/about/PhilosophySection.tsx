import React from "react";
import { FaRegHandshake, FaLightbulb, FaTools } from "react-icons/fa"; // Example icons
import { H2, Paragraph } from "../ui/Typography";
import Image from "next/image";

// Define a type for our content blocks for clean iteration (optional, but good practice)
interface PhilosophyPoint {
  icon: React.ElementType; // Use a type for React Icons
  title: string;
  content: string;
}

const philosophyPoints: PhilosophyPoint[] = [
  {
    icon: FaTools,
    title: "Fabrication & Integrity",
    content:
      "By integrating cutting-edge fabrication techniques with a deep understanding of design integrity, we ensure that every element we create meets the highest industry standards.",
  },
  {
    icon: FaRegHandshake,
    title: "Collaboration & Satisfaction",
    content:
      "Our focus on collaboration, transparency, & customer satisfaction drives us to exceed expectations, turning visionary concepts into reality. Whether it's a small scale project or a nationwide rollout, we prioritize quality, efficiency, and lasting impact.",
  },
];

const PhilosophySection: React.FC = () => {
  // NOTE: In a real Next.js app, the images would be imported or loaded from public/
  const mainImage = "/images/Mask group 9.png"; // Placeholder
  const smallImage = "/images/Mask group 10.png"; // Placeholder

  return (
    <section className="bg-black py-12 sm:py-20 md:py-24 text-white">
      {/* 🌟 Section Header */}
      <div className="max-w-3xl mx-auto text-center px-8 mb-16">
        <H2 className=" mb-4 text-white">Our Philosophy</H2>
        <Paragraph className="text-white leading-relaxed">
          At Futura Identities, our mission is to deliver high-quality
          architectural elements while providing an exceptional client
          experience. We are committed to precision, innovation, and excellence
          in every project we undertake.
        </Paragraph>
      </div>
      {/* --- Main Content & Layout --- */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
          {/* 1. Left Content Column (Text) */}
          <div className="lg:w-1/2 space-y-8 border-l-2 border-theme pl-5">
            {philosophyPoints.map((point, index) => (
              <div key={index}>
                {/* Optional: Add a subtle icon/title if needed, though the original just has paragraphs */}
                {/* <point.icon className="text-3xl text-yellow-500 mb-2" />
                <h3 className="text-2xl font-semibold mb-2">{point.title}</h3> */}
                <Paragraph className="leading-relaxed text-white opacity-70 font-light">
                  {point.content}
                </Paragraph>
              </div>
            ))}
          </div>

          {/* 2. Right Content Column (Image Container) */}
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full ">
              {/* Image itself */}
              {/* In a real Next.js app, you'd use the <Image> component */}
              <Image
                src={mainImage}
                alt="Installation of a Walgreens store sign on a sunny day."
                className="w-full h-full object-cover shadow-2xl"
                width={572}
                height={428}
              />

              {/* The Vertical 'OUR PHILOSOPHY' Text Overlay */}
              <div className="absolute top-[190px] -right-4 h-full w-0 hidden md:flex items-start justify-start">
                <p
                  className="text-sm tracking-widest uppercase text-white transform -rotate-90 whitespace-nowrap flex justify-center items-center gap-2"
                  style={{ transformOrigin: "0 0" }} // Adjust transform origin for better rotation placement
                >
                  <span className="opacity-50">Our Philosophy</span>
                  <span className="bg-theme w-12 h-0.5 inline-block"></span>
                </p>
              </div>
            </div>
          </div>

          {/* 3. Small Bottom-Left Feature Image (Absolute Positioning) */}
          <div className="absolute -bottom-1/2 -left-1/5 max-w-[180px] hidden lg:block ">
            {/* In a real Next.js app, you'd use the <Image> component */}
            <Image
              src={smallImage}
              alt="Close-up of a circular TGI Fridays sign at night."
              className="w-full h-full object-cover object-center"
              width={313}
              height={248}
            />
          </div>
        </div>{" "}
        {/* End flex container */}
      </div>{" "}
      {/* End max-w-7xl container */}
    </section>
  );
};

export default PhilosophySection;
