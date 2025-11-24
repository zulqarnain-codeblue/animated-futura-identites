import React from "react";
import { cn } from "@/lib/utils";
interface CircleNotchProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  strokeWidth?: number;
  dashArray?: number;
  dashOffset?: number;
  rotate?: number;
  className?: string;
}
const CircleNotch: React.FC<CircleNotchProps> = ({
  color = "#FD8000",
  strokeWidth = 1,
  dashArray = 250,
  dashOffset = 60,
  rotate = 314,
  className = "",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {" "}
      <path
        d="M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 0 1 50 10"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(${rotate}, 50, 50)`}
      />{" "}
    </svg>
  );
};
export default CircleNotch;
