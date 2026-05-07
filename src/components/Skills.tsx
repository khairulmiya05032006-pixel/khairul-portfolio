import { portfolioData } from "@/data/portfolio";
import { CheckCircle2 } from "lucide-react";

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "6rem 0", background: "var(--bg)" }}
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
            Technical Skills
          </p>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: "1rem",
          }}>
            Technical Expertise
          </h2>
          <div style={{ width: "2.5rem", height: "3px", background: "var(--primary)", borderRadius: "9999px", margin: "0 auto 1.25rem" }} />
          <p style={{ fontSize: "1.0625rem", color: "var(--subtext)", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.7 }}>
            A comprehensive list of technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skill cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", gap: "1.5rem" }}>
          {portfolioData.skills.map((skillGroup, index) => (
            <div key={index} className="card" style={{ padding: "2rem" }}>
              <h3 style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}>
                <span style={{
                  display: "inline-block",
                  width: "3px",
                  height: "1.125rem",
                  background: "var(--primary)",
                  borderRadius: "9999px",
                  flexShrink: 0,
                }} />
                {skillGroup.category}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {skillGroup.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      color: "var(--subtext)",
                      fontSize: "0.9375rem",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--primary)", flexShrink: 0 }}
                    />
                    <span style={{ fontWeight: 500 }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
