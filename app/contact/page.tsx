import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description:
    "Get in touch with Webcrest to discuss your web development project. Based in Karachi, Pakistan — available via email, phone, or WhatsApp. We respond within 24 hours.",
  alternates: {
    canonical: "https://webcrestllc.com/contact",
  },
  openGraph: {
    title: "Contact Webcrest — Start Your Project",
    description:
      "Get in touch with Webcrest to discuss your web development project. Based in Karachi, Pakistan — available via email, phone, or WhatsApp. We respond within 24 hours.",
    url: "https://webcrestllc.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
