import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { TeamMember, teamMembers } from "./data/teamData"; // Assuming you create the data file
import { H2, SubHeading } from "../ui/Typography";
import { FaLinkedinIn } from "react-icons/fa6";

// --- Sub-Component: Team Card ---
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Image Placeholder Container */}
      {/* The original image is a light gray box with a stylized silhouette */}
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center mb-4 transition duration-300 hover:shadow-lg">
        {/* Placeholder for the Silhouette (mimicking the original design) */}
        <svg
          className="w-1/2 h-1/2 text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM12 12A6 6 0 1012 0a6 6 0 000 12z" />
        </svg>
        {/* In production, use Next.js <Image> component here */}
      </div>

      <div className="flex items-start justify-between w-full border-b border-gray-200 pb-6">
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
          <p className="text-xs text-gray-600">{member.title}</p>
        </div>
        <span className="bg-gray-400 p-2 rounded-full">
          <FaLinkedinIn size={16} />
        </span>
      </div>
    </div>
  );
};

// --- Main Component: Team Section ---
const TeamSection: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-10">
        {/* Header Block */}
        <div className="text-center mb-12 md:mb-16">
          {/* Subtle Orange/Red line and 'OUR TEAM' text */}
          <SubHeading className="mb-2">Our Team</SubHeading>
          <H2>It’s a Team Effort!</H2>
        </div>

        {/* Team Grid Layout */}
        <div className="flex flex-wrap justify-center gap-6 gap-y-10">
          {teamMembers.map((member) => (
            <div className="flex-[1_1_200px] max-w-[250px]" key={member.name}>
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
