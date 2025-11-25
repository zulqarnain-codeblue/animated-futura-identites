"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import CircleNotch from "./CircleNotch";
import { cn } from "@/lib/utils";

interface NotchButtonProps {
  href?: string;
  label?: string;
  className?: string;

  // Arrow customization
  showArrow?: boolean;
  arrowSize?: number;
  arrowClassName?: string;

  // Circle notch customization
  showCircle?: boolean;
  circleColor?: string;
  circleSize?: string | number;
  circleClassName?: string;

  // Button customization
  width?: string | number;
  height?: string | number;

  // Typography
  uppercase?: boolean;
  textSize?: string;
}

const NotchButton: React.FC<NotchButtonProps> = ({
  href = "/about",
  label = "LEARN MORE ABOUT US",
  className = "bg-theme",

  showArrow = true,
  arrowSize = 35,
  arrowClassName = "",

  showCircle = true,
  circleColor = "#FD8000",
  circleSize = "130px",
  circleClassName = "",

  uppercase = true,
  textSize = "text-[16px] md:text-[18px] lg:text-[19px] xl:text-[24px]",
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 sm:px-6 py-3 sm:py-4 relative flex justify-between",
        uppercase ? "uppercase" : "",
        textSize,
        className
      )}
      aria-label={label}
    >
      {/* Label */}
      <span>{label}</span>

      {/* Arrow Icon */}
      {showArrow && (
        <span className="absolute top-1/2 -right-6 -translate-y-1/2 flex items-center justify-center pointer-events-none group">
          <BsArrowRight
            size={arrowSize}
            className={cn(
              "transition-transform duration-300 text-theme group-hover:translate-x-2",
              arrowClassName
            )}
          />
        </span>
      )}

      {/* Circular Notch Animation */}
      {showCircle && (
        <span
          className={cn(
            "absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          )}
        >
          <CircleNotch color={circleColor} className={circleClassName} />
        </span>
      )}
    </Link>
  );
};

export default NotchButton;
