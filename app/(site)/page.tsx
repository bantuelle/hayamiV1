import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import Onboarding from "@/components/Onboarding";
import { useRouter } from 'next/router';
import { FaTruckMoving, FaBroom, FaCut, FaPaintBrush, FaCode, FaTools } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Hayami - On Demand Artisan Services",
  description: "Anywhere Anytime",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Brands /> */}
      <Feature />
      <About />
      {/* <FeaturesTab /> */}
      <FunFact />
      {/* <Integration /> */}
      <CTA />
      <FAQ />
      <Testimonial />
      {/* <Pricing /> */}
      <Contact />
      <Blog />
    </main>
  );
}
