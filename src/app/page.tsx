import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SignatureFavorites from "@/components/sections/SignatureFavorites";
import Experience from "@/components/sections/Experience";
import SpecialEvents from "@/components/sections/SpecialEvents";
import CustomerExperience from "@/components/sections/CustomerExperience";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <WhyChooseUs />
      <SignatureFavorites />
      <Experience />
      <SpecialEvents />
      <CustomerExperience />
    </div>
  );
}
