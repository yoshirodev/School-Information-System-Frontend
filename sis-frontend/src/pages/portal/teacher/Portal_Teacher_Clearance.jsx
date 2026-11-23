import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

import TeacherNavbar from "../../../components/TeacherNavbar";
import "../../../styles/Portal_Teacher_Clearance.css";

const clearanceSubjects = [
  { subject: "Filipino", teacher: "Jose Manalo", status: "Passed", id: "FIL-7" },
  { subject: "English", teacher: "Jose Manalo", status: "Passed", id: "ENG-7" },
  { subject: "Mathematics", teacher: "Jose Manalo", status: "Failed", id: "MATH-7" },
  { subject: "Science", teacher: "Jose Manalo", status: "Passed", id: "SCI-7" },
  { subject: "Araling Panlipunan", teacher: "Jose Manalo", status: "Passed", id: "AP-7" },
  { subject: "Edukasyon na Pagpapakatao", teacher: "Jose Manalo", status: "Passed", id: "ESP-7" },
  { subject: "MAPEH", teacher: "Jose Manalo", status: "Passed", id: "PG-7" },
  { subject: "TLE", teacher: "Jose Manalo", status: "Passed", id: "TLE-7" },
];

export default function PortalTeacherClearance({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student || {
    name: "Rafael Pimpolio",
    lrn: "113009070080",
    grade: "Grade 9",
    section: "Bayani Agbayani",
  };

  return (
    <div className="teacher-clearance-layout">
      <TeacherNavbar activePage="students" onLogout={onLogout} />

      <main className="teacher-clearance-main">
        <header className="teacher-clearance-header">
          <h1>Clearance System</h1>
          <p>School Year 2026-2027</p>
        </header>

        <section className="teacher-clearance-panel">
          <div className="teacher-clearance-student-info">
            <div>
              <span>STUDENT NAME</span>
              <strong>{student.name}</strong>
            </div>

            <div>
              <span>LRN</span>
              <strong>{student.lrn}</strong>
            </div>

            <div>
              <span>GRADES AND SECTION</span>
              <strong>{student.grade} - {student.section}</strong>
            </div>

            <div>
              <span>ADVISER</span>
              <strong>Jose Manalo</strong>
            </div>
          </div>

          <div className="teacher-clearance-controls">
            <button
              type="button"
              onClick={() =>
                navigate("/Portal_Teacher_Grade", {
                  state: { student },
                })
              }
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <div className="teacher-clearance-table-wrapper">
            <table className="teacher-clearance-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Status</th>
                  <th>Subject ID</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {clearanceSubjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.subject}</td>
                    <td>{subject.teacher}</td>
                    <td>{subject.status}</td>
                    <td>{subject.id}</td>
                    <td>NOT CLEARED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="teacher-clearance-requirements">
            <strong>Clearance Completion Requirements (by Status)</strong>

            <ul>
              <li>
                <b>Passed (P):</b> No further action is required for this
                subject area. The department head will officially approve the
                clearance step based on final assessment.
              </li>

              <li>
                <b>Failed (F):</b> A 'Final review required' or a specific
                action (e.g., 'Retest scheduled' - refer to table) is needed.
                Please contact the subject Teacher directly during
                consultation hours.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}