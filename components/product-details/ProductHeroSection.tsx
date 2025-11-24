import React from "react";
import Section from "@/components/ui/Section";
import Link from "next/link";
import CircleNotch from "../ui/CircleNotch";
import Image from "next/image";
import { H1, Paragraph } from "../ui/Typography";
import { BsArrowRight } from "react-icons/bs";
import { ProductContent } from "@/types/product"; // Assuming type file exists

interface ProductHeroSectionProps {
  content: ProductContent;
}

export default function ProductHeroSection({
  content,
}: ProductHeroSectionProps) {
  const {subtitle} = content;
  const [word1, word2, ...rest] = subtitle.split(" ");
  return (
    <Section
      fullWidth={true}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(81, 46, 9, 1) 0%, rgba(0, 0, 0, 1) 50%)",
      }}
      className="overflow-hidden sm:pt-10 md:pt-30"
    >
      <div className="bg-black sm:bg-transparent container max-w-full text-white pt-40 sm:py-34 md:py-0 flex flex-col md:flex-row md:items-end gap:4 md:gap-10 xl:gap-4">
        <div className="pl-10 sm:pl-0 md:pl-10 lg:pl-12 xl:pl-0 max-w-lg xl:max-w-md flex flex-col items-start gap-y-3 relative z-10 flex-1 xl:flex-0 ml-3 md:ml-8 lg:ml-16 xl:ml-30">
          <div className="flex flex-col items-start gap-y-0 pl-6 relative before:absolute before:left-6 before:top-[68%] before:-translate-y-1/2 before:w-0.5 before:h-[70%] before:bg-theme before:z-0">
            <small className="text-lg border-l-2 border-orange-500 pl-2 relative before:absolute before:-left-full before:top-[50%] before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-theme before:z-0">
              Futura Identities
            </small>
            <H1 className="">
              <span className="pl-2 text-white">{word1}</span>
              <span className="bg-theme text-white px-2">{word2}</span>
              {rest.length > 0 && <span className="pl-2">{rest.join(" ")}</span>}
            </H1>

            <Paragraph className="max-w-md pl-6 text-white">
              We design, build, & protect your brand identity with precision and
              consistency.
            </Paragraph>
          </div>

          <div className="min-h-56 flex items-center justify-center relative w-full">
            <div className="rotate-90 p-3 absolute -left-14 top-10">
              <Link
                href="/about"
                className="uppercase px-5 py-3 relative inline-block text-sm"
              >
                <span>Explore More</span>
                <span className="absolute top-1/2 -right-5 -translate-y-1/2 flex items-center justify-center pointer-events-none group">
                  <BsArrowRight
                    size={24}
                    className="transition-transform duration-300 text-theme group-hover:translate-x-2"
                  />
                </span>
                <span
                  className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 flex
                  items-center justify-center pointer-events-none"
                >
                  <CircleNotch
                    color="#FD8000"
                    className="w-[100px] lg:w-[120px] xl:w-[130px] h-[100px] lg:h-[120px] xl:h-[130px]"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 max-h-[90vh] self-center xl:self-auto">
          <div>
            <Image
              src="/images/f61b0227453c53ed152b8c5d4c29998b8cfa4814.jpg"
              className="w-full"
              alt="Hero Image"
              width={1260}
              height={896}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
