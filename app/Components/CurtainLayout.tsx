export default function CurtainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Foreground content */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">{children}</div>

        {/* This spacer creates the scroll room to reveal the fixed footer */}
        <div aria-hidden className="h-[100svh]" />
      </div>
    </div>
  );
}
