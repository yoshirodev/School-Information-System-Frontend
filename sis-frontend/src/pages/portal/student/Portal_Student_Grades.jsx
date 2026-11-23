
import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";

import StudentNavbar from "../../../components/StudentNavbar";
import "../../../styles/Portal_Student_Grades.css";

const gradeRecords = {
  "2026-2027": [
    { subject: "Filipino", term1: 85, term2: 87, term3: 86, finalGrade: 86 },
    { subject: "English", term1: 82, term2: 84, term3: 83, finalGrade: 83 },
    { subject: "Mathematics", term1: 78, term2: 80, term3: 79, finalGrade: 79 },
    { subject: "Science", term1: 80, term2: 82, term3: 81, finalGrade: 81 },
    { subject: "Araling Panlipunan", term1: 88, term2: 89, term3: 90, finalGrade: 89 },
    { subject: "Edukasyon na Pagpapakatao", term1: 90, term2: 91, term3: 92, finalGrade: 91 },
    { subject: "MAPEH", term1: 87, term2: 88, term3: 89, finalGrade: 88 },
    { subject: "TLE", term1: 84, term2: 85, term3: 86, finalGrade: 85 },
  ],
  "2025-2026": [
    { subject: "Filipino", term1: 84, term2: 85, term3: 86, finalGrade: 85 },
    { subject: "English", term1: 80, term2: 82, term3: 83, finalGrade: 82 },
    { subject: "Mathematics", term1: 78, term2: 79, term3: 80, finalGrade: 79 },
    { subject: "Science", term1: 82, term2: 83, term3: 84, finalGrade: 83 },
  ],
};

function PortalStudentGrades({ student, onLogout }) {
  const [schoolYear, setSchoolYear] = useState("2026-2027");

  const studentInfo = {
    fullName: student?.fullName || "Rafael Pimpolio",
    lrn: student?.lrn || "113009070080",
    gradeSection: student?.gradeSection || "9 - Bayani Agbayani",
    adviser: student?.adviser || "Jose Manalo",
  };

  const grades = gradeRecords[schoolYear] || [];

  const generalAverage = grades.length
    ? Math.round(
        grades.reduce((total, item) => total + item.finalGrade, 0) /
          grades.length
      )
    : 0;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="student-grades-layout">
      <StudentNavbar
        activePage="grades"
        onLogout={onLogout}
      />

      <main className="student-grades-main">
        <header className="student-grades-header">
          <h1>My Grades</h1>
          <p>School Year {schoolYear}</p>
        </header>

        <section className="student-grades-card">
          <div className="student-grades-information">
            <div className="student-grades-info-item">
              <span>STUDENT NAME</span>
              <strong>{studentInfo.fullName}</strong>
            </div>

            <div className="student-grades-info-item">
              <span>LRN</span>
              <strong>{studentInfo.lrn}</strong>
            </div>

            <div className="student-grades-info-item">
              <span>GRADES AND SECTION</span>
              <strong>{studentInfo.gradeSection}</strong>
            </div>

            <div className="student-grades-info-item">
              <span>ADVISER</span>
              <strong>{studentInfo.adviser}</strong>
            </div>
          </div>

          <div className="student-grades-controls">
            <div className="student-grades-select-wrapper">
              <select
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                aria-label="Select school year"
              >
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
              </select>

              <ChevronDown size={15} />
            </div>

            <button
              type="button"
              className="student-grades-download-button"
              onClick={handleDownload}
            >
              <Download size={16} />
              <span>Download SF9 button</span>
            </button>
          </div>

          <div className="student-grades-table-wrapper">
            <table className="student-grades-table">
              <thead>
                <tr>
                  <th>Learning Area</th>
                  <th>Term 1</th>
                  <th>Term 2</th>
                  <th>Term 3</th>
                  <th>Final Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody>
                {grades.map((item) => (
                  <tr key={item.subject}>
                    <td>{item.subject}</td>
                    <td>{item.term1}</td>
                    <td>{item.term2}</td>
                    <td>{item.term3}</td>
                    <td>{item.finalGrade}</td>
                    <td>
                      {item.finalGrade >= 75 ? "Passed" : "Failed"}
                    </td>
                  </tr>
                ))}

                {grades.length > 0 ? (
                  <tr className="student-grades-average-row">
                    <td>General Average</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{generalAverage}</td>
                    <td>
                      {generalAverage >= 75 ? "Passed" : "Failed"}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="6" className="student-grades-empty">
                      No grades available for this school year.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PortalStudentGrades;
