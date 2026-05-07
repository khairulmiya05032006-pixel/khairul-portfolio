import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Award } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      style={{ padding: "6rem 0", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>

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
            Background
          </p>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: "0.875rem",
          }}>
            Education & Certifications
          </h2>
          <div style={{ width: "2.5rem", height: "3px", background: "var(--primary)", borderRadius: "9999px", margin: "0 auto" }} />
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "1.25rem",
            top: "1.5rem",
            bottom: "1.5rem",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, var(--border-strong), transparent)",
          }} />

          {portfolioData.educationAndCertifications.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
              }}
            >
              {/* Icon node */}
              <div style={{
                flexShrink: 0,
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "9999px",
                background: "var(--primary-muted)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                zIndex: 1,
              }}>
                {item.type === "Education"
                  ? <GraduationCap size={16} />
                  : <Award size={16} />}
              </div>

              {/* Card */}
              <div
                className="card"
                style={{ flex: 1, padding: "1.5rem" }}
              >
                {/* Title row */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  marginBottom: "0.375rem",
                }}>
                  <h3 style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>
                  <span className="badge" style={{ flexShrink: 0 }}>{item.period}</span>
                </div>

                {/* Institution */}
                <p style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--subtext)",
                  marginBottom: "0.25rem",
                }}>
                  {item.institution}
                </p>

                {/* Type */}
                <span style={{
                  display: "inline-block",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}>
                  {item.type}
                </span>

                {/* Description */}
                <p style={{
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
