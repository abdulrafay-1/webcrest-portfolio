import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Digital Agency in Karachi, Pakistan",
  description:
    "Learn about Webcrest — a web development agency founded in 2024 in Karachi, Pakistan. We build scalable software, modern web platforms, and intelligent digital systems for startups and businesses worldwide.",
  alternates: {
    canonical: "https://webcrestllc.com/about",
  },
  openGraph: {
    title: "About Webcrest — Digital Agency in Karachi, Pakistan",
    description:
      "Learn about Webcrest — a web development agency founded in 2024 in Karachi, Pakistan. We build scalable software, modern web platforms, and intelligent digital systems for startups and businesses worldwide.",
    url: "https://webcrestllc.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
