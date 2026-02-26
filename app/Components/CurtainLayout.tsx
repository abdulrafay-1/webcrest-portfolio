import Footer from "./Footer";

export default function CurtainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Foreground content */}
      <div className="relative z-10">
        {children}

        {/* This spacer creates the scroll room to reveal the fixed footer */}
        <div aria-hidden className="h-[100svh]" />
      </div>

      {/* Background footer (fixed) */}
      <Footer />
    </div>
  );
}
