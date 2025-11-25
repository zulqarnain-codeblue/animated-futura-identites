import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  props?: any;
  ref?: any;
}

/* Headings */
export function H1({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-[25px] sm:text-[35px] md:text-[45px] lg:text-[55px] xl:text-[65px] 2xl:text-[85px] font-semibold leading-tight mb-6 flex gap-x-0 flex-wrap flex-col",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-[45px] xl:text-[55px] 2xl:text-[68px] font-bold text-black",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-[18px] md:text-[20px] lg:text-[23px] xl:text-[30px] leading-none",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h4
      className={cn("text-xl font-medium", className)}
      style={style}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h5
      className={cn("text-lg font-medium", className)}
      style={style}
      {...props}
    >
      {children}
    </h5>
  );
}

export function H6({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h6
      className={cn("text-base font-medium", className)}
      style={style}
      {...props}
    >
      {children}
    </h6>
  );
}

/* Subheading */
export function SubHeading({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-theme font-semibold text-[15px] sm:text-[18px] tracking-widest uppercase",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </h3>
  );
}

/* Paragraph */
export function Paragraph({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <p
      className={cn(
        "text-black text-[16px] sm:text-lg leading-tight",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </p>
  );
}

/* SubParagraph */
export function SubParagraph({
  children,
  className = "",
  style,
  ...props
}: TypographyProps) {
  return (
    <p
      className={cn(
        "text-black text-[16px] xl:text-[17px] leading-tight",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </p>
  );
}
