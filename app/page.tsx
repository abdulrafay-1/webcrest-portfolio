import About from "./Components/About";
import Hero from "./Components/Hero";
import PortfolioSection from "./Components/PortfolioSection.jsx";
import ServicesSection from "./Components/ServicesSection";

export default function Page() {
  return (
    <>
      <div className="">
        <Hero />
        <PortfolioSection />
        <ServicesSection />
      </div>

      <div className="">
        <About />
      </div>

      <div id="contact" className="h-px" aria-hidden="true"></div>
    </>
  );
}
