"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitted) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      projectType: String(formData.get("projectType") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    setIsSubmitting(true);
    setSubmitted(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Failed to send your message.");
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <section className="section-padding relative z-10 mx-auto max-w-7xl pb-20 pt-32 md:pb-28 md:pt-36">
        <div className="mb-10 md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-border/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Contact Webcrest
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Let&apos;s Build Your Next
            <span className="text-gradient-primary"> Digital Product</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Share your idea, timeline, and goals. We will get back to you with a
            clear plan and next steps.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <aside className="glass rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-2xl">Reach Us Directly</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Prefer a direct line? Email, call, or message us on WhatsApp.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <a
                  href="mailto:hello@webcrest.studio"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary"
                >
                  webcrestllc@gmail.com
                </a>
              </div>

              <div>
                <p className="text-muted-foreground">Phone</p>
                <a
                  href="tel:+923442667537"
                  className="mt-1 inline-block text-foreground transition-colors hover:text-primary"
                >
                  +92 344 2667537
                </a>
              </div>

              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="mt-1">Karachi, Pakistan</p>
              </div>
            </div>

            <a
              href="https://wa.me/923442667537?text=Hi%20Webcrest%2C%20I%20want%20to%20discuss%20my%20project."
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:shadow-[0_10px_35px_-10px_hsl(var(--primary)/0.6)]"
            >
              Chat on WhatsApp
            </a>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 md:p-8"
            noValidate
          >
            <fieldset
              disabled={isSubmitting || submitted}
              className="disabled:pointer-events-none disabled:opacity-70"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-2 block text-muted-foreground">Name</span>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="text-sm">
                  <span className="mb-2 block text-muted-foreground">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="text-sm sm:col-span-2">
                  <span className="mb-2 block text-muted-foreground">
                    Project Type
                  </span>
                  <input
                    type="text"
                    name="projectType"
                    placeholder="Website, web app, redesign, etc."
                    className="w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="text-sm sm:col-span-2">
                  <span className="mb-2 block text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Tell us what you want to build..."
                    className="w-full resize-y rounded-xl border border-border/70 bg-background/60 px-4 py-3 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  We usually respond within 24 hours.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="btn-magnetic rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Sending..."
                    : submitted
                      ? "Submitted"
                      : "Send Message"}
                </button>
              </div>
            </fieldset>

            {submitted ? (
              <p className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
                Thanks, your message has been sent. We will contact you soon.
              </p>
            ) : null}

            {errorMessage ? (
              <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
}
