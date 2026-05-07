import { portfolioData } from "@/data/portfolio";
import { Code, Server } from "lucide-react";
import Image from "next/image";

export default function About() {
  const stats = [
    { label: "Education",       value: "BCA",  icon: Code },
    { label: "Projects",        value: "8+",  icon: Server },
    // { label: "Clients",         value: "10+",  icon: User },
    // { label: "Cloud Platforms", value: "3+",   icon: Cloud },
  ];

  return (
    <section
      id="about"
      style={{ padding: "6rem 0", background: "var(--bg-alt)" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text column */}
          <div>
            <p style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.25rem 0.875rem",
              borderRadius: "9999px",
              background: "var(--primary-muted)",
              color: "var(--primary)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              About Me
            </p>

            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.25,
              color: "var(--text)",
              marginBottom: "1.25rem",
            }}>
              Building user-focused web applications while continuously improving my development skills.
            </h2>

            <div style={{
              fontSize: "1.0625rem",
              color: "var(--subtext)",
              lineHeight: 1.75,
              marginBottom: "2.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              {Array.isArray(portfolioData.about) 
                ? portfolioData.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                : <p>{portfolioData.about}</p>}
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="card"
                  style={{ padding: "1.125rem 1.25rem" }}
                >
                  <div style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>
                    <stat.icon size={22} />
                  </div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.2rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar column */}
          <div style={{ position: "relative", maxWidth: "28rem", margin: "0 auto", width: "100%" }}>
            <div style={{
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius-2xl)",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              padding: "5px",
              boxShadow: "var(--shadow-md)",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "calc(var(--radius-2xl) - 2px)",
                background: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}>
                <Image
                  src="/portfolioPic.png"
                  alt={`${portfolioData.name} — ${portfolioData.role}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 448px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>

            {/* Subtle glow accents */}
            <div style={{
              position: "absolute", bottom: "-2rem", right: "-2rem",
              width: "10rem", height: "10rem",
              background: "radial-gradient(circle, rgba(36,96,232,0.12) 0%, transparent 70%)",
              borderRadius: "9999px",
              zIndex: -1,
            }} />
            <div style={{
              position: "absolute", top: "-2rem", left: "-2rem",
              width: "8rem", height: "8rem",
              background: "radial-gradient(circle, rgba(11,165,224,0.1) 0%, transparent 70%)",
              borderRadius: "9999px",
              zIndex: -1,
            }} />
          </div>

        </div>
      </div>
    </section>
  );
}
