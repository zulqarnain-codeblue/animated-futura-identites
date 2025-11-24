import React from "react";
import { coreValues, ValuePoint } from "./data/valuesData"; // Assuming data is imported
import { getIcon } from "./components/CustomIcons"; // Assuming custom icons are created
import { H2, H3, Paragraph } from "../ui/Typography";
import Image from "next/image";

const FacilitySection: React.FC = () => {
  // Placeholders for image paths
  const neonImage = "/images/33b921fcccec99552501830d4f7c45a967ed3d54.jpg";
  const amazonFacility = "/images/a806a3e2cb0e78cffec1298cabbc6b1721c73b47.jpg";

  return (
    <section className="bg-white py-12 sm:py-20 md:py-28">
      <div className="md:max-w-4xl xl:max-w-6xl mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* --- Left Column: Header and Description --- */}
          <div className="lg:w-1/2">
            <H2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Facility
            </H2>
            <H3 className="text-black opacity-90 font-semibold">
              Where the best value comes <br className="hidden sm:inline" />{" "}
              with the best values
            </H3>

            {/* Orange Line and Description Text */}
            <div className="flex border-l-4 border-theme pl-4 mb-12 mt-8 ml-10">
              <Paragraph className="opacity-70 leading-relaxed">
                Our focus on collaboration, transparency, and customer
                satisfaction drives us to exceed expectations, turning visionary
                concepts into reality. Whether it's a small-scale project or a
                nationwide rollout, we prioritize quality, efficiency, and
                lasting impact.
              </Paragraph>
            </div>
          </div>

          {/* --- Right Column: Image Collage --- */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-full flex flex-col items-end justify-center ">
              {/* Top Image: Neon Art (Main Focus) */}
              <div className="relative w-[65%] h-[250px] border-gray-100 bg-white">
                <div className="w-full h-full border border-gray-200 absolute -top-2 left-2" />
                <img
                  src={neonImage}
                  alt="Creative neon sign art inside a facility."
                  className="w-full h-full object-cover relative z-1"
                />
              </div>

              {/* Bottom Image: Factory Facility */}
              <div className="relative -mt-16 -ml-4 w-[50%] h-[180px] z-2 self-center">
                <img
                  src={amazonFacility}
                  alt="Exterior view of a large Amazon logistics facility."
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>

              {/* Vertical 'OUR FACILITY' Text Overlay */}

              <div className="absolute top-40 -right-4 h-full w-0 hidden md:flex items-start justify-start">
                <p
                  className="text-sm tracking-widest uppercase text-black transform -rotate-90 whitespace-nowrap flex justify-center items-center gap-2"
                  style={{ transformOrigin: "0 0" }} // Adjust transform origin for better rotation placement
                >
                  <span className="opacity-50">OUR FACILITY</span>
                  <span className="bg-theme w-12 h-0.5 inline-block"></span>
                </p>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/d56eac3a7219904deaaff9bd7cad01e6c0d7e110.png"
                  alt=""
                  width={484}
                  height={484}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Core Values Grid --- */}
        {/* <div className="mt-20 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-8">
            {coreValues.map((value) => {
              const IconComponent = getIcon(value.id);

              return (
                <div
                  key={value.id}
                  className="flex items-start border-b md:border-b-0 pb-6 md:pb-0 last:border-b-0"
                >
                  <div className="mr-4 pt-1">
                    <Image src={value?.icon} width={70} height={70} alt="" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FacilitySection;
