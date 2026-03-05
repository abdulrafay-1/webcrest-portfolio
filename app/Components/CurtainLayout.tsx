import Footer from "./Footer";

export default function CurtainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Footer />
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
        <div aria-hidden className="h-[100svh]" />
      </div>
    </div>
  );
}
