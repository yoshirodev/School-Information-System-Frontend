import React from "react";
import Navbar from "../components/Navbar";
import schoolLogo from "../assets/nont_logo.png";
import "../styles/Programs.css";

import {
  BookOpen,
  GraduationCap,
  Globe,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const programs = [
  {
    title: "Junior High School",
    subtitle: "Grades 7 – 10",
    description:
      "Build a strong academic foundation in core subjects while developing critical thinking and leadership skills.",
    highlights: [
      "Core Science, Mathematics & English",
      "Filipino, Araling Panlipunan & MAPEH",
      "Technology and Livelihood Education (TLE)",
    ],
    icon: BookOpen,
  },
  {
    title: "Senior High School",
    subtitle: "Grades 11 – 12",
    description:
      "Deepen your knowledge through core subjects and chosen electives to prepare for higher education, entrepreneurship, or employment.",
    highlights: [
      "Core & Specialized Elective Subjects",
      "Work Immersion & Research Capstone",
      "College & Career Readiness Mentoring",
    ],
    icon: GraduationCap,
  },
];

export default function Programs() {
  return (
    <div className="programs-page">
      {/* NAVBAR */}
      <Navbar logo={schoolLogo} purpose="Student Enrollment Portal" />

      {/* HERO SECTION */}
      <section className="programs-hero">
        <div className="programs-hero-content">
          <h1>Our Programs</h1>
          <p>Quality education for a brighter future.</p>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <main className="programs-main" id="programs">
        <div className="programs-section-title">
          <span></span>
          <h2>Our Programs</h2>
          <span></span>
        </div>

        <div className="programs-grid">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div className="program-card" key={program.title}>
                <div className="program-icon">
                  <Icon size={48} strokeWidth={2} />
                </div>

                <h3>{program.title}</h3>
                <h4>{program.subtitle}</h4>
                <p>{program.description}</p>

                <ul className="program-highlights">
                  {program.highlights.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="programs-footer">
        <div className="programs-footer-content">
          {/* SCHOOL INFORMATION */}
          <div className="footer-school">
            <img src={schoolLogo} alt="MMNHS Logo" />

            <div>
              <h3>
                Medroso-Mendoza
                <br />
                National High School
              </h3>

              <p>Calabanga, Camarines Sur</p>

              <em>
                Committed to providing quality education
                <br />
                for a brighter future.
              </em>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-quick-links">
            <h3>Quick Links</h3>

            <div className="footer-links">
              <a href="/enroll">
                <ChevronRight size={13} />
                Admission
              </a>

              <a href="/programs">
                <ChevronRight size={13} />
                Programs
              </a>

              <a href="#about">
                <ChevronRight size={13} />
                About MMNHS
              </a>

              <a href="/login">
                <ChevronRight size={13} />
                Portal
              </a>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="footer-socials">
            <a href="#" aria-label="Website">
              <Globe size={21} />
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="programs-copyright">
          © 2026 Medroso-Mendoza National High School. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}