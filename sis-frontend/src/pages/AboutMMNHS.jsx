
import Navbar from "../components/Navbar";
import schoolLogo from "../assets/nont_logo.png";
import "../styles/AboutMMNHS.css";

import {
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  Leaf,
  Flag,
  Target,
  Eye,
} from "lucide-react";

const coreValues = [
  {
    title: "Maka-Diyos",
    description: "Faith in God and spiritual values.",
    icon: Heart,
  },
  {
    title: "Makatao",
    description: "Respect, compassion, and concern for others.",
    icon: Users,
  },
  {
    title: "Makakalikasan",
    description: "Care and responsibility for the environment.",
    icon: Leaf,
  },
  {
    title: "Makabansa",
    description: "Love, loyalty, and service to the country.",
    icon: Flag,
  },
];

export default function AboutMMNHS() {
  return (
    <div className="about-page">

      {/* NAVBAR */}
      <Navbar
        logo={schoolLogo}
        purpose="Student Enrollment Portal"
      />

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Our School</h1>
          <p>
            Learn more about Medroso-Mendoza National High School,
            our purpose, and the values that guide our community.
          </p>
        </div>
      </section>

      {/* ABOUT SCHOOL */}
      <section className="about-introduction">
        <div className="about-intro-icon">
        </div>

        <div className="about-intro-content">
          <span className="about-label">ABOUT MMNHS</span>

          <h2>
            Welcome to Medroso-Mendoza National High School
          </h2>

          <p>
            Medroso-Mendoza National High School is dedicated to
            providing accessible and quality education to learners
            in the community. Our school aims to develop students
            academically, socially, and personally through a safe
            and supportive learning environment.
          </p>

          <p>
            Through a supportive learning environment, the school
            aims to help learners develop knowledge, skills,
            character, and confidence as they prepare for their future.
          </p>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="about-vm-section">

        <div className="about-section-heading">
          <span></span>
          <h2>Our Vision and Mission</h2>
          <span></span>
        </div>

        <div className="about-vm-grid">

          {/* VISION */}
          <div className="about-vm-card">
            <div className="about-vm-heading">
              <div className="about-vm-icon">
                <Eye size={30} />
              </div>
              <h3>DepEd Vision</h3>
            </div>

            <p>
              We dream of Filipinos who passionately love their
              country and whose competencies and values enable
              them to realize their full potential and contribute
              meaningfully to building the nation.
            </p>

            <p>
              We are a learner-centered public institution,
              the Department of Education continuously improves
              itself to better serve its stakeholders.
            </p>
          </div>

          {/* MISSION */}
          <div className="about-vm-card">
            <div className="about-vm-heading">
              <div className="about-vm-icon">
                <Target size={30} />
              </div>
              <h3>DepEd Mission</h3>
            </div>

            <p>
              To protect and promote the right of every Filipino
              to quality, equitable, culture-based, and complete
              basic education where:
            </p>

            <ul className="about-mission-list">
              <li>
                Students learn in a child-friendly,
                gender-sensitive, safe and motivating environment.
              </li>
              <li>
                Teachers facilitate learning and constantly
                nurture every learner.
              </li>
              <li>
                Administrators and staff ensure an enabling
                and supportive environment for effective learning.
              </li>
              <li>
                Families, communities and other stakeholders
                are actively engaged and share responsibility
                for developing lifelong learners.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="about-values-section">

        <div className="about-section-heading">
          <span></span>
          <h2>Our Core Values</h2>
          <span></span>
        </div>

        <p className="about-values-subtitle">
          The values that guide every learner and member
          of the school community.
        </p>

        <div className="about-values-grid">
          {coreValues.map((value) => {
            const Icon = value.icon;

            return (
              <div className="about-value-card" key={value.title}>
                <div className="about-value-icon">
                  <Icon size={34} />
                </div>

                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            );
          })}
        </div>

      </section>

      {/* FOOTER */}
      <footer className="about-footer">

        <div className="about-footer-content">

          <div className="about-footer-school">
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

          <div className="about-footer-links">
            <h3>Quick Links</h3>

            <div>
              <a href="/enroll">Admission</a>
              <a href="/programs">Programs</a>
              <a href="/about">About MMNHS</a>
              <a href="/login">Portal</a>
            </div>
          </div>

          <div className="about-footer-message">
            <GraduationCap size={35} />
            <p>Learn. Grow. Succeed.</p>
          </div>

        </div>

        <div className="about-copyright">
          © 2026 Medroso-Mendoza National High School. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}
