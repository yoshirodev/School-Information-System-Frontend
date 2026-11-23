
import { useState } from "react";
import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Teacher_Load.css";

const teachingLoads = [
  {
    subject: "English",
    classroom: "101",
    schedule: "07:30AM-08:30AM",
    subjectId: "ENG-9",
  },
  {
    subject: "English",
    classroom: "102",
    schedule: "08:30AM-09:30AM",
    subjectId: "ENG-9",
  },
  {
    subject: "Practical Research 1",
    classroom: "301",
    schedule: "09:30AM-10:30AM",
    subjectId: "PR-11",
  },
  {
    subject: "English",
    classroom: "103",
    schedule: "10:30AM-11:30AM",
    subjectId: "ENG-9",
  },
  {
    subject: "Oral Communication",
    classroom: "301",
    schedule: "12:30PM-01:30PM",
    subjectId: "OC-11",
  },
  {
    subject: "English",
    classroom: "104",
    schedule: "01:30PM-02:30PM",
    subjectId: "ENG-9",
  },
  {
    subject: "English",
    classroom: "105",
    schedule: "02:30PM-03:30PM",
    subjectId: "ENG-9",
  },
  {
    subject: "English",
    classroom: "106",
    schedule: "03:30PM-04:30PM",
    subjectId: "ENG-9",
  },
];

export default function TeacherTeachingLoad() {
  const [schoolYear, setSchoolYear] = useState("2026-2027");

  return (
    <div className="teacher-load-layout">
      <TeacherNavbar activePage="teaching-load" />

      <main className="teacher-load-main">
        <header className="teacher-load-header">
          <h1>Teaching Load</h1>
          <p>School Year {schoolYear}</p>
        </header>

        <section className="teacher-load-panel">

          {/* Teacher Information */}
          <div className="teacher-load-information">
            <div className="teacher-load-info-item">
              <span>TEACHER NAME</span>
              <strong>Kyle Damerick Asor</strong>
            </div>

            <div className="teacher-load-info-item">
              <span>POSITION TITLE</span>
              <strong>Teacher III</strong>
            </div>

            <div className="teacher-load-info-item">
              <span>ADVISORY CLASS</span>
              <strong>9 - Bayani Agbayani</strong>
            </div>

            <div className="teacher-load-info-item">
              <span>SUBJECT</span>
              <strong>English</strong>
            </div>
          </div>

          {/* School Year Selection */}
          <div className="teacher-load-controls">
            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              aria-label="Select school year"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          {/* Teaching Load Table */}
          <div className="teacher-load-table-wrapper">
            <table className="teacher-load-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Classroom</th>
                  <th>Schedule</th>
                  <th>Subject ID</th>
                </tr>
              </thead>

              <tbody>
                {teachingLoads.map((load, index) => (
                  <tr key={index}>
                    <td>{load.subject}</td>
                    <td>{load.classroom}</td>
                    <td>{load.schedule}</td>
                    <td>{load.subjectId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </main>
    </div>
  );
}
