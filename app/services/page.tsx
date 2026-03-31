import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — Web Development, Motion & SaaS",
  description:
    "Webcrest offers expert web development, 3D motion design, e-commerce solutions, and SaaS platform development. Built with Next.js, Three.js, React, and Shopify Plus for businesses worldwide.",
  alternates: {
    canonical: "https://webcrestllc.com/services",
  },
  openGraph: {
    title: "Services — Web Development, Motion & SaaS | Webcrest",
    description:
      "Webcrest offers expert web development, 3D motion design, e-commerce solutions, and SaaS platform development. Built with Next.js, Three.js, React, and Shopify Plus for businesses worldwide.",
    url: "https://webcrestllc.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
