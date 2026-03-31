import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio — Selected Work",
  description:
    "Explore Webcrest's selected projects — including IusBlock, Meet Coin, PagoMeet, and MercadoMeet. Custom web, blockchain, and digital experiences built with Next.js, WebGL, and React.",
  alternates: {
    canonical: "https://webcrestllc.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Selected Work | Webcrest",
    description:
      "Explore Webcrest's selected projects — including IusBlock, Meet Coin, PagoMeet, and MercadoMeet. Custom web, blockchain, and digital experiences built with Next.js, WebGL, and React.",
    url: "https://webcrestllc.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
