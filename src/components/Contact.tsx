"use client";

import { useState, useRef } from "react";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

// ─── Client-side validation ────────────────────────────────────────────────────
function validateForm(data: {
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
}): string | null {
  if (!data.user_name.trim()) return "Name is required.";
  if (data.user_name.length > 100) return "Name must be under 100 characters.";
  if (!data.user_email.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) return "Please enter a valid email address.";
  if (!data.subject.trim()) return "Subject is required.";
  if (data.subject.length > 200) return "Subject must be under 200 characters.";
  if (!data.message.trim()) return "Message is required.";
  if (data.message.trim().length < 10) return "Message must be at least 10 characters.";
  if (data.message.length > 2000) return "Message must be under 2000 characters.";
  return null;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Cooldown: prevent re-submission for 60 seconds
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const cooldownRemaining = cooldownUntil ? Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000)) : 0;
  const isOnCooldown = cooldownRemaining > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || isOnCooldown) return;

    setSubmitError("");

    const form = e.currentTarget;
    const formData = {
      user_name:  (form.elements.namedItem("user_name")  as HTMLInputElement).value,
      user_email: (form.elements.namedItem("user_email") as HTMLInputElement).value,
      subject:    (form.elements.namedItem("subject")    as HTMLInputElement).value,
      message:    (form.elements.namedItem("message")    as HTMLTextAreaElement).value,
      // Honeypot — must be empty
      _honey:     (form.elements.namedItem("_honey")     as HTMLInputElement).value,
    };

    // Client-side validation
    const validationError = validateForm(formData);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json() as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        setSubmitError(result.error ?? "Failed to send message. Please try again.");
        if (response.status === 429) {
          // Rate limited — set client cooldown too
          setCooldownUntil(Date.now() + 60_000);
        }
        return;
      }

      // Success
      setIsSubmitted(true);
      setCooldownUntil(Date.now() + 60_000);
      formRef.current?.reset();
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "var(--bg)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 200ms, box-shadow 200ms",
    fontFamily: "inherit",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--primary)";
    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-ring)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ padding: "6rem 0", background: "var(--bg-alt)" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{
            display: "inline-block",
            marginBottom: "0.875rem",
            padding: "0.25rem 0.875rem",
            borderRadius: "9999px",
            background: "var(--primary-muted)",
            color: "var(--primary)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Contact
          </p>
          <h2
            id="contact-heading"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: "0.875rem",
            }}
          >
            Get In Touch
          </h2>
          <div style={{ width: "2.5rem", height: "3px", background: "var(--primary)", borderRadius: "9999px", margin: "0 auto 1.25rem" }} />
          <p style={{ fontSize: "1.0625rem", color: "var(--subtext)", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.7 }}>
            Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", maxWidth: "56rem", margin: "0 auto" }}
          className="lg:grid-cols-2"
        >
          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }}>
            {[
              {
                Icon: Mail,
                label: "Email Me",
                sub: "Direct communication for inquiries",
                link: `mailto:${portfolioData.email}`,
                linkText: portfolioData.email,
              },
              {
                Icon: MessageSquare,
                label: "Social Media",
                sub: "Connect with me on professional networks",
                links: [
                  { href: portfolioData.linkedin, text: "LinkedIn" },
                  { href: portfolioData.github,   text: "GitHub" },
                ],
              },
            ].map(({ Icon, label, sub, link, linkText, links }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                <div style={{
                  padding: "0.875rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--primary-muted)",
                  color: "var(--primary)",
                  flexShrink: 0,
                }}>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>
                    {label}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "0.5rem" }}>{sub}</p>
                  {link && (
                    <a
                      href={link}
                      style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
                      {linkText}
                    </a>
                  )}
                  {links && (
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {links.map(({ href, text }) => (
                        <a
                          key={text}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                        >
                          {text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="card" style={{ padding: "2rem" }}>
            {/* Accessible live region for screen readers */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {isSubmitted && "Message sent successfully. Thank you for reaching out."}
              {submitError && `Error: ${submitError}`}
            </div>

            {isSubmitted ? (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0", textAlign: "center" }}>
                <div style={{
                  width: "4rem", height: "4rem",
                  borderRadius: "9999px",
                  background: "rgba(16,185,129,0.1)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <CheckCircle size={32} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--subtext)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{ color: "var(--primary)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: "0.9375rem" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Error message */}
                {submitError && (
                  <div
                    role="alert"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      padding: "1rem",
                      background: "rgba(239,68,68,0.1)",
                      color: "#ef4444",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                    }}
                  >
                    <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }} />
                    {submitError}
                  </div>
                )}

                {/* Honeypot anti-spam field — hidden from real users */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="new-password"
                  aria-hidden="true"
                  defaultValue=""
                  onChange={(e) => { e.target.value = ""; }}
                  style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                />

                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { id: "user_name",  label: "Name",  type: "text",  placeholder: "Your name",       autoComplete: "name",  maxLength: 100 },
                    { id: "user_email", label: "Email", type: "email", placeholder: "your@email.com",   autoComplete: "email", maxLength: 254 },
                  ].map(({ id, label, type, placeholder, autoComplete, maxLength }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "var(--subtext)", marginBottom: "0.375rem" }}
                      >
                        {label} <span aria-label="required" style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type={type}
                        id={id}
                        name={id}
                        required
                        maxLength={maxLength}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "var(--subtext)", marginBottom: "0.375rem" }}
                  >
                    Subject <span aria-label="required" style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    maxLength={200}
                    autoComplete="off"
                    placeholder="How can I help you?"
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "var(--subtext)", marginBottom: "0.375rem" }}
                  >
                    Message <span aria-label="required" style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Your message here... (min. 10 characters)"
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isOnCooldown}
                  className="btn-primary"
                  aria-disabled={isSubmitting || isOnCooldown}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    opacity: isSubmitting || isOnCooldown ? 0.7 : 1,
                    cursor: isSubmitting || isOnCooldown ? "not-allowed" : "pointer",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {isSubmitting ? (
                    <div
                      style={{ width: "1.125rem", height: "1.125rem", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "9999px", animation: "spin 0.7s linear infinite" }}
                      aria-hidden="true"
                    />
                  ) : (
                    <Send size={16} aria-hidden="true" />
                  )}
                  {isSubmitting
                    ? "Sending…"
                    : isOnCooldown
                      ? `Wait ${cooldownRemaining}s`
                      : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
