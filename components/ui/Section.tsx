import React from "react";
import { cn } from "@/lib/utils"; // if you're using a cn utility

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean; // optional: allows skipping max-width when needed
  id?: string; // optional: for scroll/anchors
  style?: React.CSSProperties; // optional: for inline styles
}

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  style,
  fullWidth = false,
  id,
}) => {
  return (
    <section
      id={id}
      style={{ ...style }}
      className={cn(
        !fullWidth ? "max-w-7xl mx-auto" : "", // restrict width only when fullWidth = false
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
