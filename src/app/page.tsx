import Hero from "@/components/sections/Hero";
export const dynamic = 'force-dynamic';
import GrandOpening from "@/components/sections/GrandOpening";
import DynamicPosters from "@/components/sections/DynamicPosters";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SignatureFavorites from "@/components/sections/SignatureFavorites";
import Experience from "@/components/sections/Experience";

import CustomerExperience from "@/components/sections/CustomerExperience";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <GrandOpening />
      <DynamicPosters />
      <About />
      <WhyChooseUs />
      <SignatureFavorites />
      <Experience />

      <CustomerExperience />
    </div>
  );
}
