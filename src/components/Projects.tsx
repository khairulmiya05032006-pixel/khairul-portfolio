"use client";


import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";


export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "6rem 0", background: "var(--bg-alt)" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Heading */}
        <div style={{ marginBottom: "4rem" }}>
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
            Work
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h2 style={{
                fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}>
                Featured Projects
              </h2>
              <div style={{ width: "2.5rem", height: "3px", background: "var(--primary)", borderRadius: "9999px" }} />
            </div>
            <p style={{
              fontSize: "1rem",
              color: "var(--subtext)",
              maxWidth: "30rem",
              lineHeight: 1.65,
            }}>
              A selection of my recent work, showcasing full-stack skills and system design.
            </p>
          </div>
        </div>

        {/* Project grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(19rem, 1fr))", gap: "1.5rem" }}>
          {portfolioData.projects.map((project) => (
            <div
              key={project.title}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Image placeholder */}
              <div style={{
                aspectRatio: "16/9",
                background: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                fontWeight: 800,
                fontStyle: "italic",
                color: "var(--border-strong)",
                position: "relative",
                overflow: "hidden",
              }}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  project.title.charAt(0)
                )}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(36,96,232,0.05) 0%, rgba(11,165,224,0.05) 100%)",
                }} />
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                {/* Tech badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="badge">{tech}</span>
                  ))}
                </div>

                <h3 style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.01em",
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: "0.9rem",
                  color: "var(--subtext)",
                  lineHeight: 1.65,
                  flexGrow: 1,
                  marginBottom: "1.25rem",
                }}>
                  {project.description}
                </p>

                {/* Links */}
                <div style={{
                  display: "flex",
                  gap: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border)",
                }}>
                  {[
                    { href: project.link,   Icon: ExternalLink, label: "Live Demo" },
                    { href: project.github, Icon: Github,       label: "Source Code" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "var(--subtext)",
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--subtext)")}
                    >
                      <Icon size={15} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
