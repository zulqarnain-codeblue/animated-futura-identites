import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Preloader from "@/components/ui/Preloader";
import SplitLoader from "@/components/ui/SplitLoader";
import ShutterLoader from "@/components/ui/ShutterLoader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Futura Identities",
  description: "Signage Company Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <article className="max-w-[1920px] mx-auto overflow-hidden">
          <Header />
          {/* <Preloader /> */}
          <SplitLoader />
          {/* <ShutterLoader /> */}
          {children}
          <Footer />
        </article>
      </body>
    </html>
  );
}
