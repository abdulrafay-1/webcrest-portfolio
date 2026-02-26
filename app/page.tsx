import About from "./Components/About";
import Hero from "./Components/Hero";

export default function Page() {
  return (
    <>
      <div className="">
        {" "}
        <Hero />
      </div>

      <div className="">
        <About />
      </div>
    </>
  );
}
