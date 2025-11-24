import React from "react";
import { H2, SubHeading } from "../ui/Typography"; // Adjusted imports based on context
import Image from "next/image";

function ProjectWorkflowSection() {
  return (
    <section className="bg-white px-10 py-12 overflow-hidden">
      {/* --- Main Section Header --- */}
      <div className="max-w-6xl mx-auto pt-0 pb-0 text-center">
        <SubHeading className="sm:mb-3">Project Workflow</SubHeading>
        <H2>Project Workflow Visual</H2>
      </div>

      {/* --- Grid Layout --- */}
      {/* md:grid-cols-4 sets the 4-column desktop layout */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-1.5 max-w-6xl mx-auto mt-8">
        {/* --- ROW 1 --- */}

        {/* 1. Top Left (Red Shirt) */}
        <div className="relative h-64 w-full">
          <Image
            src="/images/Rectangle 76.png"
            alt="Red Shirt Staff"
            fill
            className="object-cover"
          />
        </div>

        {/* 2. Top Middle (Workshop Team) - SPANS 2 COLUMNS */}
        <div className="col-span-1 md:col-span-2 relative h-64 w-full">
          <Image
            src="/images/952979167243b22cd2d6da01fa097bbcbd6af7e7.jpg"
            alt="Red Letter Sign"
            fill
            className="object-cover"
          />
        </div>

        {/* 3. Top Right (Red 'R') */}
        <div className="relative h-64 w-full">
          <Image
            src="/images/Rectangle 3.png" // Assuming this is the wide workshop image
            alt="Workshop Team"
            fill
            className="object-cover"
          />
        </div>

        {/* --- ROW 2 --- */}

        {/* 4. Bottom Left (MYSIE) */}
        <div className="relative h-64 w-full">
          <Image
            src="/images/Rectangle 5.png"
            alt="Mysie Sign"
            fill
            className="object-cover"
          />
        </div>

        {/* 5. Bottom Middle (Barbershop) */}
        <div className="relative h-64 w-full">
          <Image
            src="/images/Mask group 3.png"
            alt="Barbershop Sign"
            fill
            className="object-cover"
          />
        </div>

        {/* 6. Bottom Right (PGW Blue Sign) - SPANS 2 COLUMNS */}
        <div className="col-span-1 md:col-span-2 relative h-64 w-full">
          <Image
            src="/images/8d5f49a047f48f48b696f2ddbbe57f94b05ffe36.jpg"
            alt="PGW Sign"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ProjectWorkflowSection;
