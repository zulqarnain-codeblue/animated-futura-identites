import { FiPlay } from "react-icons/fi";
import { H2, H3, Paragraph, SubHeading, SubParagraph } from "../ui/Typography";
import Image from "next/image";

export default function BrandingSignageSection() {
  return (
    <section className="w-full bg-white py-8 px-6 md:px-12 lg:px-16 pt-26 sm:pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <SubHeading className="text-theme-500 font-semibold text-sm tracking-wide sm:mb-4">
            OUR STORY
          </SubHeading>
          <H2 className="mb-0 md:mb-8">
            Innovators in
            <br />
            Branding & Signage
          </H2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-16 items-start">
          {/* Left Column - Image and WhyWeAre */}
          <div className="space-y-14">
            {/* Main Image */}
            <div className="relative">
              {/* The Vertical 'Who we are' Text Overlay */}
              <div className="absolute top-[158px] -left-8 h-full w-0 hidden md:flex items-start justify-start">
                <p
                  className="text-sm tracking-widest uppercase text-black transform -rotate-90 whitespace-nowrap flex justify-center items-center gap-2"
                  style={{ transformOrigin: "0 0" }} // Adjust transform origin for better rotation placement
                >
                  <span className="opacity-50">Who we are</span>
                  <span className="bg-theme w-12 h-0.5 inline-block"></span>
                </p>
              </div>
              <Image
                src="/images/Rectangle 52.png"
                alt="Pop Bol signage installation"
                className="w-full h-auto  object-cover"
                width={622}
                height={697}
              />
              <div className="absolute -left-14 bottom-0 w-14 h-40 bg-theme-500"></div>
            </div>
          </div>

          {/* Right Column - Future of Branding */}
          <div className="space-y-8">
            <div>
              <div className="max-w-md">
                <H3 className="font-bold mb-6 text-black 2xl:text-5xl">
                  Future of branding & Signage
                </H3>

                {/* Description with left border */}
                <div className="border-l-2 border-theme pl-6 mb-8">
                  <Paragraph className="leading-7 opacity-60">
                    At Futura Identities, our talent is our people. With a team
                    of 75 skilled professionals working from our 50,000 sq. ft.
                    facility in Mount Holly, NJ, we bring creativity, precision,
                    and expertise to every project. Our continuous investment in
                    advanced manufacturing capabilities allows us to explore new
                    fabrication techniques and push the boundaries of design.
                  </Paragraph>
                </div>
              </div>
              <div className="flex justify-between items-end gap-3">
                {/* Watch Button */}
                <button className="bg-theme hover:bg-theme-600 transition-colors text-white font-semibold py-4 px-5 flex flex-col items-start justify-center gap-3 ">
                  <FiPlay size={24} fill="currentColor" />
                  <SubParagraph className="text-white font-light text-left text-nowrap">
                    Watch
                    <br />
                    Futura Identities
                  </SubParagraph>
                </button>

                {/* Right Image */}
                <div className="overflow-hidden">
                  <Image
                    src="/images/Rectangle 53.png"
                    alt="Fabrication work"
                    className="w-full h-auto object-cover"
                    width={332}
                    height={206}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
