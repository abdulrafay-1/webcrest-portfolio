import About from "./Components/About";
import CurtainLayout from "./Components/CurtainLayout";
import Hero from "./Components/Hero";
import PortfolioSection from "./Components/PortfolioSection";
import ServicesSection from "./Components/ServicesSection";

export default function Page() {
  return (
    <CurtainLayout>
      <div className="">
        <Hero />
        <PortfolioSection />
        <ServicesSection />
      </div>

      <div className="">
        <About />
      </div>

      <div id="contact" className="h-px" aria-hidden="true"></div>
    </CurtainLayout>
  );
}
