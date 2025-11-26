import Image from "next/image";
import { H2, SubHeading } from "../ui/Typography";

export default function TrustedClientsSection() {
  const clients = Array(10).fill("Logo here");

  return (
    <div className="w-full py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-14">
        <SubHeading className="mb-3">CLIENT LOGOS</SubHeading>
        <H2>Our Trusted Clients</H2>
      </div>

      {/* Logos Grid */}
      <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 px-6">
        {clients.map((item, index) => (
          <div
            key={index}
            className="
              group 
              flex items-center justify-center 
              bg-white border border-gray-200
              transition-all duration-180
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-1
              relative
            "
          >
            {/* Orange top border on hover */}
            <div
              className="
                absolute top-0 left-0 w-full h-[3px] 
                bg-theme-500 
                scale-x-0 group-hover:scale-x-100 
                transition-transform origin-left duration-180
              "
            />

            <span className="text-gray-400 text-lg font-medium">
              <img
                src="https://placehold.co/242x172?text=Logo+here"
                alt="Logo"
                width={241.97}
                height={172}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
